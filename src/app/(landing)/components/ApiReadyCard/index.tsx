"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useApiKey } from "@/stores/ApiKeyState";
import { Wifi } from "lucide-react";
import React from "react";

export default function ApiReadyCard() {
  const { apiKey, limitExceeded } = useApiKey();
  const [showReadyMessage, setShowReadyMessage] = React.useState(!!apiKey);

  React.useEffect(() => {
    setShowReadyMessage(!!apiKey);
  }, [apiKey]);

  if (!showReadyMessage) {
    return null;
  }

  return (
    <Card
      className={`border-2 ${
        limitExceeded
          ? "border-error-200 bg-error-100 dark:bg-error-900 dark:border-error-800"
          : " border-success-200 bg-success-100 dark:bg-success-900 dark:border-success-800"
      }`}
    >
      <CardContent className="flex flex-row flex-wrap justify-between gap-4">
        <div className="flex flex-row gap-2 items-center">
          <Wifi />
          <p>
            {limitExceeded
              ? "Limite de uso desta Api KEY foi excedido, os dados serão atualizados novamente dentro de 24 horas"
              : "Dados Atualizados - Próxima atualização em 5 minutos"}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
