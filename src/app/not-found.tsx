"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Error() {
  const { back } = useRouter();

  return (
    <div className="flex flex-col gap-8 items-center justify-center h-screen max-h-full text-center px-4">
      <h1 className="text-9xl font-extrabold bg-gradient-to-r from-primary-500 to-pink-500 dark:from-primary-200 dark:to-pink-400 text-transparent bg-clip-text">
        Oops!
      </h1>
      <h1 className="text-muted-foreground font-light lg:w-1/2 md:w-2/3 sm:w-3/4">
        404 - Página não encontrada
      </h1>
      <Button onClick={back}>Voltar</Button>
    </div>
  );
}
