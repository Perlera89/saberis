import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";

interface AddSpaceDialogProps {
  isAddWeekDialogOpen: boolean;
  setIsAddWeekDialogOpen: (isOpen: boolean) => void;
}

export default function AddSpaceDialog({
  isAddWeekDialogOpen,
  setIsAddWeekDialogOpen,
}: AddSpaceDialogProps) {
  return (
    <Dialog open={isAddWeekDialogOpen} onOpenChange={setIsAddWeekDialogOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setIsAddWeekDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Agregar Nueva Semana
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Agregar Nueva Semana</DialogTitle>
          <DialogDescription>
            Complete la información para agregar una nueva semana al curso.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="week-number">Número de Semana</Label>
            <Input id="week-number" type="number" min="1" placeholder="Ej: 4" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="week-title">Título</Label>
            <Input id="week-title" placeholder="Ej: Estructuras de Control" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="week-date-range">Rango de Fechas</Label>
            <Input
              id="week-date-range"
              placeholder="Ej: 26 Feb - 4 Mar, 2025"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="week-description">Descripción (Opcional)</Label>
            <Textarea
              id="week-description"
              placeholder="Breve descripción de los temas a tratar en esta semana"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setIsAddWeekDialogOpen(false)}
          >
            Cancelar
          </Button>
          <Button onClick={() => setIsAddWeekDialogOpen(false)}>
            Agregar Semana
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
