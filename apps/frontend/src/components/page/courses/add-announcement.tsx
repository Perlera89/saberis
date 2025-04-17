import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";

interface AddAnnouncementDialogParams {
  isAddAnnouncementDialogOpen: boolean;
  setIsAddAnnouncementDialogOpen: (isOpen: boolean) => void;
}

export default function AddAnnouncementDialog({
  isAddAnnouncementDialogOpen,
  setIsAddAnnouncementDialogOpen,
}: AddAnnouncementDialogParams) {
  return (
    <Dialog
      open={isAddAnnouncementDialogOpen}
      onOpenChange={setIsAddAnnouncementDialogOpen}
    >
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="w-full">
          <Plus className="h-4 w-4 mr-2" />
          Crear Anuncio
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Crear Nuevo Anuncio</DialogTitle>
          <DialogDescription>
            Publique un anuncio para todos los estudiantes del curso.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="announcement-title">Título</Label>
            <Input
              id="announcement-title"
              placeholder="Ej: Cambio en la fecha de entrega"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="announcement-content">Contenido</Label>
            <Textarea
              id="announcement-content"
              placeholder="Escriba el contenido del anuncio..."
              className="min-h-[150px]"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="announcement-importance">Importancia</Label>
            <Select>
              <SelectTrigger id="announcement-importance">
                <SelectValue placeholder="Seleccionar nivel de importancia" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="important">Importante</SelectItem>
                  <SelectItem value="urgent">Urgente</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="send-notification" />
            <Label htmlFor="send-notification">
              Enviar notificación a los estudiantes
            </Label>
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setIsAddAnnouncementDialogOpen(false)}
          >
            Cancelar
          </Button>
          <Button onClick={() => setIsAddAnnouncementDialogOpen(false)}>
            Publicar Anuncio
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
