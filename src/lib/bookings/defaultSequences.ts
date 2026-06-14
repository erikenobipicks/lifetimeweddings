// Catalogue of "starter" email-sequence templates the studio wants out of
// the box. Seeded idempotently — once via the button on /admin/sequences
// (and/or the scripts/seed-second-payment-reminder.mjs helper for local
// runs). Editing afterwards happens through /admin/sequences and never
// touches this file, so re-seeding only ever fills the gaps.

import type { SequenceInput } from './sequences';

/** The 14-days-before-wedding second-payment reminder. Bodies mirror the
 *  reserva-confirmation tone (transfer + card link). */
export const SECOND_PAYMENT_REMINDER: SequenceInput = {
  slug: 'recordatori-2n-pagament-14d',
  enabled: true,
  triggerKind: 'days_before_wedding',
  triggerOffsetDays: 14,
  formKind: null,
  subject: {
    ca: 'Recordatori del segon pagament · {couple}',
    es: 'Recordatorio del segundo pago · {couple}',
    en: 'Reminder: second payment · {couple}',
  },
  bodyHtml: {
    ca: `
<p>Hola {n1} i {n2},</p>
<p>En 14 dies arriba el casament, i toca el <strong>segon pagament</strong> de la vostra reserva.</p>
<p>El podeu fer per:</p>
<ul>
  <li><strong>Transferència bancària</strong> — feu servir la mateixa referència que la del dipòsit. (Si l'heu perdut, escriviu-nos i us la tornem a passar.)</li>
  <li><strong>Targeta</strong> — <a href="{public_site_url}/reserva/{slug}#pagament">des de la vostra pàgina segura</a>.</li>
</ul>
<p>Si teniu qualsevol dubte sobre l'import o la data, responeu aquest correu o escriviu-nos pel WhatsApp. Ens veiem aviat!</p>
<p>Ferran i Eric<br/>Lifetime</p>
    `.trim(),
    es: `
<p>Hola {n1} y {n2},</p>
<p>En 14 días llega la boda, y toca el <strong>segundo pago</strong> de vuestra reserva.</p>
<p>Lo podéis hacer por:</p>
<ul>
  <li><strong>Transferencia bancaria</strong> — usad la misma referencia que la del depósito. (Si la habéis perdido, escribidnos y os la pasamos de nuevo.)</li>
  <li><strong>Tarjeta</strong> — <a href="{public_site_url}/reserva/{slug}#pagament">desde vuestra página segura</a>.</li>
</ul>
<p>Si tenéis cualquier duda sobre el importe o la fecha, responded este correo o escribidnos por WhatsApp. ¡Nos vemos pronto!</p>
<p>Ferran y Eric<br/>Lifetime</p>
    `.trim(),
    en: `
<p>Hi {n1} and {n2},</p>
<p>The wedding is 14 days away, and the <strong>second payment</strong> for your booking is now due.</p>
<p>You can pay via:</p>
<ul>
  <li><strong>Bank transfer</strong> — use the same reference as the deposit. (If you've misplaced it, drop us a line and we'll send it again.)</li>
  <li><strong>Card</strong> — <a href="{public_site_url}/reserva/{slug}#pagament">from your secure page</a>.</li>
</ul>
<p>If you have any questions about the amount or the date, reply to this email or message us on WhatsApp. See you very soon!</p>
<p>Ferran and Eric<br/>Lifetime</p>
    `.trim(),
  },
};

/** The 30-days-before-wedding "important info" questionnaire. Carries a
 *  form (formKind: 'wedding_details') so each schedule gets a one-shot
 *  /formulari/<token> link the couple fills in ~10 minutes. Mirrors email
 *  #6 of docs/secuencia-emails-clientes.md (PRE-06-info-importante). */
