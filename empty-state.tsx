import { Inbox, type LucideIcon } from "lucide-react";

interface Props { title: string; description?: string; icon?: LucideIcon; action?: React.ReactNode }

export function EmptyState({ title, description, icon: Icon = Inbox, action }: Props) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-dashed border-line bg-white px-6 py-14 text-center">
      <span className="grid size-12 place-items-center rounded-full bg-surface text-muted">
        <Icon className="size-6" aria-hidden />
      </span>
      <p className="mt-4 font-semibold text-ink">{title}</p>
      {description && <p className="mt-1 max-w-sm text-sm text-muted">{description}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
