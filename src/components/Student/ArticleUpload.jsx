"use client";

import React, { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import InputField from "@/components/InputField";
import CheckField from "@/components/CheckField";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import FileUploadField from "@/components/FileUploadField";
import callService from "@/app/utils/callService";

const FormSchema = z.object({
  articleName: z.string().min(1, { message: "Please give an aritcle a name." }),
  // article: z.string().min(1, { message: "Please upload an article." }),
  termsAggred: z.boolean().refine((value) => value === true, {
    message: "Please agree before uploading.",
  }),
});

function ArticleUpload({ userToken }) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      articleName: "",
      articles: [],
      termsAggred: false,
    },
  });

  const { toast } = useToast();
  const onSubmit = async () => {
    const values = form.getValues();
    const response = await callService(
      "POST",
      `${process.env.API_URL}/file/uploadFile`,
      {
        title: values.articleName,
        files: values.articles,
        termsAgreed: true,
      },

      {
        Authorization: `Bearer ${userToken}`,
      }
    );
    if (response.status === 201) {
      router.back();
    }
    //POST
    // const error = new Error();
    // if (error) {
    //   toast({
    //     variant: "destructive",
    //     title: `Error submitting article!`,
    //     action: <ToastAction altText="OK">OK</ToastAction>,
    //   });
    // } else {
    //   toast({
    //     title: `Article submitted!`,
    //     action: <ToastAction altText="OK">OK</ToastAction>,
    //   });
    //   console.log(values);
    //   router.push("/student/articles");
    // }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <InputField
          label="Article Name"
          name="articleName"
          form={form}
          placeholder="Article Name"
        />
        <FileUploadField
          label="Article"
          name="articles"
          form={form}
          placeholder="Article"
          type="file"
        />
        <CheckField
          name="termsAggred"
          form={form}
          label="Please accept the terms before uploading the article."
          className="mt-6"
        />
        <Button className="mt-8 w-full" type="submit">
          {isEditing ? "Update" : "Submit"}{" "}
        </Button>
      </form>
    </Form>
  );
}

export default ArticleUpload;
