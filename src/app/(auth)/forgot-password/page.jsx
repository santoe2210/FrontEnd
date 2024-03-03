"use client";

import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import InputField from "@/components/InputField";
import { Form } from "@/components/ui/form";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: "This field is required" })
    .email("This is not a valid email."),
});

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [apiLoading, setApiLoading] = useState(false);
  const router = useRouter();

  const handleEmailSubmit = async (values) => {
    console.log(values.email);
    router.push(`/reset-password/${values.email}`);
  };

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  return (
    <div className="max-w-[600px] mx-auto">
      <h3 className="text-primary font-bold">Forgot Your Password?</h3>
      <p className="p3">
        Enter the email address associated with your account and we’ll send you
        a link to reset your password.
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleEmailSubmit)}
          className="w-full "
        >
          <InputField
            label="Email"
            name="email"
            form={form}
            placeholder="abc@gmail.com"
          />

          <Button disabled={apiLoading} type="submit" className="w-full mt-8">
            {apiLoading ? "Please wait" : "Submit"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ForgotPasswordPage;
