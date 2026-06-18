// Site-wide data (contact details, socials). Keep in sync with reality.

export const SITE = {
  name: 'Lifetime Weddings',
  domain: 'lifetime.photo',
  url: 'https://www.lifetime.photo',
  email: 'hola@lifetime.photo',
  emailAlt: 'lifetimeweddingsphoto@gmail.com',
  phone: '+34688946111',
  phoneDisplay: '+34 688 94 61 11',
  /** Cal.com booking URL for the 15-min videocall. Edited here so a slug
   *  change is a one-line update, not a hunt through templates. Empty
   *  string disables the booking CTA across the site (we fall back to
   *  the WhatsApp prompt as the only call-to-action). */
  bookingUrl: 'https://cal.com/lifetime-weddings-366ynh/15min',
  /** Public Google Business Profile, used by the "5★ on Google" trust
   *  signal and the testimonial badges so the social proof is verifiable.
   *  Swap for the direct reviews deep-link if/when we have one. */
  googleReviewsUrl: 'https://www.google.com/maps?cid=9550864279818307584',
  address: {
    street: 'C/ Mare Molas, 26',
    city: 'Reus',
    region: 'Tarragona',
    country: 'ES',
    postalCode: '43204',
  },
  social: {
    instagram: 'https://www.instagram.com/lifetime.weddings/',
    instagramFerran: 'https://www.instagram.com/ferryphotographer/',
    // Eric's IG not published on current site (icon without href) — leave unset for now
    youtube: 'https://www.youtube.com/channel/UCuJ0g4nYwjGB1PIeWlTrOlg',
    youtubeChannelId: 'UCuJ0g4nYwjGB1PIeWlTrOlg',
    pinterest: 'https://www.pinterest.es/lifetimeweddings/',
    // No public Facebook / Twitter pages surfaced on the existing site
  },
  copyrightSince: 2020,
} as const;

// E.164 (+34…) → wa.me-friendly digits only. Single source of truth: change
// SITE.phone above and every WhatsApp link in the codebase follows.
const WA_PHONE_DIGITS = SITE.phone.replace(/^\+/, '');

/** Base wa link with no pre-filled message — used in plain-text email signoffs
 *  where we just want a clickable URL (no encoded text noise). */
export const WHATSAPP_BASE = `https://api.whatsapp.com/send/?phone=${WA_PHONE_DIGITS}`;

export function waLink(message: string): string {
  const params = new URLSearchParams({
    phone: WA_PHONE_DIGITS,
    text: message,
    type: 'phone_number',
    app_absent: '0',
  });
  return `https://api.whatsapp.com/send/?${params.toString()}`;
}
