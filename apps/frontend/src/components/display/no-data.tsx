import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { H3, Muted } from "./typography";

interface NoDataProps {
  title: string;
  descripcion: string;
  onClick: () => void;
}

export default function NoData({ title, descripcion, onClick }: NoDataProps) {
  return (
    <div className="flex items-center justify-center rounded-lg border border-dashed shadow-sm h-[79vh] mt-4">
      <div className="flex flex-col items-center gap-1 justify-center h-full">
        <H3>{title}</H3>
        <Muted>{descripcion}</Muted>
        <Button className="mt-4" onClick={onClick}>
          <Plus className="mr-2 h-4 w-4" /> Agregar
        </Button>
      </div>
    </div>
  );
}
