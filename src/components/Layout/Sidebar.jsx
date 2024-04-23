import React from "react";
import { cn } from "@/lib/utils";
import NavLink from "./NavLink";
import { getToken } from "@/app/utils/cookie";
import { useDataContext } from "@/app/context/ContextProvider";
import { getMenus } from "@/app/utils/common";

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

  return (
    <>
      <aside
        className={cn(
          !token && "hidden",
          "w-56 mdmax992:w-0 fixed left-0 top-20 bg-white sidebar border-r-[1px] h-full"
        )}
        aria-label="Sidebar"
      >
        <div className="overflow-y-auto rounded h-[calc(100vh-115px)]">
          <ul>
            {getMenus(profile?.data).map((item) => (
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
