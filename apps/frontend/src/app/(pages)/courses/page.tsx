"use client";

import { useState } from "react";
import Link from "next/link";
import { Archive, Filter, Plus, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { CourseCard } from "@/components/page/courses/course-card";
import { H2 } from "@/components/display/typography";

// Simulación de permisos de usuario (en una aplicación real, esto vendría del backend)
const userPermissions = {
  isAdmin: true, // Cambiar a false para ver la vista de estudiante
  canCreateCourse: true,
  canEditCourse: true,
  canArchiveCourse: true,
};

export default function CoursesPage() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [showArchived, setShowArchived] = useState(false);

  return (
    <>
      <div className="w-full px-6">
        <div className="flex items-center justify-between mb-6">
          <H2>Mis Cursos</H2>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar cursos..."
                className="pl-8 w-64"
              />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filtrar
            </Button>
            {userPermissions.canCreateCourse && (
              <Dialog
                open={isCreateDialogOpen}
                onOpenChange={setIsCreateDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Crear Curso
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle>Crear Nuevo Curso</DialogTitle>
                    <DialogDescription>
                      Complete la información para crear un nuevo curso en la
                      plataforma.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="title">Título del Curso</Label>
                        <Input
                          id="title"
                          placeholder="Ej: Introducción a la Informática"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="code">Código del Curso</Label>
                        <Input id="code" placeholder="Ej: INF101" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">Descripción</Label>
                      <Textarea
                        id="description"
                        placeholder="Breve descripción del curso"
                        className="min-h-[100px]"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="category">Categoría</Label>
                        <Select>
                          <SelectTrigger id="category">
                            <SelectValue placeholder="Seleccionar categoría" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="informatica">
                                Informática
                              </SelectItem>
                              <SelectItem value="matematicas">
                                Matemáticas
                              </SelectItem>
                              <SelectItem value="ciencias">Ciencias</SelectItem>
                              <SelectItem value="humanidades">
                                Humanidades
                              </SelectItem>
                              <SelectItem value="negocios">Negocios</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="period">Periodo Académico</Label>
                        <Select>
                          <SelectTrigger id="period">
                            <SelectValue placeholder="Seleccionar periodo" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="2025-1">2025-1</SelectItem>
                              <SelectItem value="2025-2">2025-2</SelectItem>
                              <SelectItem value="2026-1">2026-1</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="instructor">Profesor</Label>
                        <Select>
                          <SelectTrigger id="instructor">
                            <SelectValue placeholder="Seleccionar profesor" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="martinez">
                                Dr. Martínez
                              </SelectItem>
                              <SelectItem value="rodriguez">
                                Prof. Rodríguez
                              </SelectItem>
                              <SelectItem value="lopez">Ana López</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="credits">Créditos</Label>
                        <Input
                          id="credits"
                          type="number"
                          min="1"
                          max="10"
                          placeholder="Ej: 4"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="schedule">Horario</Label>
                        <Input
                          id="schedule"
                          placeholder="Ej: Lunes y Miércoles, 10:00 - 12:00"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="classroom">Aula</Label>
                        <Input id="classroom" placeholder="Ej: Aula 305" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="prerequisites">Prerrequisitos</Label>
                      <Input
                        id="prerequisites"
                        placeholder="Ej: Ninguno, o códigos de cursos separados por comas"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setIsCreateDialogOpen(false)}
                    >
                      Cancelar
                    </Button>
                    <Button onClick={() => setIsCreateDialogOpen(false)}>
                      Crear Curso
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </div>

        <Tabs defaultValue="in-progress" className="mb-8">
          <TabsList>
            <TabsTrigger value="in-progress">En Progreso</TabsTrigger>
            <TabsTrigger value="completed">Completados</TabsTrigger>
            <TabsTrigger value="all">Todos los Cursos</TabsTrigger>
          </TabsList>
          <TabsContent value="in-progress">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
              {courses
                .filter(
                  (course) =>
                    course.status === "in-progress" &&
                    (showArchived ? true : !course.archived)
                )
                .map((course) => (
                  <CourseCard
                    key={course.id}
                    course={course}
                    userPermissions={userPermissions}
                  />
                ))}
            </div>
          </TabsContent>
          <TabsContent value="completed">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
              {courses
                .filter(
                  (course) =>
                    course.status === "completed" &&
                    (showArchived ? true : !course.archived)
                )
                .map((course) => (
                  <CourseCard
                    key={course.id}
                    course={course}
                    userPermissions={userPermissions}
                  />
                ))}
            </div>
          </TabsContent>
          <TabsContent value="all">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
              {courses
                .filter((course) => (showArchived ? true : !course.archived))
                .map((course) => (
                  <CourseCard
                    key={course.id}
                    course={course}
                    userPermissions={userPermissions}
                  />
                ))}
            </div>
          </TabsContent>
        </Tabs>

        {userPermissions.canArchiveCourse && (
          <>
            {!showArchived ? (
              <div className="flex justify-center mt-8">
                <Button variant="outline" onClick={() => setShowArchived(true)}>
                  <Archive className="h-4 w-4 mr-2" />
                  Mostrar Cursos Archivados
                </Button>
              </div>
            ) : (
              <>
                <div className="mt-8 mb-4">
                  <h2 className="text-xl font-semibold">Cursos Archivados</h2>
                  <p className="text-muted-foreground">
                    Cursos que han sido archivados y no están actualmente
                    disponibles para los estudiantes
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                  {archivedCourses.map((course) => (
                    <CourseCard
                      key={course.id}
                      course={course}
                      userPermissions={userPermissions}
                      isArchived={true}
                    />
                  ))}
                </div>

                <div className="flex justify-center mt-4">
                  <Button
                    variant="outline"
                    onClick={() => setShowArchived(false)}
                  >
                    Ocultar Cursos Archivados
                  </Button>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
}

const courses = [
  {
    id: 1,
    title: "Introducción a la Informática",
    instructor: "Dr. Martínez",
    category: "Informática",
    lastAccessed: "Ayer",
    progress: 65,
    status: "in-progress",
    archived: false,
    color: "linear-gradient(to right, #3b82f6, #2563eb)",
  },
  {
    id: 2,
    title: "Matemáticas Avanzadas",
    instructor: "Prof. Rodríguez",
    category: "Matemáticas",
    lastAccessed: "Hace 2 días",
    progress: 42,
    status: "in-progress",
    archived: false,
    color: "linear-gradient(to right, #8b5cf6, #6d28d9)",
  },
  {
    id: 3,
    title: "Fundamentos de Marketing Digital",
    instructor: "Ana López",
    category: "Negocios",
    lastAccessed: "Hace 1 semana",
    progress: 78,
    status: "in-progress",
    archived: false,
    color: "linear-gradient(to right, #ec4899, #be185d)",
  },
  {
    id: 4,
    title: "Introducción a la Psicología",
    instructor: "Dr. Gómez",
    category: "Psicología",
    lastAccessed: "Hace 2 semanas",
    progress: 100,
    status: "completed",
    archived: false,
    color: "linear-gradient(to right, #10b981, #059669)",
  },
  {
    id: 5,
    title: "Fundamentos de Desarrollo Web",
    instructor: "Marco Hernández",
    category: "Informática",
    lastAccessed: "Hace 1 mes",
    progress: 100,
    status: "completed",
    archived: false,
    color: "linear-gradient(to right, #f59e0b, #d97706)",
  },
];

const archivedCourses = [
  {
    id: 6,
    title: "Estadística para Ciencias Sociales",
    instructor: "Prof. Rodríguez",
    category: "Matemáticas",
    lastAccessed: "Hace 3 meses",
    progress: 100,
    status: "completed",
    archived: true,
    archivedDate: "15 Dic, 2024",
    color: "linear-gradient(to right, #f59e0b, #d97706)",
  },
  {
    id: 7,
    title: "Introducción a la Economía",
    instructor: "Carlos Ruiz",
    category: "Negocios",
    lastAccessed: "Hace 4 meses",
    progress: 100,
    status: "completed",
    archived: true,
    archivedDate: "20 Dic, 2024",
    color: "linear-gradient(to right, #ef4444, #b91c1c)",
  },
  {
    id: 8,
    title: "Historia del Arte",
    instructor: "María González",
    category: "Humanidades",
    lastAccessed: "Hace 6 meses",
    progress: 100,
    status: "completed",
    archived: true,
    archivedDate: "10 Jun, 2024",
    color: "linear-gradient(to right, #8b5cf6, #6d28d9)",
  },
];
