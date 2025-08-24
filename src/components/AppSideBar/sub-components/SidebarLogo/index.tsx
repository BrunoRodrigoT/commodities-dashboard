import { Wheat } from "lucide-react";

export default function SidebarLogo() {
  return (
    <div className="flex flex-row items-center gap-2">
      <div className="p-2 rounded-lg bg-green-600">
        <Wheat color="white" />
      </div>
      <div>
        <p className="font-semibold text-md">AgroData</p>
        <p className="text-muted-foreground text-xs">Dashboard Agrícola</p>
      </div>
    </div>
  );
}
