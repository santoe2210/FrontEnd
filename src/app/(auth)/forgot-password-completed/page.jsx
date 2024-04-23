import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

function ForgotCompeleted() {
  return (
    <div className="max-w-[768px] mx-auto smmx:mx-4 text-center">
      <FontAwesomeIcon
        icon={faCircleCheck}
        className="text-[100px] smmx:text-[70px] text-positive"
      />

      <h4 className="mt-7 font-bold">Reset Password Email Sent</h4>
      <p className="p1">
        Thank you for joining. We sent an reset password link to your email.
        Please reset your email within 7 days.
      </p>
    </div>
  );
}

export default ForgotCompeleted;
