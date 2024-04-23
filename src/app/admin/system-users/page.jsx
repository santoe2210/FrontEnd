import React from "react";
import Link from "next/link";
import UserTable from "@/components/Admin/SystemUsers/UserTable";
import { getToken } from "@/app/utils/cookie";

async function getAllUsers(userToken) {
  const res = await fetch(`${process.env.API_URL}/students`, {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });

  if (!res.ok) {
    console.log("Failed to fetch data");
  }

  return res.json();
}

async function UserLists() {
  const token = await getToken();
  const userData = await getAllUsers(token);

  return (
    <>
      <div className="h-[60px] smmx:h-auto bg-white w-full px-5 py-5 p3">
        <Link
          href="/admin"
          className="hover:text-info hover:underline transition"
          passHref
        >
          Admin
        </Link>{" "}
        &gt; <span className="font-bold">Users</span>{" "}
      </div>
      <div className="py-9 px-12 smmx:px-5">
        <UserTable userData={userData?.students} />
      </div>
    </>
  );
}

export default UserLists;
