import Index from "@/components/Login/Index";
import React from "react";

function page() {
  return (
    <div className="max-w-[1200px] mx-auto">
      <h3 className="text-primary">Simple Login Page</h3>
      <p>username: admin, password: 123</p>
      <div className="max-w-[600px] mx-auto">
        <Index />
      </div>
    </div>
  );
}

export default page;
