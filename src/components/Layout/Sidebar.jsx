"use client";

import React, { useEffect, useState } from "react";
import { getToken } from "@/app/utils/cookie";
import { cn } from "@/lib/utils";
import NavLink from "./NavLink";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();
  const [token, setToken] = useState(null);
  const menus = [
    { id: 0, name: "Dashboard", link: "/" },
    { id: 0, name: "Test", link: "/test" },
    { id: 0, name: "Option", link: "/option" },
  ];

  async function getTk() {
    const tk = await getToken();
    setToken(tk);
  }

  useEffect(() => {
    getTk();
  }, [pathname]);

  return (
    <aside
      className={cn(
        !token && "hidden",
        "w-56 fixed left-0 top-20 bg-white sidebar border-r-[1px] h-full"
      )}
      aria-label="Sidebar"
    >
      <div className="overflow-y-auto rounded h-[calc(100vh-115px)]">
        <ul>
          {menus.map((item) => (
            <NavLink key={item.id} name={item.name} link={item.link} />
          ))}
        </ul>
      </div>
    </aside>
  );
}
