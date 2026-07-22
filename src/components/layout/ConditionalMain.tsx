"use client";

import { usePathname } from "next/navigation";

export function ConditionalMain({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith("/dashboard");
  return (
    <main className={`flex-1 ${isDashboard ? "" : "mt-[72px]"}`}>
      {children}
    </main>
  );
}
