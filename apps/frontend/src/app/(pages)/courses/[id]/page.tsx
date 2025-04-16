"use client";

import { use } from "react";
import Link from "next/link";
import { ArrowLeft, Edit, Plus, Trash, Users, Video, Bell } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";

import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ContentTab from "@/components/page/courses/tabs/content-tab";
import AttendanceTab from "@/components/page/courses/tabs/attendance-tab";
import ForumTab from "@/components/page/courses/tabs/forum-tab";
import RatingTab from "@/components/page/courses/tabs/ratings-tab";
import InfoTab from "@/components/page/courses/tabs/info-tab";

// Simulación de permisos de usuario (en una aplicación real, esto vendría del backend)
const userPermissions = {
  isAdmin: true, // Cambiar a false para ver la vista de estudiante
  canEditCourse: true,
  canAddResources: true,
  canManageStudents: true,
  canViewAttendance: true,
  canManageGrades: true,
};

export default function CoursePage({ params }) {
  const unwrappedParams = use(params);
  const courseId = Number.parseInt(unwrappedParams.id);
  const course = courses.find((c) => c.id === courseId) || courses[0];

  return (
    <>
      <div className="w-full p-6">
        <div className="flex items-center mb-6">
          <Button asChild variant="ghost" size="sm" className="mr-2">
            <Link href="/courses">
              <ArrowLeft className="h-4 w-4 mr-1" />
            </Link>
          </Button>
          <Separator orientation="vertical" className="h-6 mx-2" />
          <div className="flex-1">
            <h1 className="text-xl font-bold">{course.title}</h1>
            <p className="text-sm text-muted-foreground">{course.instructor}</p>
          </div>
          {userPermissions.canEditCourse && (
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Edit className="h-4 w-4 mr-2" />
                Editar Curso
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Acciones
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {userPermissions.canManageStudents && (
                    <DropdownMenuItem>
                      <Users className="h-4 w-4 mr-2" />
                      Gestionar Estudiantes
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem>
                    <Bell className="h-4 w-4 mr-2" />
                    Enviar Notificación
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive">
                    <Trash className="h-4 w-4 mr-2" />
                    Archivar Curso
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </div>

        <Card className="mb-6 pt-0">
          <CardContent className="p-0">
            <div
              className="w-full h-32 bg-cover bg-center bg-blue-500 rounded-t-xl"
              // style={{
              //   background:
              //     course.color || "linear-gradient(to right, #3b82f6, #2563eb)",
              //   backgroundImage: course.image
              //     ? `url(${course.image})`
              //     : undefined,
              // }}
            />
            <div className="p-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold">{course.title}</h2>
                  <p className="text-sm text-muted-foreground">
                    {course.category} • {course.code}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button size="sm" variant="outline" asChild>
                    <Link href="#" className="flex items-center">
                      <Video className="h-4 w-4 mr-2" />
                      Unirse a Clase Virtual
                    </Link>
                  </Button>
                </div>
              </div>
              <Separator className="my-4" />
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Profesor</p>
                  <p className="font-medium">{course.instructor}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Periodo</p>
                  <p className="font-medium">{course.period}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Horario</p>
                  <p className="font-medium">{course.schedule}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Progreso</p>
                  <div className="flex items-center gap-2">
                    <Progress value={course.progress} className="h-2 flex-1" />
                    <span className="font-medium">{course.progress}%</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="content" className="mb-6">
          <TabsList className="mb-4">
            <TabsTrigger value="content">Contenido</TabsTrigger>
            {userPermissions.canViewAttendance && (
              <TabsTrigger value="attendance">Asistencia</TabsTrigger>
            )}
            <TabsTrigger value="rating">Calificaciones</TabsTrigger>
            <TabsTrigger value="forum">Foro</TabsTrigger>
            <TabsTrigger value="info">Información</TabsTrigger>
          </TabsList>

          <TabsContent value="content" className="space-y-6">
            <ContentTab />
          </TabsContent>

          <TabsContent value="attendance">
            <AttendanceTab />
          </TabsContent>

          <TabsContent value="rating">
            <RatingTab />
          </TabsContent>

          <TabsContent value="forum">
            <ForumTab />
          </TabsContent>

          <TabsContent value="info">
            <InfoTab course={course} />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}

const courses = [
  {
    id: 1,
    title: "Introducción a la Informática",
    code: "INF101",
    instructor: "Dr. Martínez",
    instructorTitle: "Profesor Titular",
    instructorBio:
      "Doctor en Ciencias de la Computación con más de 15 años de experiencia en enseñanza universitaria y desarrollo de software.",
    category: "Informática",
    lastAccessed: "Ayer",
    progress: 65,
    status: "in-progress",
    period: "2025-1",
    schedule: "Lunes y Miércoles, 10:00 - 12:00",
    classroom: "Aula 305",
    credits: 4,
    prerequisites: "Ninguno",
    description:
      "Aprende los fundamentos de la informática, incluyendo algoritmos, estructuras de datos y conceptos de programación. Este curso está diseñado para principiantes sin experiencia previa.",
    color: "linear-gradient(to right, #3b82f6, #2563eb)",
  },
  {
    id: 2,
    title: "Matemáticas Avanzadas",
    code: "MAT201",
    instructor: "Prof. Rodríguez",
    category: "Matemáticas",
    lastAccessed: "Hace 2 días",
    progress: 42,
    status: "in-progress",
    period: "2025-1",
    schedule: "Martes y Jueves, 14:00 - 16:00",
    classroom: "Aula 210",
    credits: 5,
  },
  {
    id: 3,
    title: "Fundamentos de Marketing Digital",
    code: "MKT101",
    instructor: "Ana López",
    category: "Negocios",
    lastAccessed: "Hace 1 semana",
    progress: 78,
    status: "in-progress",
    period: "2025-1",
    schedule: "Viernes, 09:00 - 13:00",
    classroom: "Aula 115",
    credits: 3,
  },
];
