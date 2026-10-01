import { MessageCircle, Mail } from "lucide-react";
import type { SocialLinks } from "@/lib/data/public";
import { cn } from "@/lib/utils";

const svg = { width: 18, height: 18, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true } as const;

const ICONS: Record<keyof SocialLinks, { label: string; icon: React.ReactNode }> = {
  facebook: { label: "Facebook", icon: <svg {...svg}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg> },
  instagram: { label: "Instagram", icon: <svg {...svg}><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><path d="M17.5 6.5h.01" /></svg> },
  youtube: { label: "YouTube", icon: <svg {...svg}><path d="M2.5 17a24.1 24.1 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.6 49.6 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.1 24.1 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.6 49.6 0 0 1-16.2 0A2 2 0 0 1 2.5 17" /><path d="m10 15 5-3-5-3z" /></svg> },
  discord: { label: "Discord", icon: <MessageCircle size={18} aria-hidden /> },
};

interface Props { social: SocialLinks; email?: string; variant?: "navy" | "glass"; className?: string }

export function SocialButtons({ social, email, variant = "navy", className }: Props) {
  const entries = (Object.keys(ICONS) as (keyof SocialLinks)[]).filter((k) => social[k]);
  if (entries.length === 0 && !email) return null;
  const style = variant === "navy" ? "bg-navy text-white hover:bg-navy-dark" : "bg-white/10 text-white hover:bg-white/20";
  return (
    <ul className={cn("flex items-center gap-2", className)}>
      {entries.map((k) => (
        <li key={k}>
          <a href={social[k]} target="_blank" rel="noopener noreferrer" aria-label={ICONS[k].label}
            className={cn("grid size-9 place-items-center rounded-lg transition-colors", style)}>
            {ICONS[k].icon}
          </a>
        </li>
      ))}
      {email && (
        <li>
          <a href={`mailto:${email}`} aria-label="อีเมล" className={cn("grid size-9 place-items-center rounded-lg transition-colors", style)}>
            <Mail size={18} aria-hidden />
          </a>
        </li>
      )}
    </ul>
  );
}
