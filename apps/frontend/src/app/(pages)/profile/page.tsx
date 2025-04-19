"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Bell,
  Camera,
  Edit,
  Key,
  Lock,
  LogOut,
  Mail,
  Save,
  User,
  BookOpen,
  Calendar,
  Users,
  FileText,
} from "lucide-react";
import { Eye, ExternalLink } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { H2 } from "@/components/display/typography";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      <div className="w-full px-6">
        <H2>Mi Perfil</H2>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-6">
          {/* Sidebar con información básica */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center">
                  <div className="relative mb-4">
                    <Avatar className="h-24 w-24">
                      <AvatarImage
                        src="/placeholder.svg?height=96&width=96"
                        alt="Dr. Martínez"
                      />
                      <AvatarFallback className="text-lg">DM</AvatarFallback>
                    </Avatar>
                    <Button
                      size="icon"
                      variant="secondary"
                      className="absolute bottom-0 right-0 h-8 w-8 rounded-full"
                      title="Cambiar foto de perfil"
                    >
                      <Camera className="h-4 w-4" />
                    </Button>
                  </div>
                  <h2 className="text-xl font-bold">Dr. Martínez</h2>
                  <p className="text-sm text-muted-foreground mb-4">
                    Profesor Titular
                  </p>

                  <div className="w-full space-y-4 mt-2">
                    <div className="flex items-center gap-3">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">
                        dr.martinez@universidad.edu
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">ID: PROF-2025-0018</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Bell className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">
                        5 notificaciones pendientes
                      </span>
                    </div>
                  </div>

                  <Separator className="my-4" />

                  <div className="w-full">
                    <Button
                      variant="outline"
                      className="w-full justify-start text-destructive"
                      asChild
                    >
                      <Link href="#">
                        <LogOut className="mr-2 h-4 w-4" />
                        Cerrar Sesión
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contenido principal */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="personal">
              <TabsList className="mb-6">
                <TabsTrigger value="personal">Información Personal</TabsTrigger>
                <TabsTrigger value="academic">
                  Información Académica
                </TabsTrigger>
                <TabsTrigger value="courses">Mis Cursos</TabsTrigger>
                <TabsTrigger value="notifications">Notificaciones</TabsTrigger>
                <TabsTrigger value="security">Seguridad</TabsTrigger>
              </TabsList>

              {/* Pestaña de Información Personal */}
              <TabsContent value="personal">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Información Personal</CardTitle>
                      <CardDescription>
                        Actualiza tu información personal y de contacto
                      </CardDescription>
                    </div>
                    <Button
                      variant={isEditing ? "default" : "outline"}
                      onClick={() => setIsEditing(!isEditing)}
                      size="sm"
                    >
                      {isEditing ? (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          Guardar
                        </>
                      ) : (
                        <>
                          <Edit className="mr-2 h-4 w-4" />
                          Editar
                        </>
                      )}
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="text-sm font-medium mb-3">
                        Información Básica
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="first-name">Nombre</Label>
                          {isEditing ? (
                            <Input id="first-name" defaultValue="Carlos" />
                          ) : (
                            <p className="text-sm">Carlos</p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="last-name">Apellido</Label>
                          {isEditing ? (
                            <Input id="last-name" defaultValue="Martínez" />
                          ) : (
                            <p className="text-sm">Martínez</p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="title">Título</Label>
                          {isEditing ? (
                            <Input
                              id="title"
                              defaultValue="Doctor en Ciencias de la Computación"
                            />
                          ) : (
                            <p className="text-sm">
                              Doctor en Ciencias de la Computación
                            </p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="department">Departamento</Label>
                          {isEditing ? (
                            <Input
                              id="department"
                              defaultValue="Facultad de Informática"
                            />
                          ) : (
                            <p className="text-sm">Facultad de Informática</p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Correo Electrónico</Label>
                          {isEditing ? (
                            <Input
                              id="email"
                              defaultValue="dr.martinez@universidad.edu"
                            />
                          ) : (
                            <p className="text-sm">
                              dr.martinez@universidad.edu
                            </p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Teléfono</Label>
                          {isEditing ? (
                            <Input id="phone" defaultValue="+34 612 345 678" />
                          ) : (
                            <p className="text-sm">7012-1020</p>
                          )}
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="text-lg font-medium mb-3">
                        Información de Contacto
                      </h3>
                      <div className="space-y-2 mb-4">
                        <Label htmlFor="office">Oficina</Label>
                        {isEditing ? (
                          <Input
                            id="office"
                            defaultValue="Edificio A, Despacho 305"
                          />
                        ) : (
                          <p className="text-sm">Oficina 305</p>
                        )}
                      </div>

                      <div className="space-y-2 mb-4">
                        <Label htmlFor="office-hours">
                          Horario de Atención
                        </Label>
                        {isEditing ? (
                          <Input
                            id="office-hours"
                            defaultValue="Lunes y Miércoles de 10:00 a 12:00"
                          />
                        ) : (
                          <p className="text-sm text-foreground">
                            Lunes y Miércoles de 10:00 a 12:00
                          </p>
                        )}
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="text-lg font-medium mb-3">
                        Biografía Profesional
                      </h3>
                      <div className="space-y-2">
                        {isEditing ? (
                          <Textarea
                            id="bio"
                            placeholder="Cuéntanos sobre tu experiencia profesional..."
                            className="min-h-[120px]"
                            defaultValue="Doctor en Ciencias de la Computación con más de 15 años de experiencia en enseñanza universitaria y desarrollo de software. Especializado en algoritmos, inteligencia artificial y aprendizaje automático. He publicado más de 30 artículos en revistas científicas de prestigio y participado en numerosos proyectos de investigación internacionales."
                          />
                        ) : (
                          <p className="text-sm">
                            Doctor en Ciencias de la Computación con más de 15
                            años de experiencia en enseñanza universitaria y
                            desarrollo de software. Especializado en algoritmos,
                            inteligencia artificial y aprendizaje automático. He
                            publicado más de 30 artículos en revistas
                            científicas de prestigio y participado en numerosos
                            proyectos de investigación internacionales.
                          </p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between border-t px-6 py-4">
                    <p className="text-sm text-muted-foreground">
                      Última actualización:{" "}
                      <span className="font-medium">10 de febrero, 2025</span>
                    </p>
                    {isEditing && (
                      <Button
                        variant="outline"
                        onClick={() => setIsEditing(false)}
                      >
                        Cancelar
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              </TabsContent>

              {/* Pestaña de Información Académica */}
              <TabsContent value="academic">
                <Card>
                  <CardHeader>
                    <CardTitle>Información Académica</CardTitle>
                    <CardDescription>
                      Formación académica y experiencia profesional
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium">
                          Formación Académica
                        </h3>
                        {isEditing && (
                          <Button variant="outline" size="sm">
                            <Plus className="h-4 w-4 mr-2" />
                            Añadir Formación
                          </Button>
                        )}
                      </div>
                      <div className="space-y-4">
                        {education.map((edu, index) => (
                          <Card key={index}>
                            <CardContent className="p-4">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h4 className="font-medium">{edu.degree}</h4>
                                  <p className="text-sm">{edu.institution}</p>
                                  <p className="text-sm text-muted-foreground">
                                    {edu.period}
                                  </p>
                                </div>
                                {isEditing && (
                                  <Button variant="ghost" size="sm">
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                )}
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium">
                          Experiencia Profesional
                        </h3>
                        {isEditing && (
                          <Button variant="outline" size="sm">
                            <Plus className="h-4 w-4 mr-2" />
                            Añadir Experiencia
                          </Button>
                        )}
                      </div>
                      <div className="space-y-4">
                        {experience.map((exp, index) => (
                          <Card key={index}>
                            <CardContent className="p-4">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h4 className="font-medium">
                                    {exp.position}
                                  </h4>
                                  <p className="text-sm">{exp.institution}</p>
                                  <p className="text-sm text-muted-foreground">
                                    {exp.period}
                                  </p>
                                  <p className="text-sm mt-2">
                                    {exp.description}
                                  </p>
                                </div>
                                {isEditing && (
                                  <Button variant="ghost" size="sm">
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                )}
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium">
                          Publicaciones Destacadas
                        </h3>
                        {isEditing && (
                          <Button variant="outline" size="sm">
                            <Plus className="h-4 w-4 mr-2" />
                            Añadir Publicación
                          </Button>
                        )}
                      </div>
                      <div className="space-y-4">
                        {publications.map((pub, index) => (
                          <Card key={index}>
                            <CardContent className="p-4">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h4 className="font-medium">{pub.title}</h4>
                                  <p className="text-sm">{pub.journal}</p>
                                  <p className="text-sm text-muted-foreground">
                                    {pub.year}
                                  </p>
                                  <div className="flex gap-2 mt-2">
                                    <Button variant="outline" size="sm">
                                      <Eye className="h-3.5 w-3.5 mr-1" />
                                      Ver
                                    </Button>
                                    <Button variant="outline" size="sm">
                                      <ExternalLink className="h-3.5 w-3.5 mr-1" />
                                      DOI
                                    </Button>
                                  </div>
                                </div>
                                {isEditing && (
                                  <Button variant="ghost" size="sm">
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                )}
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Pestaña de Mis Cursos */}
              <TabsContent value="courses">
                <Card>
                  <CardHeader>
                    <CardTitle>Mis Cursos</CardTitle>
                    <CardDescription>
                      Cursos que impartes actualmente
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card>
                        <CardContent className="pt-6 text-center">
                          <p className="text-3xl font-bold text-primary">3</p>
                          <p className="text-sm text-muted-foreground">
                            Cursos Activos
                          </p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="pt-6 text-center">
                          <p className="text-3xl font-bold text-primary">127</p>
                          <p className="text-sm text-muted-foreground">
                            Estudiantes
                          </p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="pt-6 text-center">
                          <p className="text-3xl font-bold text-primary">4.8</p>
                          <p className="text-sm text-muted-foreground">
                            Valoración Media
                          </p>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium">Cursos Actuales</h3>
                        <Button variant="outline" size="sm">
                          <Plus className="h-4 w-4 mr-2" />
                          Crear Curso
                        </Button>
                      </div>
                      <div className="space-y-4">
                        {teachingCourses.map((course, index) => (
                          <Card key={index}>
                            <CardContent className="p-4">
                              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div>
                                  <h4 className="font-medium">
                                    {course.title}
                                  </h4>
                                  <p className="text-sm text-muted-foreground">
                                    {course.code} • {course.period}
                                  </p>
                                  <div className="flex items-center gap-2 mt-1">
                                    <Users className="h-3.5 w-3.5 text-muted-foreground" />
                                    <span className="text-xs text-muted-foreground">
                                      {course.students} estudiantes
                                    </span>
                                    <Calendar className="h-3.5 w-3.5 text-muted-foreground ml-2" />
                                    <span className="text-xs text-muted-foreground">
                                      {course.schedule}
                                    </span>
                                  </div>
                                </div>
                                <div className="flex gap-2">
                                  <Button variant="outline" size="sm" asChild>
                                    <Link href={`/courses/${course.id}`}>
                                      <BookOpen className="h-3.5 w-3.5 mr-1" />
                                      Ver Curso
                                    </Link>
                                  </Button>
                                  <Button variant="outline" size="sm">
                                    <FileText className="h-3.5 w-3.5 mr-1" />
                                    Calificaciones
                                  </Button>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Cursos Anteriores</h3>
                      <div className="border rounded-lg overflow-hidden">
                        <table className="w-full">
                          <thead>
                            <tr className="bg-muted">
                              <th className="text-left p-3 font-medium text-sm">
                                Curso
                              </th>
                              <th className="text-left p-3 font-medium text-sm">
                                Código
                              </th>
                              <th className="text-left p-3 font-medium text-sm">
                                Periodo
                              </th>
                              <th className="text-left p-3 font-medium text-sm">
                                Estudiantes
                              </th>
                              <th className="text-left p-3 font-medium text-sm">
                                Acciones
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-border">
                            {pastCourses.map((course, index) => (
                              <tr
                                key={index}
                                className="hover:bg-muted/50 transition-colors"
                              >
                                <td className="p-3 text-sm font-medium">
                                  {course.title}
                                </td>
                                <td className="p-3 text-sm">{course.code}</td>
                                <td className="p-3 text-sm">{course.period}</td>
                                <td className="p-3 text-sm">
                                  {course.students}
                                </td>
                                <td className="p-3">
                                  <Button variant="ghost" size="sm">
                                    <Eye className="h-3.5 w-3.5 mr-1" />
                                    Ver
                                  </Button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Pestaña de Notificaciones */}
              <TabsContent value="notifications">
                <Card>
                  <CardHeader>
                    <CardTitle>Preferencias de Notificaciones</CardTitle>
                    <CardDescription>
                      Configura cómo y cuándo quieres recibir notificaciones
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">
                        Notificaciones por Correo Electrónico
                      </h3>
                      <div className="space-y-3">
                        {teacherEmailNotifications.map((notification) => (
                          <div
                            key={notification.id}
                            className="flex items-center justify-between"
                          >
                            <div>
                              <p className="font-medium">
                                {notification.title}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {notification.description}
                              </p>
                            </div>
                            <Switch defaultChecked={notification.enabled} />
                          </div>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">
                        Notificaciones en la Plataforma
                      </h3>
                      <div className="space-y-3">
                        {teacherPlatformNotifications.map((notification) => (
                          <div
                            key={notification.id}
                            className="flex items-center justify-between"
                          >
                            <div>
                              <p className="font-medium">
                                {notification.title}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {notification.description}
                              </p>
                            </div>
                            <Switch defaultChecked={notification.enabled} />
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t px-6 py-4">
                    <Button>Guardar Preferencias</Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              {/* Pestaña de Seguridad */}
              <TabsContent value="security">
                <Card>
                  <CardHeader>
                    <CardTitle>Seguridad de la Cuenta</CardTitle>
                    <CardDescription>
                      Gestiona la seguridad y el acceso a tu cuenta
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">
                        Cambiar Contraseña
                      </h3>
                      <div className="space-y-3">
                        <div className="space-y-2">
                          <Label htmlFor="current-password">
                            Contraseña Actual
                          </Label>
                          <Input id="current-password" type="password" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="new-password">Nueva Contraseña</Label>
                          <Input id="new-password" type="password" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="confirm-password">
                            Confirmar Nueva Contraseña
                          </Label>
                          <Input id="confirm-password" type="password" />
                        </div>
                        <Button>Actualizar Contraseña</Button>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">
                        Autenticación de Dos Factores
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">
                              Autenticación de Dos Factores
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Añade una capa adicional de seguridad a tu cuenta
                            </p>
                          </div>
                          <Switch defaultChecked={true} />
                        </div>
                        <Button variant="outline" className="w-full">
                          <Key className="mr-2 h-4 w-4" />
                          Configurar Autenticación de Dos Factores
                        </Button>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Sesiones Activas</h3>
                      <div className="space-y-3">
                        {activeSessions.map((session) => (
                          <div
                            key={session.id}
                            className="flex items-start justify-between border-b pb-3 last:border-0"
                          >
                            <div>
                              <div className="flex items-center gap-2">
                                <p className="font-medium">{session.device}</p>
                                {session.current && (
                                  <span className="bg-primary/20 text-primary text-xs px-2 py-0.5 rounded-full">
                                    Actual
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {session.location} • {session.ip}
                              </p>
                              <p className="text-xs text-muted-foreground mt-1">
                                Último acceso: {session.lastAccess}
                              </p>
                            </div>
                            {!session.current && (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-destructive"
                              >
                                <Lock className="mr-2 h-4 w-4" />
                                Cerrar Sesión
                              </Button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t px-6 py-4 flex justify-between">
                    <Button variant="outline" className="text-destructive">
                      <LogOut className="mr-2 h-4 w-4" />
                      Cerrar Todas las Sesiones
                    </Button>
                    <Button variant="destructive">Desactivar Cuenta</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
}

// Datos de ejemplo para áreas de especialización
const specializations = [
  "Inteligencia Artificial",
  "Aprendizaje Automático",
  "Algoritmos",
  "Ciencia de Datos",
  "Computación Paralela",
  "Desarrollo de Software",
  "Redes Neuronales",
];

// Datos de ejemplo para formación académica
const education = [
  {
    degree: "Doctorado en Ciencias de la Computación",
    institution: "Universidad Politécnica de Madrid",
    period: "2005 - 2009",
  },
  {
    degree: "Máster en Inteligencia Artificial",
    institution: "Universidad Complutense de Madrid",
    period: "2003 - 2005",
  },
  {
    degree: "Ingeniería Informática",
    institution: "Universidad de Barcelona",
    period: "1999 - 2003",
  },
];

// Datos de ejemplo para experiencia profesional
const experience = [
  {
    position: "Profesor Titular",
    institution: "Universidad Autónoma de Madrid",
    period: "2015 - Presente",
    description:
      "Docencia en grado y posgrado en asignaturas de Algoritmos, Inteligencia Artificial y Aprendizaje Automático. Dirección de proyectos de investigación y tesis doctorales.",
  },
  {
    position: "Profesor Asociado",
    institution: "Universidad Complutense de Madrid",
    period: "2010 - 2015",
    description:
      "Docencia en asignaturas de programación y estructuras de datos. Participación en proyectos de investigación.",
  },
  {
    position: "Investigador",
    institution: "Centro Nacional de Investigaciones Tecnológicas",
    period: "2009 - 2010",
    description:
      "Investigación en algoritmos de aprendizaje automático y procesamiento de lenguaje natural.",
  },
];

// Datos de ejemplo para publicaciones
const publications = [
  {
    title:
      "Optimización de algoritmos de aprendizaje profundo para procesamiento de imágenes médicas",
    journal: "Journal of Artificial Intelligence in Medicine",
    year: "2023",
  },
  {
    title:
      "Un enfoque híbrido para la detección de anomalías en series temporales",
    journal: "IEEE Transactions on Pattern Analysis and Machine Intelligence",
    year: "2021",
  },
  {
    title:
      "Análisis comparativo de técnicas de procesamiento de lenguaje natural para clasificación de textos",
    journal: "ACM Computing Surveys",
    year: "2019",
  },
];

// Datos de ejemplo para cursos que imparte
const teachingCourses = [
  {
    id: 1,
    title: "Introducción a la Informática",
    code: "INF101",
    period: "2025-1",
    students: 45,
    schedule: "Lunes y Miércoles, 10:00 - 12:00",
  },
  {
    id: 2,
    title: "Algoritmos Avanzados",
    code: "INF305",
    period: "2025-1",
    students: 32,
    schedule: "Martes y Jueves, 16:00 - 18:00",
  },
  {
    id: 3,
    title: "Inteligencia Artificial",
    code: "INF401",
    period: "2025-1",
    students: 50,
    schedule: "Viernes, 09:00 - 13:00",
  },
];

// Datos de ejemplo para cursos anteriores
const pastCourses = [
  {
    title: "Programación Orientada a Objetos",
    code: "INF202",
    period: "2024-2",
    students: 38,
  },
  {
    title: "Estructuras de Datos",
    code: "INF203",
    period: "2024-2",
    students: 42,
  },
  {
    title: "Aprendizaje Automático",
    code: "INF402",
    period: "2024-1",
    students: 35,
  },
  {
    title: "Introducción a la Informática",
    code: "INF101",
    period: "2024-1",
    students: 48,
  },
];

// Datos de ejemplo para notificaciones por correo (profesor)
const teacherEmailNotifications = [
  {
    id: 1,
    title: "Entregas de tareas",
    description:
      "Recibe notificaciones cuando los estudiantes entreguen tareas",
    enabled: true,
  },
  {
    id: 2,
    title: "Preguntas en foros",
    description:
      "Recibe notificaciones cuando los estudiantes publiquen en los foros",
    enabled: true,
  },
  {
    id: 3,
    title: "Solicitudes de tutoría",
    description:
      "Recibe notificaciones cuando los estudiantes soliciten tutorías",
    enabled: true,
  },
  {
    id: 4,
    title: "Actualizaciones del sistema",
    description: "Recibe notificaciones sobre actualizaciones de la plataforma",
    enabled: false,
  },
];

// Datos de ejemplo para notificaciones en la plataforma (profesor)
const teacherPlatformNotifications = [
  {
    id: 1,
    title: "Mensajes de estudiantes",
    description:
      "Muestra notificaciones en la plataforma para mensajes de estudiantes",
    enabled: true,
  },
  {
    id: 2,
    title: "Recordatorios de clases",
    description: "Muestra recordatorios de próximas clases programadas",
    enabled: true,
  },
  {
    id: 3,
    title: "Fechas límite de calificación",
    description: "Muestra recordatorios para calificar tareas pendientes",
    enabled: true,
  },
];

// Datos de ejemplo para sesiones activas
const activeSessions = [
  {
    id: 1,
    device: "Chrome en Windows 10",
    location: "Madrid, España",
    ip: "192.168.1.1",
    lastAccess: "Ahora",
    current: true,
  },
  {
    id: 2,
    device: "Safari en MacBook",
    location: "Madrid, España",
    ip: "192.168.1.2",
    lastAccess: "Hace 2 horas",
    current: false,
  },
  {
    id: 3,
    device: "Firefox en Ubuntu",
    location: "Barcelona, España",
    ip: "192.168.1.3",
    lastAccess: "Ayer, 18:30",
    current: false,
  },
];

function Award(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="8" r="6" />
      <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
    </svg>
  );
}

function Plus(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}
