import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

function ActivateEmail() {
  return (
    <div className="p-[4em]">
      <FontAwesomeIcon icon={faCircleCheck} className="text-sm" />
    </div>
  );
}

export default ActivateEmail;
