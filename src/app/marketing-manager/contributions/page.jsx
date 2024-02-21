import Link from "next/link";
import React from "react";
import ContributionTable from "@/components/MarketingManager/ContributionTable";

function ContributionsLists() {
  return (
    <>
      <div className="h-[60px] bg-white w-full px-5 py-5 p3">
        <Link
          href="/marketing-manager"
          className="hover:text-info hover:underline transition"
          passHref
        >
          Marketing Manager
        </Link>{" "}
        &gt; <span className="font-bold">Contributions</span>{" "}
      </div>
      <div className="py-9 px-12">
        <ContributionTable />
      </div>
    </>
  );
}

export default ContributionsLists;
