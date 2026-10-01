import Link from "next/link";
import { ChevronRight, type LucideIcon } from "lucide-react";
import { IconTile } from "./icon-tile";
import { cn } from "@/lib/utils";

interface Props { href: string; title: string; subtitle?: string; icon: LucideIcon; tone?: "navy" | "soft" }

export function LinkRow({ href, title, subtitle, icon, tone = "navy" }: Props) {
  return (
    <Link href={href} className={cn(
      "group flex items-center gap-3 rounded-xl p-3 transition-colors",
      tone === "navy" ? "border border-line hover:border-navy/30 hover:bg-surface" : "hover:bg-surface",
    )}>
      <IconTile icon={icon} tone={tone} className={tone === "navy" ? "size-11" : undefined} />
      <span className="min-w-0 flex-1">
        <span className="block font-semibold text-navy">{title}</span>
        {subtitle && <span className="block truncate text-sm text-muted">{subtitle}</span>}
      </span>
      <ChevronRight className="size-4 shrink-0 text-muted group-hover:text-navy" aria-hidden />
    </Link>
  );
}
