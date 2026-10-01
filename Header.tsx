"use client";

import { usePathname } from "next/navigation";
import { Phone, Mail } from "lucide-react";
import { NAV_SECTIONS, isActive } from "@/lib/nav";
import { SocialButtons } from "@/components/ui/social-icons";
import type { ContactInfo, SocialLinks } from "@/lib/data/public";

export function Header({ contact, social }: { contact: ContactInfo; social: SocialLinks }) {
  const pathname = usePathname();
  const current = NAV_SECTIONS.flatMap((s) => s.items).find((i) => isActive(pathname, i.href));
  return (
    <header className="sticky top-0 z-10 hidden h-16 items-center justify-between gap-6 border-b border-line bg-white/95 px-8 backdrop-blur lg:flex">
      <div className="leading-tight">
        <p className="text-xs text-muted">MSU E-SPORTS ชมรมอีสปอร์ตมหาวิทยาลัยมหาสารคาม</p>
        <p className="font-bold text-navy">{current?.label ?? "MSU E-SPORTS"}</p>
      </div>
      <div className="flex items-center gap-5 text-sm text-ink">
        {contact.phone && (
          <a href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`} className="flex items-center gap-2 hover:text-navy">
            <Phone className="size-4 text-muted" aria-hidden />{contact.phone}
          </a>
        )}
        {contact.email && (
          <a href={`mailto:${contact.email}`} className="hidden items-center gap-2 hover:text-navy xl:flex">
            <Mail className="size-4 text-muted" aria-hidden />{contact.email}
          </a>
        )}
        <SocialButtons social={social} />
      </div>
    </header>
  );
}
