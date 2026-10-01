import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

/** White plate holding the club logo. Uses the uploaded logo when available, else a placeholder mark. */
export function LogoPlate({ logoUrl, className }: { logoUrl: string | null; className?: string }) {
  return (
    <Link href="/" aria-label="MSU E-SPORTS หน้าหลัก"
      className={cn("flex h-16 items-center justify-center rounded-2xl bg-white px-3", className)}>
      {logoUrl ? (
        <Image src={logoUrl} alt="ตราสัญลักษณ์ MSU E-SPORTS" width={200} height={56} priority className="h-11 w-auto max-w-full object-contain" />
      ) : (
        <span className="flex items-center gap-2">
          <span aria-hidden className="grid size-10 place-items-center rounded-lg bg-msu text-sm font-bold text-navy-dark">MSU</span>
          <span className="text-sm font-bold leading-tight text-navy">MSU<br />E-SPORTS</span>
        </span>
      )}
    </Link>
  );
}

/** Compact brand for the mobile header (on navy). */
export function Brand({ logoUrl }: { logoUrl: string | null }) {
  return (
    <Link href="/" className="flex items-center gap-3" aria-label="MSU E-SPORTS หน้าหลัก">
      {logoUrl ? (
        <span className="grid h-10 place-items-center rounded-lg bg-white px-2">
          <Image src={logoUrl} alt="" width={120} height={36} className="h-7 w-auto object-contain" />
        </span>
      ) : (
        <span aria-hidden className="grid size-10 place-items-center rounded-xl bg-msu text-sm font-bold text-navy-dark">MSU</span>
      )}
      <span className="text-base font-bold tracking-wide text-white">MSU E-SPORTS</span>
    </Link>
  );
}
