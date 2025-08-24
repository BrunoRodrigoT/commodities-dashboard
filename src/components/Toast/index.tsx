"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { IToastProps } from "./types";
import { toastVariants } from "./constants";
import { toast } from "sonner";

export default function Toast({
  id,
  type,
  message,
}: Omit<IToastProps, "duration">) {
  function handleRemoveToast() {
    toast.dismiss(id);
  }

  return (
    <div
      className={cn(toastVariants({ variant: type }))}
      onClick={handleRemoveToast}
    >
      <p>{message}</p>
    </div>
  );
}
