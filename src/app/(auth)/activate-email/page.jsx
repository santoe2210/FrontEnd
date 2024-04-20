"use client";

import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import callService from "@/app/utils/callService";

function ActivateEmail() {
  const [activate, setActivate] = useState(true);
  const searchParams = useSearchParams();
  const searchtk = searchParams.get("token");
  const searchid = searchParams.get("id");

  const verifyEmail = async () => {
    const response = await callService(
      "GET",
      `${process.env.API_URL}/user/${searchid}/verify/${searchtk}`,
      null
    );
    if (response.status === 201) {
      setActivate(true);
    } else {
      setActivate(false);
    }
  };

  useEffect(() => {
    if (searchid && searchtk) {
      verifyEmail();
    }
  }, [searchid, searchtk]);

  return (
    <div className="flex-grow p-[4em] flex flex-col items-center justify-center max-w-[550px] mx-auto text-center">
      <FontAwesomeIcon
        icon={faCircleCheck}
        className="text-[100px] text-positive"
      />
      <h4 className="mt-7 font-bold">Activation Completed</h4>
      <p>{activate ? "activated" : "failed"}</p>
      <p className="p2">
        Your account is now activated. And, explore the annual magazine.{" "}
        <Link href="/login" className="text-info underline">
          Log In
        </Link>
      </p>
    </div>
  );
}

export default ActivateEmail;
