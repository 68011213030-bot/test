"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, Ellipsis } from "lucide-react";
import { BOTTOM_NAV, isActive } from "@/lib/nav";
import { Sidebar } from "./Sidebar";
import { Brand } from "./Brand";
import { cn } from "@/lib/utils";

/** Header + drawer for < lg screens, and the bottom navigation for < md. */
export function MobileChrome({ logoUrl }: { logoUrl: string | null }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const openerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
      openerRef.current?.focus();
    };
  }, [open]);

  const openMenu = (e: React.MouseEvent<HTMLElement>) => {
    openerRef.current = e.currentTarget;
    setOpen(true);
  };

  return (
    <>
      <header className="sticky top-0 z-30 flex h-14 items-center justify-between bg-navy px-4 lg:hidden">
        <Brand logoUrl={logoUrl} />
        <button type="button" onClick={openMenu} aria-label="เปิดเมนู" aria-expanded={open}
          className="grid size-11 place-items-center rounded-lg text-white hover:bg-white/10">
          <Menu className="size-5" aria-hidden />
        </button>
      </header>

      {open && (
        <div className="fixed inset-0 z-40 lg:hidden" role="dialog" aria-modal="true" aria-label="เมนู">
          <button tabIndex={-1} className="absolute inset-0 bg-navy-dark/60" onClick={() => setOpen(false)} aria-label="ปิดเมนู" />
          <div className="relative h-full w-72 max-w-[85%] shadow-2xl"
            onClick={(e) => { if ((e.target as HTMLElement).closest("a")) setOpen(false); }}>
            <Sidebar logoUrl={logoUrl} onClose={() => setOpen(false)} className="w-full" />
          </div>
        </div>
      )}

      <nav aria-label="เมนูด่วน"
        className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-5 border-t border-line bg-white pb-[env(safe-area-inset-bottom)] md:hidden">
        {BOTTOM_NAV.map(({ href, label, icon: Icon }) => {
          const active = isActive(pathname, href);
          return (
            <Link key={href} href={href} aria-current={active ? "page" : undefined}
              className={cn("relative flex min-h-14 flex-col items-center justify-center gap-0.5 text-[11px]",
                active ? "font-semibold text-navy" : "text-muted")}>
              {active && <span aria-hidden className="absolute inset-x-6 top-0 h-0.5 rounded-b bg-msu" />}
              <Icon className="size-5" aria-hidden />
              {label}
            </Link>
          );
        })}
        <button type="button" onClick={openMenu} aria-haspopup="dialog"
          className="flex min-h-14 flex-col items-center justify-center gap-0.5 text-[11px] text-muted">
          <Ellipsis className="size-5" aria-hidden />
          More
        </button>
      </nav>
    </>
  );
}
