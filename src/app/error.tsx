"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function GlobalError({ error }: { error: Error }) {
  const { back } = useRouter();

  return (
    <html>
      <body>
        <div className="flex flex-col gap-8 items-center justify-center h-screen max-h-full text-center px-4">
          <h1 className="text-9xl font-extrabold bg-gradient-to-r from-red-500 to-orange-500 dark:from-red-300 dark:to-orange-400 text-transparent bg-clip-text">
            Erro!
          </h1>
          <h2 className="text-3xl font-semibold text-muted-foreground">
            Algo deu errado.
          </h2>
          <p className="text-muted-foreground lg:w-1/2 md:w-2/3 sm:w-3/4">
            {error.message}
          </p>
          <Button onClick={back}>Voltar</Button>
        </div>
      </body>
    </html>
  );
}
