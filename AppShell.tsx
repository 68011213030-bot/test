"use client";

import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { cn } from "@/lib/utils";

/** Owns the desktop sidebar collapse state and offsets the content area to match. */
export function AppShell({ logoUrl, children }: { logoUrl: string | null; children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div className="min-h-dvh">
      <Sidebar logoUrl={logoUrl} collapsed={collapsed} onToggle={() => setCollapsed((c) => !c)}
        className="fixed inset-y-0 left-0 z-20 hidden lg:flex" />
      <div className={cn(collapsed ? "lg:pl-20" : "lg:pl-64")}>{children}</div>
    </div>
  );
}
