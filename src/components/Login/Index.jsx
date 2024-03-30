"use client";

import React, { useState } from "react";
import Link from "next/link";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import InputField from "../InputField";
import { Form } from "../ui/form";
import { useRouter } from "next/navigation";
import { setToken } from "@/app/utils/cookie";
import callService from "@/app/utils/callService";

function Index() {
  const [apiLoading, setApiLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const router = useRouter();

  const formSchema = z.object({
    username: z.string().trim().min(1, { message: "This field is required." }),
    password: z.string().min(1, { message: "This field is required." }),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function handleLogin(values) {
    setApiLoading(true);
    const response = await callService("POST", `${process.env.API_URL}/login`, {
      email: values.username,
      password: values.password,
    });

    if (response.status === 201) {
      await setToken(response.data.token);
      const routes = {
        MMR: "/marketing-manager",
        admin: "/admin",
        MCR: "/marketing-coordinator",
        Guest: "/guest",
        student: "/student/articles",
      };
      router.push(routes[response.data.student.role]);
      setApiLoading(false);
    } else if (response.status === 400) {
      setErrMsg("Email and password are incorrect.");
    } else {
      setErrMsg("The email is not registered yet.");
    }

    setApiLoading(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleLogin)}>
        <InputField
          label="Email"
          name="username"
          form={form}
          placeholder="Admin"
        />
        <InputField
          label="Password"
          name="password"
          form={form}
          type="password"
          placeholder="xxxx"
        />
        <Link href="/forgot-password" className="text-info block mt-2">
          <span className=" text-sm">Forgot your password?</span>
        </Link>
        <Button disabled={apiLoading} type="submit" className="w-full mt-2">
          {apiLoading ? "Please wait" : "Login"}
        </Button>
        <p className="text-center text-[12px] text-negative mt-2">
          {errMsg && errMsg}
        </p>
        <p className="text-center text-sm mt-4">
          Don't have an account?{" "}
          <Link href="/register" className="text-info">
            Join Us
          </Link>
        </p>
      </form>
    </Form>
  );
}

export default Index;
