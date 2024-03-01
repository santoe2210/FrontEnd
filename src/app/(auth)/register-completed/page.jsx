"use client";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";

function RegisterCompleted() {
  const resendEmail = () => {};

  return (
    <div className="max-w-[768px] mx-auto text-center">
      <FontAwesomeIcon
        icon={faCircleCheck}
        className="text-[100px] text-positive"
      />

      <h4 className="mt-7 font-bold">Account Activation Email Sent</h4>
      <p className="p1">
        Thank you for registration. We sent an activation link to your email.
        Please activate your email within 7 days.
      </p>
      <p className="p2 mt-7">
        Didn't receive the link?
        <button
          type="button"
          className="underline text-info ml-1 p2"
          onClick={resendEmail}
        >
          Resend
        </button>
      </p>
    </div>
  );
}

export default RegisterCompleted;
