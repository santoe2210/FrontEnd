import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";

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
            <input
              type="file"
              multiple
              onChange={(event) => {
                let files = [];

                for (const file of Array.from(event.target.files)) {
                  const plain = { file: file, url: URL.createObjectURL(file) };
                  files.push(plain);
                }

                form.setValue("articles", files);
              }}
            />
            {/* <Input
              type={type}
              placeholder={placeholder}
              {...fieldProps}
              multiple
              onChange={(event) => {
                const files = event.target.files;
                let result = [];

                if (files && files.length > 0) {
                  Array.from(files).forEach((file) => {
                    console.log(file);
                    result.push({ ...file });
                  });
                  console.log(result);
                  form.setValue("articles", result);
                }
              }}
            /> */}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default FileUploadField;
