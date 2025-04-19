import { Search, UserPlus } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { getInitials } from "@/utils/initials";

const userPermissions = {
  isAdmin: true, // Cambiar a false para ver la vista de estudiante
  canEditCourse: true,
  canAddResources: true,
  canManageStudents: true,
  canViewAttendance: true,
  canManageGrades: true,
};

export default function MembersTab() {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <CardTitle>Estudiantes</CardTitle>
            <CardDescription>
              Estudiantes inscritos en este curso
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar estudiantes..."
                className="pl-8 w-full sm:w-64"
              />
            </div>
            {userPermissions.canManageStudents && (
              <Button>
                <UserPlus className="h-4 w-4 mr-2" />
                Añadir Estudiante
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {courseStudents.map((student) => (
            <StudentCard key={student.id} student={student} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function StudentCard({ student }) {
  return (
    <div className="flex items-center gap-3 p-4 border rounded-lg">
      <Avatar className="h-12 w-12">
        <AvatarImage
          src={student.avatar || "/placeholder.svg?height=48&width=48"}
          alt={student.name}
        />
        <AvatarFallback>{getInitials(student.name)}</AvatarFallback>
      </Avatar>
      <div>
        <p className="font-medium">{student.name}</p>
        <p className="text-sm text-muted-foreground">{student.email}</p>
      </div>
    </div>
  );
}

// Datos de ejemplo para los estudiantes del curso
const courseStudents = [
  {
    id: 1,
    name: "Laura Méndez",
    email: "laura.mendez@universidad.edu",
    avatar: "/placeholder.svg?height=48&width=48",
  },
  {
    id: 2,
    name: "Carlos Ruiz",
    email: "carlos.ruiz@universidad.edu",
    avatar: "/placeholder.svg?height=48&width=48",
  },
  {
    id: 3,
    name: "Ana García",
    email: "ana.garcia@universidad.edu",
    avatar: "/placeholder.svg?height=48&width=48",
  },
  {
    id: 4,
    name: "Miguel Torres",
    email: "miguel.torres@universidad.edu",
    avatar: "/placeholder.svg?height=48&width=48",
  },
  {
    id: 5,
    name: "Sofía Rodríguez",
    email: "sofia.rodriguez@universidad.edu",
    avatar: "/placeholder.svg?height=48&width=48",
  },
  {
    id: 6,
    name: "Javier López",
    email: "javier.lopez@universidad.edu",
    avatar: "/placeholder.svg?height=48&width=48",
  },
  {
    id: 7,
    name: "Elena Martín",
    email: "elena.martin@universidad.edu",
    avatar: "/placeholder.svg?height=48&width=48",
  },
  {
    id: 8,
    name: "Pablo Sánchez",
    email: "pablo.sanchez@universidad.edu",
    avatar: "/placeholder.svg?height=48&width=48",
  },
  {
    id: 9,
    name: "Carmen Díaz",
    email: "carmen.diaz@universidad.edu",
    avatar: "/placeholder.svg?height=48&width=48",
  },
  {
    id: 10,
    name: "Daniel Fernández",
    email: "daniel.fernandez@universidad.edu",
    avatar: "/placeholder.svg?height=48&width=48",
  },
];
