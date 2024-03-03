"use client";

import React from "react";
import NextTopLoader from "nextjs-toploader";

function ProgressProvider({ children }) {
  return (
    <>
      <NextTopLoader />
      {children}
    </>
  );
}

export default ProgressProvider;
