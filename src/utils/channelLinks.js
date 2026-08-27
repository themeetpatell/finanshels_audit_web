/**
 * Single source of truth for every channel-attributed outbound link on the
 * Audit site: WhatsApp CTAs and Zoho Bookings CTAs.
 *
 * Both are fixed by the campaign sheet and must match verbatim — Gallabox
 * matches the inbound WhatsApp message text back to the ad channel, and each
 * Zoho booking page is a separate destination per channel. Any drift here
 * silently breaks channel attribution.
 */

export const WHATSAPP_PHONE = '971521549572';

export const WHATSAPP_MESSAGES = Object.freeze({
  google: 'Hi, I saw your Google ad for Audit. Can you share details?',
  seo: 'Hi, I found you for Audit. Can you share details?',
  bing: 'Hi, I saw your Bing ad for Audit. Can you share details?',
});

export const DEFAULT_CHANNEL = 'google';

const CHANNEL_STORAGE_KEY = 'fs_audit_wa_channel';

const isKnownChannel = (channel) =>
  typeof channel === 'string' &&
  Object.prototype.hasOwnProperty.call(WHATSAPP_MESSAGES, channel);

/** The Bing landing page lives at /-bing; every other route is Google/organic. */
export const getChannelForPath = (pathname = '') =>
  pathname.includes('-bing') ? 'bing' : DEFAULT_CHANNEL;

/**
 * The thank-you page is shared by both landing pages and is reached via an
 * off-site Zoho redirect, so the channel has to be carried across that hop.
 * sessionStorage survives a same-tab cross-origin round trip.
 */
export const rememberChannel = (channel) => {
  if (!isKnownChannel(channel)) return;
  try {
    window.sessionStorage.setItem(CHANNEL_STORAGE_KEY, channel);
  } catch {
    // Storage blocked (private mode / cookie policy). Non-fatal: readers fall
    // back to DEFAULT_CHANNEL, which is the higher-volume channel.
  }
};

export const getRememberedChannel = () => {
  try {
    const stored = window.sessionStorage.getItem(CHANNEL_STORAGE_KEY);
    return isKnownChannel(stored) ? stored : DEFAULT_CHANNEL;
  } catch {
    return DEFAULT_CHANNEL;
  }
};

export const buildWhatsAppHref = (channel = DEFAULT_CHANNEL) => {
  const message = isKnownChannel(channel)
    ? WHATSAPP_MESSAGES[channel]
    : WHATSAPP_MESSAGES[DEFAULT_CHANNEL];

  const params = new URLSearchParams({
    phone: WHATSAPP_PHONE,
    text: message,
    type: 'phone_number',
    app_absent: '0',
  });

  return `https://api.whatsapp.com/send/?${params.toString()}`;
};

const ZOHO_BOOKINGS_BASE = 'https://contact-finanshels.zohobookings.com';

export const BOOKING_SLUGS = Object.freeze({
  google: 'audit-google',
  seo: 'audit-seo',
  bing: 'audit-bing',
});

export const buildBookingHref = (channel = DEFAULT_CHANNEL) => {
  const slug = Object.prototype.hasOwnProperty.call(BOOKING_SLUGS, channel)
    ? BOOKING_SLUGS[channel]
    : BOOKING_SLUGS[DEFAULT_CHANNEL];

  return `${ZOHO_BOOKINGS_BASE}/${slug}`;
};
