import Link from "next/link";
import { ArrowRight, type LucideIcon } from "lucide-react";
import { IconTile } from "./icon-tile";

interface Props { title: string; description?: string; icon?: LucideIcon; href?: string; linkLabel?: string; as?: "h1" | "h2" }

export function SectionHeader({ title, description, icon, href, linkLabel = "ดูทั้งหมด", as: Tag = "h2" }: Props) {
  return (
    <div className="mb-5 flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        {icon ? <IconTile icon={icon} /> : <span aria-hidden className="h-7 w-1 shrink-0 rounded-full bg-msu" />}
        <div>
          <Tag className="text-lg font-bold text-navy sm:text-xl">{title}</Tag>
          {description && <p className="text-sm text-muted">{description}</p>}
        </div>
      </div>
      {href && (
        <Link href={href} className="flex shrink-0 items-center gap-1.5 rounded-full border border-line bg-white px-4 py-2 text-sm font-semibold text-navy hover:bg-surface">
          {linkLabel} <ArrowRight className="size-4" aria-hidden />
        </Link>
      )}
    </div>
  );
}
