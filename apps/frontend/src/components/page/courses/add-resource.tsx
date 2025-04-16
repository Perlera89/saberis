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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Upload } from "lucide-react";
import { useState } from "react";

interface AddResourceDialogProps {
  isAddResourceDialogOpen: boolean;
  setIsAddResourceDialogOpen: (isOpen: boolean) => void;
}

export default function AddResourceDialog({
  isAddResourceDialogOpen,
  setIsAddResourceDialogOpen,
}: AddResourceDialogProps) {
  const [resourceType, setResourceType] = useState("document");

  return (
    <Dialog
      open={isAddResourceDialogOpen}
      onOpenChange={setIsAddResourceDialogOpen}
    >
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Agregar Recurso
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Agregar Nuevo Recurso</DialogTitle>
          <DialogDescription>
            Seleccione el tipo de recurso que desea agregar al curso.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="resource-type">Tipo de Recurso</Label>
            <Select value={resourceType} onValueChange={setResourceType}>
              <SelectTrigger id="resource-type">
                <SelectValue placeholder="Seleccionar tipo de recurso" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="document">Documento</SelectItem>
                  <SelectItem value="video">Video</SelectItem>
                  <SelectItem value="assignment">Tarea</SelectItem>
                  <SelectItem value="quiz">Cuestionario</SelectItem>
                  <SelectItem value="link">Enlace</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="title">Título</Label>
            <Input id="title" placeholder="Título del recurso" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Descripción</Label>
            <Textarea id="description" placeholder="Descripción breve" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="week">Semana</Label>
            <Select>
              <SelectTrigger id="week">
                <SelectValue placeholder="Seleccionar semana" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="1">Semana 1</SelectItem>
                  <SelectItem value="2">Semana 2</SelectItem>
                  <SelectItem value="3">Semana 3</SelectItem>
                  <SelectItem value="4">Semana 4</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          {resourceType === "document" && (
            <div className="space-y-2">
              <Label htmlFor="file">Archivo</Label>
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground mb-2">
                  Arrastre y suelte un archivo aquí, o haga clic para
                  seleccionar
                </p>
                <Button variant="outline" size="sm">
                  Seleccionar Archivo
                </Button>
              </div>
            </div>
          )}
          {resourceType === "video" && (
            <div className="space-y-2">
              <Label htmlFor="video-url">URL del Video</Label>
              <Input id="video-url" placeholder="https://..." />
            </div>
          )}
          {resourceType === "assignment" && (
            <>
              <div className="space-y-2">
                <Label htmlFor="due-date">Fecha de Entrega</Label>
                <Input id="due-date" type="datetime-local" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="points">Puntos</Label>
                <Input id="points" type="number" min="0" placeholder="100" />
              </div>
            </>
          )}
          {resourceType === "quiz" && (
            <>
              <div className="space-y-2">
                <Label htmlFor="due-date">Fecha Límite</Label>
                <Input id="due-date" type="datetime-local" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time-limit">Tiempo Límite (minutos)</Label>
                <Input id="time-limit" type="number" min="1" placeholder="30" />
              </div>
            </>
          )}
          {resourceType === "link" && (
            <div className="space-y-2">
              <Label htmlFor="link-url">URL</Label>
              <Input id="link-url" placeholder="https://..." />
            </div>
          )}
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setIsAddResourceDialogOpen(false)}
          >
            Cancelar
          </Button>
          <Button onClick={() => setIsAddResourceDialogOpen(false)}>
            Agregar Recurso
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
