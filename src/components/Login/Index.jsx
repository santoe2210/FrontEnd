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

function Index() {
  const [apiLoading, setApiLoading] = useState(false);
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

    await setToken(values.username);

    router.push("/");

    setApiLoading(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleLogin)}>
        <InputField
          label="Username"
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
