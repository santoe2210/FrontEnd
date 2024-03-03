import Index from "@/components/Login/Index";
import React from "react";

function login() {
  return (
    <div className="max-w-[600px] mx-auto bg-white px-10 py-8 rounded-lg">
      <h4 className="font-bold">Welcome Back!</h4>
      <p className="p3 mb-6">Please enter your account here.</p>
      <Index />
    </div>
  );
}

export default login;
