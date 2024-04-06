import React, { useState } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { splitBase64IntoChunks, toBase64 } from "@/app/utils/common";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

function FileUploadField({
  label,
  form,
  name,
  placeholder = "example",
  type = "text",
}) {
  const [clickDelete, setClickDelete] = useState(false);
  const existingData = form.getValues(name);

  const deleteImage = () => {
    setClickDelete(true);
    form.setValue(name, []);
  };

  return (
    <div>
      {clickDelete || existingData?.length === 0 ? (
        <FormField
          control={form.control}
          name={name}
          render={({ field: { value, onChange, ...fieldProps } }) => (
            <FormItem>
              <FormLabel>{label}</FormLabel>
              <FormControl>
                <Input
                  type={type}
                  placeholder={placeholder}
                  {...fieldProps}
                  multiple
                  onChange={async (event) => {
                    let files = [];
                    for (const file of Array.from(event.target.files)) {
                      const base64 = await toBase64(file);
                      const chunks = splitBase64IntoChunks(base64, 100);
                      files.push({
                        name: file?.name || "empty",
                        // file_url: base64,
                        type: file?.type,
                        chunks,
                      });
                    }
                    form.setValue("articles", files);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      ) : (
        <div>
          <p className="p3 font-bold mt-2">Article</p>
          <div className="w-full bg-white py-2 px-3 rounded-md text-sm flex justify-between items-center">
            {existingData[0]?.name}

            <button
              type="button"
              onClick={deleteImage}
              className="text-negative"
            >
              <FontAwesomeIcon icon={faClose} className="text-[16px]" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default FileUploadField;
