import ClosureDateTable from "@/components/Admin/ClosureDateTable";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <>
      {" "}
      <div className="h-[60px] bg-white w-full px-5 py-5 p3">
        <Link
          href="/admin"
          className="hover:text-info hover:underline transition"
          passHref
        >
          Admin
        </Link>{" "}
        &gt; <span className="font-bold">Academic Closure Dates</span>{" "}
      </div>
      <div className="py-9 px-12">
        <ClosureDateTable />
      </div>
    </>
  );
};

export default page;
