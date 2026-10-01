import "server-only";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";

export interface SocialLinks { facebook?: string; instagram?: string; youtube?: string; discord?: string }
export interface ContactInfo {
  phone?: string; email?: string; address?: string; maps_url?: string; maps_embed_url?: string;
}
export interface SiteSettings { social: SocialLinks; contact: ContactInfo; logoUrl: string | null }
export interface HeroBanner { title: string; image_url: string | null }

function publicClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return url && key ? createClient(url, key, { auth: { persistSession: false } }) : null;
}

/**
 * Site-wide settings from the `settings` table (keys: social, contact, branding).
 * Logo: `branding.logo_url` wins; otherwise a file at public/logo.png is used if present.
 */
export async function getSiteSettings(): Promise<SiteSettings> {
  const localLogo = existsSync(join(process.cwd(), "public", "logo.png")) ? "/logo.png" : null;
  const result: SiteSettings = { social: {}, contact: {}, logoUrl: localLogo };
  const db = publicClient();
  if (!db) return result;
  const { data, error } = await db.from("settings").select("key,value").in("key", ["social", "contact", "branding"]);
  if (error || !data) return result;
  for (const row of data) {
    if (row.key === "social") result.social = row.value as SocialLinks;
    if (row.key === "contact") result.contact = row.value as ContactInfo;
    if (row.key === "branding") result.logoUrl = (row.value as { logo_url?: string }).logo_url || localLogo;
  }
  return result;
}

/** First published banner within its date window (RLS enforces status + dates). */
export async function getHeroBanner(): Promise<HeroBanner | null> {
  const db = publicClient();
  if (!db) return null;
  const { data, error } = await db
    .from("banners").select("title,image_url").order("sort_order").limit(1).maybeSingle();
  return error ? null : (data as HeroBanner | null);
}
