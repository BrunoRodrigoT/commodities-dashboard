/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Control, useController } from "react-hook-form";

interface TextAreaProps extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  control: Control<any>;
}

function Textarea({ name, control, className, ...props }: TextAreaProps) {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  return (
    <div className="flex flex-col gap-1 ">
      <textarea
        data-slot="textarea"
        className={cn(
          "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        {...field}
        {...props}
      />
      {error && <p className="text-destructive text-sm">{error.message}</p>}
    </div>
  );
}

export { Textarea };
