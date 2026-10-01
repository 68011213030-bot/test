import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva("inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold", {
  variants: {
    tone: {
      neutral: "bg-slate-100 text-slate-700",
      navy: "bg-navy/10 text-navy",
      yellow: "bg-msu/20 text-[#7a5b00]",
      success: "bg-emerald-50 text-emerald-700",
      danger: "bg-red-50 text-red-700",
      live: "bg-red-600 text-white",
    },
  },
  defaultVariants: { tone: "neutral" },
});

export function Badge({ tone, className, ...props }: React.HTMLAttributes<HTMLSpanElement> & VariantProps<typeof badgeVariants>) {
  return <span className={cn(badgeVariants({ tone }), className)} {...props} />;
}
