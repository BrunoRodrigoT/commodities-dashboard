"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useApiKey } from "@/contexts/ApiKeyContext";
import { Key } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";

export default function ApiKeyCard() {
  const { apiKey, setApiKey } = useApiKey();
  const [showForm, setShowForm] = React.useState(!apiKey);

  const { control, handleSubmit, reset } = useForm({
    defaultValues: { apiKey },
  });

  const onSubmit = (data: { apiKey: string }) => {
    setApiKey(data.apiKey);
    setShowForm(false);
  };

  const handleRemove = () => {
    setApiKey("");
    reset({ apiKey: "" });
    setShowForm(true);
  };

  React.useEffect(() => {
    reset({ apiKey });
    setShowForm(!apiKey);
  }, [apiKey, reset]);

  return (
    <Card className="border-2 border-info-200 bg-info-100 dark:bg-info-900 dark:border-info-800">
      <CardContent className="flex flex-row justify-between ">
        <div className="flex flex-row gap-2 items-center">
          <Key />
          <p>
            {showForm
              ? "Configure sua API Key para ter acesso aos dados em tempo real"
              : "Api KEY configurada para dados em tempo real"}
          </p>
        </div>
        {showForm ? (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-row gap-2 items-center w-xs"
          >
            <Input
              control={control}
              name="apiKey"
              type="password"
              isPassword
              placeholder="API Key"
              required
            />
            <Button variant="secondary" type="submit">
              Salvar
            </Button>
          </form>
        ) : (
          <div className="flex flex-row gap-2 items-center">
            <Button variant="secondary" onClick={() => setShowForm(true)}>
              Editar
            </Button>
            <Button variant="destructive" onClick={handleRemove}>
              Remover
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
