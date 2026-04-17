import type { APIRoute } from 'astro';
import { z } from 'zod';
import { createQuote, createLead } from '~/lib/quotes';
import { recommendPacks, recommendShowcase, generateNote } from '~/lib/matcher';
import { sendNotification, sendTelegramNotification } from '~/lib/email';

const schema = z.object({
  weddingDate: z.string().optional(),
  location: z.string().min(1),
  ceremonyType: z.string().min(1),
  serviceInterest: z.string().min(1),
  budgetRange: z.string().min(1),
  coupleName: z.string().min(1).max(200),
  email: z.string().email(),
  phone: z.string().max(30).optional(),
  lang: z.enum(['es', 'ca', 'en']).optional(),
});

const SITE_URL = process.env.PUBLIC_SITE_URL ?? 'http://localhost:4321';

export const POST: APIRoute = async ({ request }) => {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Bad JSON' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return new Response(JSON.stringify({ error: 'Invalid data', details: parsed.error.flatten() }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const data = parsed.data;
  const answers = {
    weddingDate: data.weddingDate,
    location: data.location,
    ceremonyType: data.ceremonyType,
    serviceInterest: data.serviceInterest,
    budgetRange: data.budgetRange,
  };

  // Recommend packs + showcase
  const packIds = recommendPacks(answers);
  const showcaseSlug = recommendShowcase(answers);
  const note = generateNote(answers, data.coupleName);

  // Create the quote (auto-generated, no admin)
  const quote = await createQuote({
    coupleName: data.coupleName,
    coupleEmail: data.email,
    packIds,
    notes: note,
    createdBy: 'quiz',
  });

  // Create lead (links quiz answers to the quote)
  await createLead({
    quoteId: quote.id,
    coupleName: data.coupleName,
    email: data.email,
    phone: data.phone,
    weddingDate: data.weddingDate,
    location: data.location,
    ceremonyType: data.ceremonyType,
    serviceInterest: data.serviceInterest,
    budgetRange: data.budgetRange,
  });

  // Notify admin
  const url = `${SITE_URL}/p/${quote.token}`;
  const labels: Record<string, string> = {
    tarragona: 'Tarragona/Reus', barcelona: 'Barcelona', lleida: 'Lleida/Girona',
    other_cat: 'Catalunya', international: 'Internacional',
    civil: 'Civil', religious: 'Religiosa', symbolic: 'Simbòlica',
    photo: 'Foto', video: 'Vídeo', both: 'Foto+Vídeo',
    low: '< 1.500 €', mid: '1.500-2.500 €', high: '2.500-3.500 €', premium: '> 3.500 €',
  };

  const hora = new Date().toLocaleString('ca-ES', { timeZone: 'Europe/Madrid' });

  await sendNotification({
    subject: `🆕 Nou lead via quiz · ${data.coupleName}`,
    html: `
      <h2>Nou lead des del quiz!</h2>
      <ul>
        <li><strong>Parella:</strong> ${data.coupleName}</li>
        <li><strong>Email:</strong> ${data.email}</li>
        ${data.phone ? `<li><strong>Telèfon:</strong> ${data.phone}</li>` : ''}
        ${data.weddingDate ? `<li><strong>Data boda:</strong> ${data.weddingDate}</li>` : ''}
        <li><strong>Lloc:</strong> ${labels[data.location] ?? data.location}</li>
        <li><strong>Cerimònia:</strong> ${labels[data.ceremonyType] ?? data.ceremonyType}</li>
        <li><strong>Servei:</strong> ${labels[data.serviceInterest] ?? data.serviceInterest}</li>
        <li><strong>Pressupost:</strong> ${labels[data.budgetRange] ?? data.budgetRange}</li>
      </ul>
      <p>📋 <strong>Packs recomanats:</strong> ${packIds.join(', ')}</p>
      <p>🔗 <a href="${url}">Veure pressupost</a></p>
    `,
  });

  await sendTelegramNotification(
    `🆕 <b>Nou lead</b>\n${data.coupleName}\n📍 ${labels[data.location] ?? data.location} · ${labels[data.ceremonyType] ?? data.ceremonyType}\n💼 ${labels[data.serviceInterest] ?? data.serviceInterest} · ${labels[data.budgetRange] ?? data.budgetRange}\n🔗 ${url}`,
  );

  return new Response(
    JSON.stringify({ token: quote.token, showcaseSlug }),
    { status: 200, headers: { 'Content-Type': 'application/json' } },
  );
};
