import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Plus } from "lucide-react";
import Link from "next/link";

const userPermissions = {
  isAdmin: true, // Cambiar a false para ver la vista de estudiante
  canEditCourse: true,
  canAddResources: true,
  canManageStudents: true,
  canViewAttendance: true,
  canManageGrades: true,
};

export default function GradesTab() {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Calificaciones</CardTitle>
            <CardDescription>
              Resumen de evaluaciones en este curso
            </CardDescription>
          </div>
          {userPermissions.canManageGrades && (
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Agregar Calificación
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div>
              <p className="font-medium">Calificación General</p>
              <p className="text-sm text-muted-foreground">
                Basada en todas las evaluaciones completadas
              </p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold">85%</p>
              <p className="text-sm text-muted-foreground">B+</p>
            </div>
          </div>

          <div className="border rounded-lg overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-muted">
                  <th className="text-left p-3 font-medium text-sm">
                    Evaluación
                  </th>
                  <th className="text-left p-3 font-medium text-sm">Fecha</th>
                  <th className="text-left p-3 font-medium text-sm">
                    Calificación
                  </th>
                  <th className="text-left p-3 font-medium text-sm">
                    Porcentaje
                  </th>
                  <th className="text-left p-3 font-medium text-sm">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {grades.map((grade) => (
                  <tr key={grade.id}>
                    <td className="p-3 text-sm font-medium">{grade.title}</td>
                    <td className="p-3 text-sm">{grade.date}</td>
                    <td className="p-3 text-sm font-medium">
                      {grade.score}/{grade.total}
                    </td>
                    <td className="p-3 text-sm">{grade.percentage}%</td>
                    <td className="p-3">
                      <Button variant="ghost" size="sm" asChild>
                        <Link href="#">Ver Detalles</Link>
                      </Button>
                      {userPermissions.canManageGrades && (
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4 mr-2" />
                          Editar
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

const grades = [
  {
    id: 1,
    title: "Cuestionario de Conceptos Básicos",
    date: "11 Feb, 2025",
    score: 9,
    total: 10,
    percentage: 90,
  },
  {
    id: 2,
    title: "Tarea 1: Diseño de Algoritmos",
    date: "18 Feb, 2025",
    score: 18,
    total: 20,
    percentage: 90,
  },
  {
    id: 3,
    title: "Participación en Clase (Semanas 1-2)",
    date: "19 Feb, 2025",
    score: 8,
    total: 10,
    percentage: 80,
  },
];
