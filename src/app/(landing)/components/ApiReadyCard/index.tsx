"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useApiKey } from "@/contexts/ApiKeyContext";
import { Wifi } from "lucide-react";
import React from "react";

export default function ApiReadyCard() {
  const { apiKey } = useApiKey();
  const [showReadyMessage, setShowReadyMessage] = React.useState(!!apiKey);

  React.useEffect(() => {
    setShowReadyMessage(!!apiKey);
  }, [apiKey]);

  if (!showReadyMessage) {
    return null;
  }

  return (
    <Card className="border-2 border-success-200 bg-success-100 dark:bg-success-900 dark:border-success-800">
      <CardContent className="flex flex-row flex-wrap justify-between gap-4">
        <div className="flex flex-row gap-2 items-center">
          <Wifi />
          <p>Dados Atualizados - Próxima atualização em 5 segundos</p>
        </div>
      </CardContent>
    </Card>
  );
}
