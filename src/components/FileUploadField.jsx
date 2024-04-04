import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { toBase64 } from "@/app/utils/common";

function FileUploadField({
  label,
  form,
  name,
  placeholder = "example",
  type = "text",
}) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field: { value, onChange, ...fieldProps } }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            {/* <input
              type="file"
              multiple
              onChange={async (event) => {
                let files = [];
                for (const file of Array.from(event.target.files)) {
                  const base64 = await toBase64(file);
                  files.push({
                    name: file?.name || "empty",
                    file_url: base64,
                  });
                }
                form.setValue("articles", files);

                // for (const file of Array.from(event.target.files)) {
                //   const base64 = await toBase64(file[0]);
                //   const plain = { file: file, url: URL.createObjectURL(file) };
                //   files.push(plain);
                // }

                // form.setValue("articles", files);
              }}
            /> */}
            <Input
              type={type}
              placeholder={placeholder}
              {...fieldProps}
              multiple
              onChange={async (event) => {
                let files = [];
                for (const file of Array.from(event.target.files)) {
                  const base64 = await toBase64(file);
                  files.push({
                    name: file?.name || "empty",
                    file_url: base64,
                    type: file?.type,
                  });
                }
                form.setValue("articles", files);

                // for (const file of Array.from(event.target.files)) {
                //   const base64 = await toBase64(file[0]);
                //   const plain = { file: file, url: URL.createObjectURL(file) };
                //   files.push(plain);
                // }

                // form.setValue("articles", files);
              }}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default FileUploadField;
