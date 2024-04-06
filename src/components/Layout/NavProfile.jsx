"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { deleteToken } from "@/app/utils/cookie";
import { useDataContext } from "@/app/context/ContextProvider";

function NavProfile() {
  const router = useRouter();
  const { userprofile } = useDataContext();

  async function handleCookie() {
    await deleteToken();
    router.push("/login");
  }

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <p className="px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline">
            {userprofile?.name} ({userprofile?.role})
          </p>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
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