export const PRE_WEDDING_INFO: SequenceInput = {
  slug: 'formulari-info-boda-30d',
  enabled: true,
  triggerKind: 'days_before_wedding',
  triggerOffsetDays: 30,
  formKind: 'wedding_details',
  subject: {
    ca: 'Un mes: necessitem conèixer-vos una mica més (10 minuts, ho prometem)',
    es: 'Un mes: necesitamos conoceros un poco más (10 minutos, prometido)',
    en: 'One month to go: tell us a little more (10 minutes, promise)',
  },
  bodyHtml: {
    ca: `
<p>Hola {coupleName1} i {coupleName2},</p>
<p>Queda un mes. Es nota ja, oi?</p>
<p>Per preparar bé el dia necessitem que ens expliqueu algunes coses, i per no marejar-vos amb vint correus ho hem reunit tot en un formulari que es replena en uns deu minuts:</p>
<p style="margin:24px 0;"><a href="{formUrl}" style="background:#c8a45c;color:#1a1a1a;padding:12px 24px;text-decoration:none;font-weight:bold;display:inline-block;">Omplir el formulari →</a></p>
<p>Us preguntem coses pràctiques (adreces exactes dels preparatius, telèfons de contacte d'aquell dia, dades d'altres proveïdors) i altres que ens importen encara més: qui són les persones clau, si hi ha alguna sorpresa preparada, els moments que us fa especial il·lusió que quedin recollits, i si hi ha res delicat que hàgim de saber.</p>
<p>Intenteu enviar-nos-ho durant la propera setmana; com abans ho tinguem, amb més calma ho preparem tot.</p>
<p>Una abraçada,<br/>Ferran i Eric<br/>Lifetime</p>
    `.trim(),
    es: `
<p>Hola {coupleName1} y {coupleName2},</p>
<p>Queda un mes. Se nota ya, ¿verdad?</p>
<p>Para preparar bien el día necesitamos que nos contéis algunas cosas, y para no marearos con veinte emails lo hemos reunido todo en un formulario que se rellena en unos diez minutos:</p>
<p style="margin:24px 0;"><a href="{formUrl}" style="background:#c8a45c;color:#1a1a1a;padding:12px 24px;text-decoration:none;font-weight:bold;display:inline-block;">Rellenar el formulario →</a></p>
<p>Os preguntamos cosas prácticas (direcciones exactas de los preparativos, teléfonos de contacto de ese día, datos de otros proveedores) y otras que nos importan aún más: quiénes son las personas clave, si hay alguna sorpresa preparada, los momentos que os haga ilusión que queden recogidos, y si hay algo delicado que debamos conocer.</p>
<p>Intentad enviárnoslo durante la próxima semana; cuanto antes lo tengamos, con más calma lo preparamos todo.</p>
<p>Un abrazo,<br/>Ferran y Eric<br/>Lifetime</p>
    `.trim(),
    en: `
<p>Hi {coupleName1} and {coupleName2},</p>
<p>One month to go. You can feel it now, right?</p>
<p>To prepare everything properly we need you to tell us a few things, and rather than send you twenty emails we've gathered it all into one form that takes about ten minutes:</p>
<p style="margin:24px 0;"><a href="{formUrl}" style="background:#c8a45c;color:#1a1a1a;padding:12px 24px;text-decoration:none;font-weight:bold;display:inline-block;">Fill in the form →</a></p>
<p>We ask practical things (exact prep addresses, contact phones for the day, other suppliers' details) and others that matter even more: who the key people are, whether there's a surprise planned, the moments you'd love us to capture, and anything sensitive we should know.</p>
<p>Try to send it to us over the next week; the sooner we have it, the more calmly we can prepare everything.</p>
<p>A hug,<br/>Ferran and Eric<br/>Lifetime</p>
    `.trim(),
  },
};

/** All starter templates. Add new defaults here. */
export const DEFAULT_SEQUENCES: SequenceInput[] = [SECOND_PAYMENT_REMINDER, PRE_WEDDING_INFO];
