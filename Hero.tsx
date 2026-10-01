import Image from "next/image";
import Link from "next/link";
import { GraduationCap, Mail, MapPin, Phone } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { ContactInfo, HeroBanner } from "@/lib/data/public";

interface Props { banner: HeroBanner | null; contact: ContactInfo }

export function Hero({ banner, contact }: Props) {
  const info = [
    { icon: Phone, label: "โทรศัพท์", value: contact.phone },
    { icon: Mail, label: "อีเมล", value: contact.email },
    { icon: MapPin, label: "ที่ตั้ง", value: contact.address },
  ].filter((i): i is { icon: typeof Phone; label: string; value: string } => Boolean(i.value));

  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden rounded-3xl bg-navy-dark">
      {banner?.image_url ? (
        <>
          <Image src={banner.image_url} alt={banner.title} fill priority sizes="(min-width: 1024px) 70vw, 100vw" className="-z-20 object-cover" />
          <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-dark/90 via-navy-dark/75 to-navy/60" />
        </>
      ) : (
        <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_85%_0%,rgb(245_184_0/0.14),transparent_55%)]" />
      )}
      <div className="grid gap-8 px-6 py-12 sm:px-10 sm:py-16 lg:grid-cols-[1fr_20rem] lg:items-center lg:px-12 lg:py-20">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-msu">
            <GraduationCap className="size-4" aria-hidden />ESPORTS CLUB · MAHASARAKHAM UNIVERSITY
          </span>
          <h1 id="hero-title" className="mt-5 text-4xl font-bold text-white sm:text-5xl lg:text-6xl">MSU E-SPORTS</h1>
          <p className="mt-3 text-lg font-medium text-white/90 sm:text-xl">ชมรมอีสปอร์ต<br className="sm:hidden" />มหาวิทยาลัยมหาสารคาม</p>
          <p className="mt-4 text-sm font-semibold tracking-[0.25em] text-msu">PLAY • COMPETE • CONNECT</p>
          <p className="mt-5 max-w-lg text-base text-white/75">
            พื้นที่สำหรับนิสิตที่รักการแข่งขัน การทำงานเป็นทีม ความคิดสร้างสรรค์ และ Esports
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/join" className={cn(buttonVariants({ size: "lg" }))}>เข้าร่วมชมรม</Link>
            <Link href="/competitions" className={cn(buttonVariants({ variant: "onDark", size: "lg" }), "bg-white/5 backdrop-blur")}>ดูการแข่งขัน</Link>
          </div>
        </div>
        {info.length > 0 && (
          <ul className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            {info.map(({ icon: Icon, label, value }) => (
              <li key={label} className="flex items-start gap-3 rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur">
                <Icon className="mt-0.5 size-5 shrink-0 text-msu" aria-hidden />
                <div className="min-w-0 text-sm">
                  <p className="text-xs text-white/65">{label}</p>
                  <p className="break-words font-semibold text-white">{value}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
