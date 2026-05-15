// Fotostudio.io HTTP client — pushes web leads and signed bookings into the
// CRM so that fotostudio's "Bodas" workflow (id configured via env) fires on
// the right contact + project.
//
// Activation: this module is a NO-OP unless FOTOSTUDIO_API_TOKEN is set.
// That keeps dev and any environment without credentials safe. All callers
// invoke the helpers fail-soft (errors are logged, never thrown to the
// caller) — fotostudio downtime must not break our public forms.
//
// Mapping (decided 2026-05):
//   - Workflow:       "Bodas" (id 34030), updated to include T0/T+3/T+14
//                     web-funnel tasks and a Conf+1 contract task.
//   - Project type:   "Boda" (id 172513, color #693DB5). The duplicate
//                     #fff200 type was renamed "Boda (legacy)" and is unused.
//
// Endpoint shape: the public API is private/auth-gated and not documented
// publicly, so the resource paths below are educated guesses modelled on
// the MCP tool surface. Adjust FOTOSTUDIO_API_BASE and the path constants
// once the real swagger is in hand — payload shapes (firstname/lastname/
// email, contact_id/project_type_id, workflow_id) are confirmed via MCP.
//
// References:
//   - contact_create   → firstname (required), lastname, email, phone, …
//   - project_create   → contact_id (required), project_type_id,
//                        start_time (ISO 8601), name, location
//   - workflow_apply   → project_id, workflow_id

import 'dotenv/config';

const API_TOKEN = process.env.FOTOSTUDIO_API_TOKEN ?? '';
const API_BASE = (process.env.FOTOSTUDIO_API_BASE ?? '').replace(/\/$/, '');
const BODA_PROJECT_TYPE_ID = Number(process.env.FOTOSTUDIO_BODA_PROJECT_TYPE_ID ?? '172513');
const BODA_WORKFLOW_ID = Number(process.env.FOTOSTUDIO_BODA_WORKFLOW_ID ?? '34030');

/** Module is disabled (silently) when no token is set. */
function enabled(): boolean {
  return API_TOKEN.length > 0 && API_BASE.length > 0;
}

interface FsRequestInit {
  method: 'GET' | 'POST' | 'PATCH';
  path: string;
  body?: unknown;
}

