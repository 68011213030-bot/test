import { cn } from "@/lib/utils";

export function Skeleton({ className }: { className?: string }) {
  return <div aria-hidden className={cn("animate-pulse rounded-lg bg-slate-200/70", className)} />;
}

export function CardGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div role="status" aria-label="กำลังโหลดข้อมูล" className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className="overflow-hidden rounded-2xl border border-line bg-white">
          <Skeleton className="h-40 rounded-none" />
          <div className="space-y-3 p-4">
            <Skeleton className="h-3 w-1/4" />
            <Skeleton className="h-5 w-4/5" />
            <Skeleton className="h-3 w-full" />
          </div>
        </div>
      ))}
      <span className="sr-only">กำลังโหลดข้อมูล</span>
    </div>
  );
}
