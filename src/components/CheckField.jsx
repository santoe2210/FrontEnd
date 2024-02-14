import React from "react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Checkbox } from "./ui/checkbox";
import { cn } from "@/lib/utils";

function CheckField({ label, name, form, description, className }) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem
          className={cn(
            "flex flex-row items-start space-x-3 space-y-0",
            className
          )}
        >
          <FormControl>
            <Checkbox
              className="mt-1"
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          </FormControl>
          <div className="leading-none">
            <FormLabel>{label}</FormLabel>
            {description && <FormDescription>{description}</FormDescription>}
            <FormMessage className="-ml-7 mt-1" />
          </div>
        </FormItem>
      )}
    />
  );
}

export default CheckField;
