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
import SelectField from "../SelectField";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import CheckField from "../CheckField";
import { callService } from "@/app/utils/callService";
import { faultyTypes, userRoles } from "@/app/utils/constant";

function Index() {
  const [apiLoading, setApiLoading] = useState(false);
  const router = useRouter();

  const formSchema = z
    .object({
      username: z
        .string()
        .trim()
        .min(1, { message: "This field is required." }),
      role: z.string().trim().min(1, { message: "This field is required." }),
      email: z
        .string()
        .min(1, { message: "This field is required" })
        .email("This is not a valid email."),
      facultyType: z.string().min(1, { message: "This field is reqiured." }),
      password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters." })
        .max(32, { message: "Password should not exceed 32 characters." })
        .regex(/[A-Z]/, { message: "One uppercase character is required." })
        .regex(/[a-z]/, { message: "One lowercase character is required." })
        .regex(/[0-9]/, { message: "One number is required." })
        .regex(/[^A-Za-z0-9]/, {
          message: "One special character is required.",
        })
        .regex(/^[~`!@#$%^&*()_+=[\]\\{}|;':",.<>?a-zA-Z0-9-]+$/, {
          message: "Password must be English letters.",
        }),
      confirmpassword: z
        .string()
        .min(1, { message: "This field is required." }),
      accept: z.boolean().refine((value) => value === true, {
        message: "Please agree before registering.",
      }),
    })
    .refine((data) => data.password === data.confirmpassword, {
      path: ["confirmpassword"],
      message: "Passwords does not match",
    });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      role: "",
      confirmpassword: "",
      facultyType: "",
      accept: false,
    },
  });

  async function handleLogin(values) {
    console.log(values, "testing");
    router.push("/register-completed");
    // const response = await callService(
    //   "POST",
    //   "https://api.sinwattana.com/pro/authservice/api/key/",
    //   values,
    //   { token: "11212" }
    // );
    // console.log(response);
  }

  // function render icon check validate password
  const renderCheckValidatePassword = (values, validate) => {
    const regexMinMax = /^.{8,32}$/g;
    const regexDigit = /(?=.*?[0-9])/g;
    const regexUpper = /(?=.*?[A-Z])/g;
    const regexLower = /(?=.*?[a-z])/g;
    const regexSpecialCharacter = /[^A-Za-z0-9]/g;
    // check password not blank
    if (validate === "One number" && regexDigit.test(values)) {
      return (
        <FontAwesomeIcon icon={faCheck} className="text-sm text-positive" />
      );
    }
    // check min-max
    if (validate === "8-32 characters" && regexMinMax.test(values)) {
      return (
        <FontAwesomeIcon icon={faCheck} className="text-sm text-positive" />
      );
    }
    // check at least one uppercase
    if (validate === "One uppercase character" && regexUpper.test(values)) {
      return (
        <FontAwesomeIcon icon={faCheck} className="text-sm text-positive" />
      );
    }
    // check at least one lowercase
    if (validate === "One lowercase character" && regexLower.test(values)) {
      return (
        <FontAwesomeIcon icon={faCheck} className="text-sm text-positive" />
      );
    }
    // check one special characters
    if (
      validate === "One special character" &&
      regexSpecialCharacter.test(values)
    ) {
      return (
        <FontAwesomeIcon icon={faCheck} className="text-sm text-positive" />
      );
    }
    return <FontAwesomeIcon icon={faCheck} className="text-sm text-gray-300" />;
  };

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
          label="Email"
          name="email"
          form={form}
          placeholder="abc@gmail.com"
        />
        <SelectField
          label="Role"
          name="role"
          form={form}
          data={userRoles.slice(0, 2)}
        />
        <SelectField
          label="Faculty Type"
          name="facultyType"
          form={form}
          data={faultyTypes}
        />
        <InputField
          label="Password"
          name="password"
          form={form}
          type="password"
          placeholder="xxxx"
        />
        <div className="mt-4 md:grid md:grid-cols-2">
          <div>
            <div className="mb-1">
              {renderCheckValidatePassword(
                form.getValues("password"),
                "8-32 characters"
              )}
              <p className="ml-3 inline p3">8-32 characters</p>
            </div>
            <div className="mb-1">
              {renderCheckValidatePassword(
                form.getValues("password"),
                "One uppercase character"
              )}
              <p className="ml-3 inline p3">One uppercase character</p>
            </div>
            <div className="mb-1">
              {renderCheckValidatePassword(
                form.getValues("password"),
                "One lowercase character"
              )}
              <p className="ml-3 inline p3">One lowercase character</p>
            </div>
          </div>
          <div>
            <div className="mb-1">
              {renderCheckValidatePassword(
                form.getValues("password"),
                "One number"
              )}
              <p className="ml-3 inline p3">One number</p>
            </div>
            <div className="mb-1">
              {renderCheckValidatePassword(
                form.getValues("password"),
                "One special character"
              )}
              <p className="ml-3 inline p3">One special character</p>
            </div>
          </div>
        </div>
        <InputField
          label="Confirm Password"
          name="confirmpassword"
          form={form}
          type="password"
          placeholder="xxxx"
        />
        <CheckField
          name="accept"
          form={form}
          label="Please accept"
          className="mt-6"
        />
        <Button disabled={apiLoading} type="submit" className="w-full mt-8">
          {apiLoading ? "Please wait" : "Register"}
        </Button>
        <p className="text-center p3 mt-4">
          Already have an account?{" "}
          <Link href="/login" className="text-info">
            Log In
          </Link>
        </p>
      </form>
    </Form>
  );
}

export default Index;
