"use client";

import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useDataContext } from "@/app/context/ContextProvider";

function NavLink({
  name,
  link,
  profileData,
  facultyTypes,
  academicYerLists,
  alldate,
}) {
  const { setUserProfile, setFacultyLists, setAcademicYearLists, setDate } =
    useDataContext();
  const pathname = usePathname();

  useEffect(() => {
    if (profileData) {
      setUserProfile(profileData?.data);
    }
    if (facultyTypes) {
      setFacultyLists(facultyTypes);
    }
    if (academicYerLists) {
      setAcademicYearLists(academicYerLists);
    }
    if (alldate) {
      setDate(alldate);
    }
  }, [profileData, facultyTypes, academicYerLists, alldate]);

  useEffect(() => {
    document.querySelectorAll(".sidebar a").forEach((link) => {
      link.classList.remove("active");

      if (pathname === "/" && link.dataset.nav === "Dashboard") {
        document
          .querySelector(`.sidebar a[data-nav="Dashboard"]`)
          .classList.add("active");

        return;
      }

      if (pathname === link.pathname && link.dataset.nav !== "Dashboard") {
        link.classList.add("active");
      }
    });
  }, [pathname]);

  return (
    <li className="border-b border-gray-200">
      <Link
        href={link}
        passHref
        style={{
          padding: "16px 4px",
        }}
        className="flex items-center p2 py-2 text-gray-900 hover:bg-gray-100"
      >
        <p className="ml-4 p2">{name}</p>
      </Link>
    </li>
  );
}

export default NavLink;
