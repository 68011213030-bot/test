import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const TONES = {
  yellow: "bg-msu/15 text-[#8a6600]",
  navy: "bg-navy text-msu",
  soft: "bg-navy/5 text-navy",
} as const;

export function IconTile({ icon: Icon, tone = "yellow", className }: { icon: LucideIcon; tone?: keyof typeof TONES; className?: string }) {
  return (
    <span aria-hidden className={cn("grid size-10 shrink-0 place-items-center rounded-xl", TONES[tone], className)}>
      <Icon className="size-5" />
    </span>
  );
}
