"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useRouter, usePathname } from "next/navigation";
import { deleteToken } from "@/app/utils/cookie";
import { useDataContext } from "@/app/context/ContextProvider";
import { getFacultyFromID, getMenus } from "@/app/utils/common";
import Link from "next/link";
import { cn } from "@/lib/utils";

function NavProfile() {
  const router = useRouter();
  const { userprofile, facultyLists } = useDataContext();
  const pathname = usePathname();

  async function handleCookie() {
    await deleteToken();
    router.push("/login");
  }

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <p className="px-4 py-2 smmx:hidden block text-sm font-semibold bg-transparent rounded-lg md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline">
            {userprofile?.name} ({userprofile?.role}
            {userprofile?.role === "admin"
              ? null
              : `- ${getFacultyFromID(
                  facultyLists?.faculty,
                  userprofile?.faculty
                )}`}
            )
          </p>
          <p className="px-4 py-2 smmx:block hidden text-sm font-semibold bg-transparent rounded-lg md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline">
            {userprofile?.name} ({userprofile?.role})
          </p>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {getMenus(userprofile).map((menu) => (
            <DropdownMenuItem key={menu.id} className="hidden mdmax992:block">
              <Link
                href={menu.link}
                className={cn(
                  pathname === menu.link ? "font-bold" : "font-normal"
                )}
              >
                {menu.name}
              </Link>
            </DropdownMenuItem>
          ))}
          <DropdownMenuItem>
            <button type="button" onClick={handleCookie}>
              Logout
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default NavProfile;
