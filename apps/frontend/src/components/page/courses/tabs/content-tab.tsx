import { Button } from "@/components/ui/button";
import {
  ChevronDown,
  Clock,
  Edit,
  FileText,
  Info,
  PlayCircle,
  Plus,
  Trash,
  Video,
} from "lucide-react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import AddAnnouncementDialog from "../add-announcement";
import AddSpaceDialog from "../add-space";
import AddResourceDialog from "../add-resource";

const userPermissions = {
  isAdmin: true, // Cambiar a false para ver la vista de estudiante
  canEditCourse: true,
  canAddResources: true,
  canManageStudents: true,
  canViewAttendance: true,
  canManageGrades: true,
};

export default function ContentTab() {
  const [isAddResourceDialogOpen, setIsAddResourceDialogOpen] = useState(false);
  const [isAddWeekDialogOpen, setIsAddWeekDialogOpen] = useState(false);
  const [isAddAnnouncementOpen, setIsAddAnnouncemenOpen] = useState(false);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        {userPermissions.canAddResources && (
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Contenido del Curso</h2>
            <AddResourceDialog
              isAddResourceDialogOpen={isAddResourceDialogOpen}
              setIsAddResourceDialogOpen={setIsAddResourceDialogOpen}
            />
          </div>
        )}

        {/* Contenido organizado por semanas */}
        <div className="space-y-4">
          {weeks.map((week) => (
            <Card key={week.id} className="overflow-hidden">
              <CardHeader
                className="bg-muted/50 p-4 cursor-pointer"
                onClick={() => {}}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="text-sm font-medium text-primary">
                        {week.number}
                      </span>
                    </div>
                    <div>
                      <CardTitle className="text-base">{week.title}</CardTitle>
                      <CardDescription>{week.dateRange}</CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {userPermissions.canAddResources && (
                      <Button variant="ghost" size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Agregar
                      </Button>
                    )}
                    <ChevronDown className="h-5 w-5 text-muted-foreground" />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-border">
                  {week.materials.map((material) => (
                    <div key={material.id} className="p-4 flex items-start">
                      <div className="mr-3 mt-0.5">
                        {material.type === "video" && (
                          <div className="bg-blue-500/20 p-1.5 rounded-md">
                            <PlayCircle className="h-4 w-4 text-blue-500" />
                          </div>
                        )}
                        {material.type === "document" && (
                          <div className="bg-red-500/20 p-1.5 rounded-md">
                            <FileText className="h-4 w-4 text-red-500" />
                          </div>
                        )}
                        {material.type === "assignment" && (
                          <div className="bg-orange-500/20 p-1.5 rounded-md">
                            <FileText className="h-4 w-4 text-orange-500" />
                          </div>
                        )}
                        {material.type === "quiz" && (
                          <div className="bg-purple-500/20 p-1.5 rounded-md">
                            <FileText className="h-4 w-4 text-purple-500" />
                          </div>
                        )}
                        {material.type === "link" && (
                          <div className="bg-green-500/20 p-1.5 rounded-md">
                            <Info className="h-4 w-4 text-green-500" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="font-medium text-sm">
                              {material.title}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {material.description}
                            </p>
                            {material.dueDate && (
                              <div className="flex items-center text-xs text-muted-foreground mt-1">
                                <Clock className="h-3 w-3 mr-1" />
                                <span>Fecha límite: {material.dueDate}</span>
                              </div>
                            )}
                          </div>
                          {material.completed && (
                            <Badge
                              variant="outline"
                              className="bg-green-500/10 text-green-500 border-green-500/20"
                            >
                              Completado
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={material.url || "#"}>
                            {material.type === "assignment" ||
                            material.type === "quiz"
                              ? "Entregar"
                              : "Ver"}
                          </Link>
                        </Button>
                        {userPermissions.canAddResources && (
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <Edit className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Edit className="h-4 w-4 mr-2" />
                                Editar
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Clock className="h-4 w-4 mr-2" />
                                Cambiar Fecha
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-destructive">
                                <Trash className="h-4 w-4 mr-2" />
                                Eliminar
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              {userPermissions.canAddResources && (
                <CardFooter className="p-3 bg-muted/30 flex justify-center">
                  <Button variant="ghost" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Agregar Recurso a esta Semana
                  </Button>
                </CardFooter>
              )}
            </Card>
          ))}
        </div>
        <div className="flex justify-center mt-4">
          <AddSpaceDialog
            isAddWeekDialogOpen={isAddWeekDialogOpen}
            setIsAddWeekDialogOpen={setIsAddWeekDialogOpen}
          />
        </div>
      </div>

      <div>
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Próximas Actividades</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3">
                  <div className="mt-0.5">
                    {activity.type === "quiz" && (
                      <div className="bg-purple-500/20 p-1.5 rounded-md">
                        <FileText className="h-4 w-4 text-purple-500" />
                      </div>
                    )}
                    {activity.type === "assignment" && (
                      <div className="bg-orange-500/20 p-1.5 rounded-md">
                        <FileText className="h-4 w-4 text-orange-500" />
                      </div>
                    )}
                    {activity.type === "live" && (
                      <div className="bg-green-500/20 p-1.5 rounded-md">
                        <Video className="h-4 w-4 text-green-500" />
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{activity.title}</p>
                    <div className="flex items-center text-xs text-muted-foreground mt-1">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>{activity.dueDate}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="pt-0">
            <Button variant="ghost" size="sm" className="w-full" asChild>
              <Link href="/calendar">Ver Calendario Completo</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Anuncios del Curso</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {announcements.map((announcement) => (
                <div
                  key={announcement.id}
                  className="border-b border-border pb-3 last:border-0 last:pb-0"
                >
                  <p className="font-medium text-sm">{announcement.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {announcement.content}
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-xs text-muted-foreground">
                      {announcement.date}
                    </p>
                    <Button
                      variant="link"
                      size="sm"
                      className="h-auto p-0"
                      asChild
                    >
                      <Link href="#">Leer más</Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="pt-0">
            <AddAnnouncementDialog
              isAddAnnouncementDialogOpen={isAddAnnouncementOpen}
              setIsAddAnnouncementDialogOpen={setIsAddAnnouncemenOpen}
            />
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

const weeks = [
  {
    id: 1,
    number: 1,
    title: "Introducción y Conceptos Básicos",
    dateRange: "5 - 11 Febrero, 2025",
    materials: [
      {
        id: 101,
        title: "Presentación del Curso",
        description: "Objetivos, metodología y evaluación",
        type: "document",
        url: "#",
        completed: true,
      },
      {
        id: 102,
        title: "Clase 1: Introducción a la Informática",
        description: "Grabación de la clase del 5 de Febrero",
        type: "video",
        url: "#",
        completed: true,
      },
      {
        id: 103,
        title: "Lectura: Historia de la Computación",
        description: "Capítulo 1 del libro de texto",
        type: "document",
        url: "#",
        completed: true,
      },
      {
        id: 104,
        title: "Cuestionario de Conceptos Básicos",
        description: "Evaluación de conocimientos previos",
        type: "quiz",
        dueDate: "11 Feb, 23:59",
        url: "#",
        completed: true,
      },
    ],
  },
  {
    id: 2,
    number: 2,
    title: "Algoritmos y Lógica de Programación",
    dateRange: "12 - 18 Febrero, 2025",
    materials: [
      {
        id: 201,
        title: "Clase 2: Introducción a los Algoritmos",
        description: "Grabación de la clase del 12 de Febrero",
        type: "video",
        url: "#",
        completed: true,
      },
      {
        id: 202,
        title: "Diagramas de Flujo",
        description: "Material complementario",
        type: "document",
        url: "#",
        completed: true,
      },
      {
        id: 203,
        title: "Tarea 1: Diseño de Algoritmos",
        description: "Resolver los problemas propuestos",
        type: "assignment",
        dueDate: "18 Feb, 23:59",
        url: "#",
        completed: false,
      },
      {
        id: 204,
        title: "Recursos adicionales: Pseudocódigo",
        description: "Enlaces a tutoriales y ejemplos",
        type: "link",
        url: "#",
        completed: false,
      },
    ],
  },
  {
    id: 3,
    number: 3,
    title: "Variables y Tipos de Datos",
    dateRange: "19 - 25 Febrero, 2025",
    materials: [
      {
        id: 301,
        title: "Clase 3: Variables y Tipos de Datos",
        description: "Grabación de la clase del 19 de Febrero",
        type: "video",
        url: "#",
        completed: false,
      },
      {
        id: 302,
        title: "Ejercicios Prácticos",
        description: "Ejemplos resueltos",
        type: "document",
        url: "#",
        completed: false,
      },
      {
        id: 303,
        title: "Tarea 2: Operaciones con Variables",
        description: "Implementar los algoritmos propuestos",
        type: "assignment",
        dueDate: "25 Feb, 23:59",
        url: "#",
        completed: false,
      },
    ],
  },
];

const upcomingActivities = [
  {
    id: 1,
    title: "Tarea 2: Operaciones con Variables",
    dueDate: "25 Feb, 23:59",
    type: "assignment",
  },
  {
    id: 2,
    title: "Cuestionario: Tipos de Datos",
    dueDate: "28 Feb, 23:59",
    type: "quiz",
  },
  {
    id: 3,
    title: "Clase Virtual: Resolución de Problemas",
    dueDate: "26 Feb, 18:00",
    type: "live",
  },
  {
    id: 4,
    title: "Examen Parcial",
    dueDate: "15 Mar, 10:00",
    type: "quiz",
  },
];

const announcements = [
  {
    id: 1,
    title: "Cambio en la fecha de entrega",
    content:
      "La fecha límite para la Tarea 1 se ha extendido hasta el 20 de Febrero.",
    date: "15 Feb, 2025",
  },
  {
    id: 2,
    title: "Sesión de tutoría adicional",
    content:
      "Este jueves habrá una sesión de tutoría extra para resolver dudas sobre algoritmos.",
    date: "13 Feb, 2025",
  },
  {
    id: 3,
    title: "Material complementario disponible",
    content:
      "Se han subido nuevos recursos para ayudarles con los ejercicios de la semana 2.",
    date: "12 Feb, 2025",
  },
];
