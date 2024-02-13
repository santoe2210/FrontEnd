"use client";

import React, { useState } from "react";
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
    <div className="max-w-[600px] mx-auto">
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
          <Button disabled={apiLoading} type="submit" className="w-full mt-10">
            {apiLoading ? "Please wait" : "Login"}
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default Index;
