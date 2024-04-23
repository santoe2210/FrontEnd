import React from "react";
import Link from "next/link";
import { getToken } from "@/app/utils/cookie";
import NavProfile from "./NavProfile";

async function Navbar() {
  const token = await getToken();
  return (
    <div className="fixed left-0 top-0 w-full z-10">
      <div className="w-full bg-primary h-2.5" />
      <div className="antialiased bg-gray-100 border-b border-gray-200 navbar">
        <div className="w-full text-gray-700 bg-white">
          <div className="flex items-center justify-between h-[70px] max-w-full pl-5 pr-6 mx-auto md:px-6">
            <div className="flex flex-row items-center justify-between py-4">
              <Link
                href="/"
                className="text-lg smmx:text-sm font-semibold tracking-widest text-gray-900 uppercase rounded-lg focus:outline-none focus:shadow-outline"
              >
                UniVoice Magazine
              </Link>
            </div>
            <nav className="flex justify-end items-end">
              {token ? (
                <NavProfile />
              ) : (
                <Link
                  className="px-4 py-2 text-sm font-semibold bg-transparent rounded-lg md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                  href="/login"
                >
                  Sign In
                </Link>
              )}
            </nav>
            {/* <nav className="flex-col flex-grow pb-4 md:pb-0 md:flex md:justify-end md:flex-row mr-[25px]">
              {token ? (
                <NavProfile />
              ) : (
                <Link
                  className="px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                  href="/login"
                >
                  Sign In
                </Link>
              )}
            </nav> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
