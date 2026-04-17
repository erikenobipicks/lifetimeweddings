// Site-wide data (contact details, socials). Keep in sync with reality.

export const SITE = {
  name: 'Lifetime Weddings',
  domain: 'lifetime.photo',
  url: 'https://www.lifetime.photo',
  email: 'hola@lifetime.photo',
  emailAlt: 'lifetimeweddingsphoto@gmail.com',
  phone: '+34688946111',
  phoneDisplay: '+34 688 94 61 11',
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
  whatsappBase: 'https://api.whatsapp.com/send/?phone=34688946111',
  copyrightSince: 2020,
} as const;

export function waLink(message: string): string {
  const params = new URLSearchParams({ phone: '34688946111', text: message, type: 'phone_number', app_absent: '0' });
  return `https://api.whatsapp.com/send/?${params.toString()}`;
}
