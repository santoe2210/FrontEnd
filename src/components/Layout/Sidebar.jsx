import React from "react";
import { cn } from "@/lib/utils";
import NavLink from "./NavLink";
import { getToken } from "@/app/utils/cookie";
import { useDataContext } from "@/app/context/ContextProvider";

async function getProfileData(userToken) {
  const res = await fetch(`${process.env.API_URL}/profile/me`, {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });

  if (!res.ok) {
    console.log("failed to fetch");
  }

  return res.json();
}

async function getAllFaculty() {
  const res = await fetch(`${process.env.API_URL}/faculty/getAllFaculty`, {});

  if (!res.ok) {
    console.log("Failed to fetch data");
  }

  return res.json();
}

async function getAcademicYearLists() {
  const res = await fetch(
    `${process.env.API_URL}/academicYear/getAllacademicYear`
  );

  if (!res.ok) {
    console.log("Failed to fetch data");
  }

  return res.json();
}

async function getAllDate(userToken) {
  const res = await fetch(`${process.env.API_URL}/dateSetting/dates`, {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });

  if (!res.ok) {
    console.log("Failed to fetch data");
  }

  return res.json();
}

export default async function Sidebar() {
  const token = await getToken();
  const profile = token && (await getProfileData(token));
  const facultyTypes = await getAllFaculty();
  const academicYerLists = await getAcademicYearLists();
  const alldate = await getAllDate(token);

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

  const menusMCR = [
    { id: 0, name: "Dashboard", link: "/marketing-coordinator" },
    { id: 1, name: "Articles", link: "/marketing-coordinator/articles" },
  ];
  const menusGuest = [
    { id: 0, name: "Dashboard", link: "/guest" },
    { id: 1, name: "Articles", link: "/guest/articles" },
  ];
  const menusStudent = [{ id: 0, name: "Articles", link: "/student/articles" }];

  const getMenus = () => {
    if (profile?.data?.role === "admin") {
      return menusAdmin;
    }
    if (profile?.data?.role === "marketing coordinator") {
      return menusMCR;
    }
    if (profile?.data?.role === "guest") {
      return menusGuest;
    }
    if (profile?.data?.role === "student") {
      return menusStudent;
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
              <NavLink
                key={item.id}
                name={item.name}
                link={item.link}
                profileData={profile}
                facultyTypes={facultyTypes}
                academicYerLists={academicYerLists}
                alldate={alldate}
              />
            ))}
          </ul>
        </div>
      </aside>
    </>
  );
}
