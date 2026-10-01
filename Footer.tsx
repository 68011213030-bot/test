import Link from "next/link";
import { ChevronRight, MapPin, Navigation } from "lucide-react";
import { LogoPlate } from "./Brand";
import { SocialButtons } from "@/components/ui/social-icons";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { SiteSettings } from "@/lib/data/public";

const QUICK = [
  ["/", "หน้าหลัก"], ["/news", "ข่าวสาร"], ["/events", "กิจกรรม"],
  ["/competitions", "การแข่งขัน"], ["/teams", "ทีม"], ["/join", "สมัครเข้าชมรม"],
] as const;

export function Footer({ settings }: { settings: SiteSettings }) {
  const { social, contact, logoUrl } = settings;
  const hasContact = contact.phone || contact.email;
  const hasLocation = contact.address || contact.maps_url || contact.maps_embed_url;
  return (
    <footer className="mt-16 border-t-[3px] border-msu bg-navy-dark pb-20 text-white/80 md:pb-0">
      <div className="mx-auto max-w-6xl px-6 py-12 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <LogoPlate logoUrl={logoUrl} className="w-44" />
            <p className="mt-4 max-w-sm text-sm">ชมรมอีสปอร์ตมหาวิทยาลัยมหาสารคาม พื้นที่สำหรับนิสิตที่รักการแข่งขัน การทำงานเป็นทีม และ Esports</p>
            <p className="mt-3 text-sm font-semibold tracking-[0.2em] text-msu">PLAY • COMPETE • CONNECT</p>
            <SocialButtons social={social} variant="glass" className="mt-5" />
          </div>
          <nav aria-label="ลิงก์ด่วน">
            <p className="mb-3 border-b-2 border-msu pb-1 text-sm font-semibold text-white" style={{ width: "fit-content" }}>เมนูลัด</p>
            <ul className="space-y-2.5 text-sm">
              {QUICK.map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className="flex items-center gap-1.5 hover:text-white hover:underline">
                    <ChevronRight className="size-4 text-msu" aria-hidden />{label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <p className="mb-3 border-b-2 border-msu pb-1 text-sm font-semibold text-white" style={{ width: "fit-content" }}>ติดต่อเรา</p>
            {hasContact ? (
              <ul className="space-y-2 text-sm">
                {contact.phone && <li>โทร. {contact.phone}</li>}
                {contact.email && <li>Email : {contact.email}</li>}
              </ul>
            ) : (
              <p className="text-sm text-white/60">ข้อมูลติดต่อจะแสดงที่นี่</p>
            )}
          </div>
        </div>

        {hasLocation && (
          <div className="mt-10 grid gap-6 rounded-2xl border border-white/10 bg-white/[0.04] p-5 md:grid-cols-2">
            <div className="flex flex-col">
              <p className="mb-3 border-b-2 border-msu pb-1 text-sm font-semibold text-white" style={{ width: "fit-content" }}>ที่ตั้ง</p>
              {contact.address && (
                <p className="flex items-start gap-2 text-sm"><MapPin className="mt-0.5 size-4 shrink-0 text-msu" aria-hidden />{contact.address}</p>
              )}
              {contact.maps_url && (
                <div className="mt-auto flex flex-wrap gap-3 pt-6">
                  <a href={contact.maps_url} target="_blank" rel="noopener noreferrer" className={cn(buttonVariants({ size: "sm" }))}>
                    <MapPin className="size-4" aria-hidden />เปิดใน Google Maps
                  </a>
                  <a href={contact.maps_url} target="_blank" rel="noopener noreferrer" className={cn(buttonVariants({ variant: "onDark", size: "sm" }))}>
                    <Navigation className="size-4" aria-hidden />นำทาง
                  </a>
                </div>
              )}
            </div>
            {contact.maps_embed_url && (
              <iframe src={contact.maps_embed_url} title="แผนที่ที่ตั้งชมรม" loading="lazy"
                referrerPolicy="no-referrer-when-downgrade" className="h-56 w-full rounded-xl border-0" />
            )}
          </div>
        )}
      </div>
      <div className="border-t border-white/10 px-6 py-5 text-xs text-white/60">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 sm:flex-row lg:px-8">
          <p>© 2026 MSU E-SPORTS · สงวนลิขสิทธิ์</p>
          <p className="flex items-center gap-4">
            <Link href="/admin" className="hover:text-white hover:underline">สำหรับเจ้าหน้าที่</Link>
            <span>Mahasarakham University</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
