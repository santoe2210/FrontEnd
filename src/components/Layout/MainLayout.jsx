"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { routePaths } from "@/app/utils/common";

function MainLayout({ children }) {
  const pathname = usePathname();
  const paths = routePaths();

  return (
    <main
      className={cn(
        !paths.some((path) => pathname.startsWith(path)) &&
          "ml-56 mdmax992:ml-0",
        "mt-20 relative"
      )}
    >
      {children}
    </main>
  );
}

export default MainLayout;
