"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

export default function SignInTab() {
  return (
    <TabsContent value="login">
      <Card>
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>
            Olá, seja bem-vindo de volta! Escolha uma opção de login:
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Button
            className="flex items-center gap-2"
            onClick={() => signIn("google", { callbackUrl: "/" })}
          >
            <FcGoogle size={20} />
            Entrar com Google
          </Button>
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => signIn("github", { callbackUrl: "/" })}
          >
            <FaGithub size={20} />
            Entrar com GitHub
          </Button>
        </CardContent>
        <CardFooter className="justify-center text-sm text-muted-foreground">
          Ao continuar, você aceita nossos termos de uso e política de
          privacidade.
        </CardFooter>
      </Card>
    </TabsContent>
  );
}
