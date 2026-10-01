"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, X, PanelLeftClose, PanelLeftOpen, ClipboardPenLine } from "lucide-react";
import { NAV_SECTIONS, isActive } from "@/lib/nav";
import { LogoPlate } from "./Brand";
import { cn } from "@/lib/utils";

interface Props { className?: string; logoUrl: string | null; collapsed?: boolean; onToggle?: () => void; onClose?: () => void }

export function Sidebar({ className, logoUrl, collapsed = false, onToggle, onClose }: Props) {
  const pathname = usePathname();
  return (
    <aside className={cn("flex h-full flex-col bg-navy text-white", collapsed ? "w-20" : "w-64", className)}>
      <div className={cn("px-3 pt-5", collapsed ? "flex flex-col items-center gap-3" : "px-4")}>
        {!collapsed ? (
          <div className="flex items-center gap-2">
            <LogoPlate logoUrl={logoUrl} className="flex-1" />
            {onClose && (
              <button type="button" onClick={onClose} aria-label="ปิดเมนู" autoFocus
                className="grid size-10 shrink-0 place-items-center rounded-lg text-white/80 hover:bg-white/10 hover:text-white">
                <X className="size-5" aria-hidden />
              </button>
            )}
            {onToggle && (
              <button type="button" onClick={onToggle} aria-label="พับเมนู" aria-expanded={true}
                className="grid size-10 shrink-0 place-items-center rounded-lg text-white/80 hover:bg-white/10 hover:text-white">
                <PanelLeftClose className="size-5" aria-hidden />
              </button>
            )}
          </div>
        ) : (
          onToggle && (
            <button type="button" onClick={onToggle} aria-label="ขยายเมนู" aria-expanded={false}
              className="grid size-11 place-items-center rounded-xl bg-white text-navy hover:bg-white/90">
              <PanelLeftOpen className="size-5" aria-hidden />
            </button>
          )
        )}
        {!collapsed && (
          <p className="mt-3 pb-4 text-center text-xs leading-snug text-white/70">
            ชมรมอีสปอร์ต<br />มหาวิทยาลัยมหาสารคาม
          </p>
        )}
      </div>

      <nav aria-label="เมนูหลัก" className="flex-1 overflow-y-auto px-3 pb-4">
        {NAV_SECTIONS.map((section) => (
          <div key={section.title} className="mt-4 first:mt-1">
            {collapsed ? (
              <hr className="mx-3 mb-2 border-white/10" />
            ) : (
              <p id={`nav-${section.title}`} className="px-3 pb-1.5 text-[11px] font-semibold tracking-widest text-white/60">{section.title}</p>
            )}
            <ul aria-labelledby={collapsed ? undefined : `nav-${section.title}`} className="space-y-1">
              {section.items.map(({ href, label, icon: Icon }) => {
                const active = isActive(pathname, href);
                return (
                  <li key={href}>
                    <Link href={href} title={collapsed ? label : undefined} aria-current={active ? "page" : undefined}
                      className={cn(
                        "flex items-center gap-3 rounded-xl p-1.5 pr-3 text-sm transition-colors",
                        collapsed && "justify-center pr-1.5",
                        active ? "bg-white/10 font-semibold text-white" : "text-white/80 hover:bg-white/5 hover:text-white",
                      )}>
                      <span className={cn("grid size-9 shrink-0 place-items-center rounded-lg",
                        active ? "bg-msu text-navy-dark" : "bg-white/5 text-white/80")}>
                        <Icon className="size-[18px]" aria-hidden />
                      </span>
                      <span className={cn(collapsed && "sr-only")}>{label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      <div className="border-t border-white/10 p-4">
        <Link href="/join" aria-label="สมัครสมาชิก" title="สมัครสมาชิก"
          className={cn("block rounded-xl bg-msu text-navy-dark transition-colors hover:bg-msu-bright", collapsed ? "grid size-12 place-items-center" : "px-4 py-3")}>
          {collapsed ? <ClipboardPenLine className="size-5" aria-hidden /> : (
            <>
              <span className="block text-xs font-medium">เข้าร่วมชมรม</span>
              <span className="flex items-center justify-between text-sm font-bold">สมัครสมาชิก <ArrowRight className="size-4" aria-hidden /></span>
            </>
          )}
        </Link>
      </div>
    </aside>
  );
}
