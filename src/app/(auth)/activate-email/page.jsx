import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";

function ActivateEmail() {
  return (
    <div className="flex-grow p-[4em] flex flex-col items-center justify-center max-w-[550px] mx-auto text-center">
      <FontAwesomeIcon
        icon={faCircleCheck}
        className="text-[100px] text-positive"
      />
      <h4 className="mt-7 font-bold">Activation Completed</h4>
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
