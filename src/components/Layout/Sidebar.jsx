import React from "react";
import { cn } from "@/lib/utils";
import NavLink from "./NavLink";
import { getToken } from "@/app/utils/cookie";

export default async function Sidebar() {
  const token = await getToken();

  const menus = [
    { id: 0, name: "Dashboard", link: "/" },
    { id: 1, name: "Test", link: "/test" },
    { id: 2, name: "Option", link: "/option" },
  ];

  const menusMMR = [
    { id: 0, name: "Dashboard", link: "/marketing-manager" },
    { id: 1, name: "Contributions", link: "/marketing-manager/contributions" },
  ];

  const menusAdmin = [
    { id: 0, name: "Dashboard", link: "/admin" },
    { id: 1, name: "Academic Clouser Date", link: "/admin/closure-date" },
    {
      id: 3,
      name: "System Users",
      link: "/admin/system-users",
    },
  ];

  const getMenus = () => {
    if (token === "Admin") {
      return menusAdmin;
    }
    return menusMMR;
  };

  return (
    <>
      <aside
        className={cn(
          !token && "hidden",
          "w-56 fixed left-0 top-20 bg-white sidebar border-r-[1px] h-full"
        )}
        aria-label="Sidebar"
      >
        <div className="overflow-y-auto rounded h-[calc(100vh-115px)]">
          <ul>
            {getMenus().map((item) => (
              <NavLink key={item.id} name={item.name} link={item.link} />
            ))}
          </ul>
        </div>
      </aside>
    </>
  );
}
