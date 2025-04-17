import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";

export function CourseCard({ course, userPermissions, isArchived = false }) {
  return (
    <Card className="overflow-hidden pt-0">
      <div
        className="h-32 relative"
        style={{
          background:
            course.color || "linear-gradient(to right, #3b82f6, #2563eb)",
        }}
      >
        <div className="absolute bottom-2 left-2 bg-background/90 text-xs font-medium px-2 py-1 rounded">
          {course.category}
        </div>
        {course.status === "completed" && (
          <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-medium px-2 py-1 rounded">
            Completado
          </div>
        )}
        {isArchived && (
          <div className="absolute top-2 right-2 bg-muted text-muted-foreground text-xs font-medium px-2 py-1 rounded">
            Archivado
          </div>
        )}
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">{course.title}</CardTitle>
        <CardDescription className="text-xs">
          {course.instructor}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>Progreso</span>
            <span className="font-medium">{course.progress}%</span>
          </div>
          <Progress value={course.progress} className="h-2" />
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <Button asChild variant="ghost" size="sm" className="w-full">
          <Link href={`/courses/${course.id}`}>
            {isArchived
              ? "Ver Curso Archivado"
              : course.status === "completed"
                ? "Revisar Curso"
                : "Continuar Curso"}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
