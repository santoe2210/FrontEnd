import React from "react";
import Link from "next/link";
import UserTable from "@/components/Admin/SystemUsers/UserTable";

function UserLists() {
  return (
    <>
      <div className="h-[60px] bg-white w-full px-5 py-5 p3">
        <Link
          href="/admin"
          className="hover:text-info hover:underline transition"
          passHref
        >
          Admin
        </Link>{" "}
        &gt; <span className="font-bold">Users</span>{" "}
      </div>
      <div className="py-9 px-12">
        <UserTable />
      </div>
    </>
  );
}

export default UserLists;
