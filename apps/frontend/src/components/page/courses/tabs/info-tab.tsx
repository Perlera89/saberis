import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, MessageSquare } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { getInitials } from "@/utils/initials";

const userPermissions = {
  isAdmin: true, // Cambiar a false para ver la vista de estudiante
  canEditCourse: true,
  canAddResources: true,
  canManageStudents: true,
  canViewAttendance: true,
  canManageGrades: true,
};

export default function InfoTab({ course }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Información del Curso</CardTitle>
              {userPermissions.canEditCourse && (
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4 mr-2" />
                  Editar Información
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Descripción</h3>
              <p className="text-sm text-muted-foreground">
                {course.description ||
                  "Este curso completo cubre todos los fundamentos que necesitas saber. Perfecto para principiantes y para aquellos que desean refrescar sus conocimientos."}
              </p>
            </div>

            <div>
              <h3 className="font-medium mb-2">Objetivos de Aprendizaje</h3>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-5">
                <li>Comprender los conceptos fundamentales de la materia</li>
                <li>
                  Aplicar técnicas y metodologías en situaciones prácticas
                </li>
                <li>Desarrollar habilidades de resolución de problemas</li>
                <li>Analizar casos de estudio y ejemplos del mundo real</li>
                <li>Crear proyectos propios aplicando lo aprendido</li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium mb-2">Metodología</h3>
              <p className="text-sm text-muted-foreground">
                El curso combina clases teóricas con ejercicios prácticos y
                proyectos. Se utilizará un enfoque de aprendizaje activo con
                discusiones en clase, trabajos en grupo y presentaciones de los
                estudiantes.
              </p>
            </div>

            <div>
              <h3 className="font-medium mb-2">Bibliografía</h3>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-5">
                <li>Introducción a la Programación - Juan Pérez (2022)</li>
                <li>Algoritmos y Estructuras de Datos - María Gómez (2021)</li>
                <li>Programación Avanzada - Carlos Rodríguez (2023)</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Detalles del Curso</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Código del Curso</p>
                  <p className="font-medium">{course.code}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Periodo Académico</p>
                  <p className="font-medium">{course.period}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Horario</p>
                  <p className="font-medium">{course.schedule}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Aula</p>
                  <p className="font-medium">{course.classroom}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Créditos</p>
                  <p className="font-medium">{course.credits}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Requisitos Previos</p>
                  <p className="font-medium">
                    {course.prerequisites || "Ninguno"}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Profesor</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3 mb-3">
              <Avatar className="h-12 w-12">
                <AvatarImage
                  src="/placeholder.svg?height=48&width=48"
                  alt={course.instructor}
                />
                <AvatarFallback>
                  {getInitials(course.instructor)}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{course.instructor}</p>
                <p className="text-xs text-muted-foreground">
                  {course.instructorTitle}
                </p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              {course.instructorBio ||
                "Profesor con amplia experiencia en el área, especializado en enseñanza práctica y aplicada."}
            </p>
            <Button variant="outline" size="sm" className="w-full" asChild>
              <Link href="#">
                <MessageSquare className="h-4 w-4 mr-2" />
                Contactar Profesor
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
