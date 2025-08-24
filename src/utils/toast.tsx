import Toast from "@/components/Toast";
import { IToastProps } from "@/components/Toast/types";
import { toast as sonnerToast } from "sonner";

export default function toast({ duration, ...toast }: Omit<IToastProps, "id">) {
  return sonnerToast.custom((id) => <Toast id={id} {...toast} />, {
    duration,
    position: "top-right",
  });
}
