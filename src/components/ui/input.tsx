/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as React from "react";
import { useController, Control } from "react-hook-form";
import Image from "next/image";
import Eye from "@/assets/icons/eye.svg";
import EyeClosed from "@/assets/icons/close-eye.svg";

import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  control: Control<any>;
  isPassword?: boolean;
}

function Input({
  name,
  control,
  className,
  isPassword = false,
  type = "text",
  ...props
}: InputProps) {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  const [showPassword, setShowPassword] = React.useState(false);
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div className="flex flex-col gap-1 relative">
      <input
        type={inputType}
        data-slot="input"
        className={cn(
          "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          error && "border-destructive aria-invalid",
          isPassword && "pr-10",
          className
        )}
        {...field}
        {...props}
      />
      {isPassword && (
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1"
          tabIndex={-1}
        >
          <Image
            src={showPassword ? EyeClosed : Eye}
            className="pointer-events-none dark:invert"
            alt=""
            width={16}
            height={16}
          />
        </button>
      )}
      {error && <p className="text-destructive text-sm">{error.message}</p>}
    </div>
  );
}

export { Input };