async function request<T>({ method, path, body }: FsRequestInit): Promise<T> {
  const url = `${API_BASE}${path}`;
  const res = await fetch(url, {
    method,
    headers: {
      'Authorization': `Bearer ${API_TOKEN}`,
      'Accept': 'application/json',
      ...(body ? { 'Content-Type': 'application/json' } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`fotostudio ${method} ${path} → ${res.status} ${text.slice(0, 200)}`);
  }
  return (await res.json()) as T;
}

interface ContactPayload {
  firstname: string;
  lastname?: string;
  email?: string;
  phone?: string;
  street?: string;
  city?: string;
  zipcode?: string;
  contact_type?: 'client' | 'prospect';
  keywords?: string;
}

interface ProjectPayload {
  contact_id: number;
  project_type_id: number;
  name?: string;
  start_time?: string;
  location?: string;
}

interface ContactResponse { id: number }
interface ProjectResponse { id: number }

async function upsertContact(p: ContactPayload): Promise<number> {
  // Try search-by-email first so we don't duplicate when the couple submits
  // the contact form then later signs the reservation. If the API returns
  // no email-search endpoint, fall back to plain create (fotostudio will
  // dedupe internally on email).
  if (p.email) {
    try {
      const found = await request<{ contacts?: ContactResponse[] }>({
        method: 'GET',
        path: `/contacts?email=${encodeURIComponent(p.email)}`,
      });
      const hit = found.contacts?.[0];
      if (hit?.id) return hit.id;
    } catch (err) {
      // Non-fatal: search may not be available — proceed to create.
      console.warn('[fotostudio] contact search failed, falling through to create', err);
    }
  }
  const created = await request<ContactResponse>({
    method: 'POST',
    path: '/contacts',
    body: p,
  });
  return created.id;
}

async function createProject(p: ProjectPayload): Promise<number> {
  const created = await request<ProjectResponse>({
    method: 'POST',
    path: '/projects',
    body: p,
  });
  return created.id;
}

async function applyWorkflow(projectId: number, workflowId: number): Promise<void> {
  await request<unknown>({
    method: 'POST',
    path: `/workflows/${workflowId}/apply`,
    body: { project_id: projectId },
  });
}

// ─── Public helpers (fail-soft) ──────────────────────────────────────────

/** Split "Nom Cognom Cognom2" into a first + last pair. Falls back to the
 *  whole string as firstname when the value is a single token (fotostudio
 *  only requires firstname). */
function splitName(full: string): { firstname: string; lastname?: string } {
  const parts = full.trim().split(/\s+/);
  if (parts.length === 1) return { firstname: parts[0] };
  return { firstname: parts[0], lastname: parts.slice(1).join(' ') };
}

export interface PushLeadInput {
  coupleName: string;
  email: string;
  weddingDate?: string | null;
  venue?: string | null;
  language?: 'ca' | 'es' | 'en';
}

/** Called from /api/contact.ts after the lead is persisted locally. Creates
 *  (or reuses) a fotostudio prospect contact tagged with "web-lead". Does
 *  NOT create a project — that happens when the couple signs the reserva
 *  form. */
export async function pushLeadToFotostudio(input: PushLeadInput): Promise<void> {
  if (!enabled()) return;
  try {
    await upsertContact({
      ...splitName(input.coupleName),
      email: input.email,
      contact_type: 'prospect',
      keywords: [
        'web-lead',
        input.weddingDate ? `boda:${input.weddingDate}` : null,
        input.venue ? `venue:${input.venue}` : null,
      ].filter(Boolean).join(' '),
    });
  } catch (err) {
    console.error('[fotostudio] pushLeadToFotostudio failed (non-fatal)', err);
  }
}

export interface PushBookingInput {
  /** "Laura & Marc" style display name for the project. */
  coupleDisplayName: string;
  /** Primary contact (couple member 1) for the fotostudio contact record. */
  primaryFullName: string;
  primaryEmail: string;
  primaryPhone?: string | null;
  primaryAddress?: string | null;
  /** Wedding date (Date). Becomes project.start_time at 12:00 Europe/Madrid. */
  weddingDate: Date;
  venueName: string;
  venueCity?: string | null;
}

/** Called from /api/reserva/submit.ts after the form_response is persisted.
 *  Ensures a fotostudio contact exists (upserted by email), creates a Boda
 *  project linked to it, and applies the "Bodas" workflow. */
export async function pushBookingToFotostudio(input: PushBookingInput): Promise<void> {
  if (!enabled()) return;
  try {
    const contactId = await upsertContact({
      ...splitName(input.primaryFullName),
      email: input.primaryEmail,
      phone: input.primaryPhone ?? undefined,
      street: input.primaryAddress ?? undefined,
      contact_type: 'client',
      keywords: 'web-reserva boda',
    });

    // Anchor the project to noon on the wedding date — fotostudio uses
    // start_time as the "shoot_date" phase reference, and a noon stamp keeps
    // the workflow offsets symmetric across timezones (Europe/Madrid is
    // always UTC+1/+2, so 12:00 local stays the same calendar day in UTC).
    const start = new Date(input.weddingDate);
    start.setUTCHours(11, 0, 0, 0); // ≈ 12:00/13:00 Madrid

    const location = [input.venueName, input.venueCity].filter(Boolean).join(', ');

    const projectId = await createProject({
      contact_id: contactId,
      project_type_id: BODA_PROJECT_TYPE_ID,
      name: `Boda ${input.coupleDisplayName}`,
      start_time: start.toISOString(),
      location: location || undefined,
    });

    await applyWorkflow(projectId, BODA_WORKFLOW_ID);
  } catch (err) {
    console.error('[fotostudio] pushBookingToFotostudio failed (non-fatal)', err);
  }
}
