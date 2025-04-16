import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const userPermissions = {
  isAdmin: true, // Cambiar a false para ver la vista de estudiante
  canEditCourse: true,
  canAddResources: true,
  canManageStudents: true,
  canViewAttendance: true,
  canManageGrades: true,
};

export default function AttendanceTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Registro de Asistencia</CardTitle>
        <CardDescription>Asistencia a las clases de este curso</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div>
              <p className="font-medium">Asistencia General</p>
              <p className="text-sm text-muted-foreground">
                Porcentaje de clases a las que han asistido
              </p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold">85%</p>
              <p className="text-sm text-muted-foreground">17 de 20 clases</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-medium">Historial de Asistencia</h3>
              {userPermissions.isAdmin && (
                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Registrar Asistencia
                </Button>
              )}
            </div>
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-muted">
                    <th className="text-left p-3 font-medium text-sm">Fecha</th>
                    <th className="text-left p-3 font-medium text-sm">Tema</th>
                    <th className="text-left p-3 font-medium text-sm">
                      Estado
                    </th>
                    {userPermissions.isAdmin && (
                      <th className="text-right p-3 font-medium text-sm">
                        Acciones
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {attendanceRecords.map((record) => (
                    <tr key={record.id}>
                      <td className="p-3 text-sm">{record.date}</td>
                      <td className="p-3 text-sm">{record.topic}</td>
                      <td className="p-3">
                        <Badge
                          variant="outline"
                          className={
                            record.status === "Presente"
                              ? "bg-green-500/10 text-green-500 border-green-500/20"
                              : record.status === "Ausente"
                                ? "bg-red-500/10 text-red-500 border-red-500/20"
                                : "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
                          }
                        >
                          {record.status}
                        </Badge>
                      </td>
                      {userPermissions.isAdmin && (
                        <td className="p-3 text-right">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4 mr-2" />
                            Editar
                          </Button>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

const attendanceRecords = [
  {
    id: 1,
    date: "5 Feb, 2025",
    topic: "Introducción a la Informática",
    status: "Presente",
  },
  {
    id: 2,
    date: "7 Feb, 2025",
    topic: "Historia de la Computación",
    status: "Presente",
  },
  {
    id: 3,
    date: "12 Feb, 2025",
    topic: "Introducción a los Algoritmos",
    status: "Presente",
  },
  {
    id: 4,
    date: "14 Feb, 2025",
    topic: "Diagramas de Flujo",
    status: "Ausente",
  },
  {
    id: 5,
    date: "19 Feb, 2025",
    topic: "Variables y Tipos de Datos",
    status: "Presente",
  },
  {
    id: 6,
    date: "21 Feb, 2025",
    topic: "Operaciones con Variables",
    status: "Justificado",
  },
];
