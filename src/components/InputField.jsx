"use client";

import React, { useState } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

function InputField({
  label,
  form,
  name,
  placeholder = "example",
  type = "text",
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative mt-2">
      <FormField
        control={form.control}      
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <Input
                type={showPassword ? "text" : type}
                placeholder={placeholder}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="absolute right-[10px] top-[40px]">
        {type === "password" && String(form.getValues(name)).length > 0 && (
          <p className="mb-0 text-sm text-gray">
            <FontAwesomeIcon
              icon={showPassword ? faEye : faEyeSlash}
              onKeyDown={() => setShowPassword((pre) => !pre)}
              onClick={() => setShowPassword((pre) => !pre)}
              tabIndex={-1}
              role="presentation"
              className="outline-none cursor-pointer"
            />
          </p>
        )}
      </div>
    </div>
  );
}

export default InputField;
