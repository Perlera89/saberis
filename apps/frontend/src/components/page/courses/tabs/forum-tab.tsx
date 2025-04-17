import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Users } from "lucide-react";
import Link from "next/link";
import { getInitials } from "@/utils/initials";

export default function ForumTab() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Discusiones del Curso</CardTitle>
            <Button>Nueva Discusión</Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {forumPosts.map((post) => (
                <div
                  key={post.id}
                  className="p-4 border border-border rounded-lg"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={
                            post.authorAvatar ||
                            "/placeholder.svg?height=32&width=32"
                          }
                          alt={post.author}
                        />
                        <AvatarFallback>
                          {getInitials(post.author)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm">{post.author}</p>
                        <p className="text-xs text-muted-foreground">
                          {post.date}
                        </p>
                      </div>
                    </div>
                    <Badge variant="outline">{post.category}</Badge>
                  </div>
                  <h3 className="font-medium mb-1">{post.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center">
                        <MessageSquare className="h-3 w-3 mr-1" />
                        {post.replies} respuestas
                      </span>
                      <span className="flex items-center">
                        <Users className="h-3 w-3 mr-1" />
                        {post.views} vistas
                      </span>
                    </div>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href="#">Ver Discusión</Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Categorías</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 hover:bg-muted rounded-md cursor-pointer">
                <span className="text-sm">Preguntas Generales</span>
                <Badge variant="secondary">12</Badge>
              </div>
              <div className="flex items-center justify-between p-2 hover:bg-muted rounded-md cursor-pointer">
                <span className="text-sm">Ayuda con Tareas</span>
                <Badge variant="secondary">8</Badge>
              </div>
              <div className="flex items-center justify-between p-2 hover:bg-muted rounded-md cursor-pointer">
                <span className="text-sm">Recursos Adicionales</span>
                <Badge variant="secondary">5</Badge>
              </div>
              <div className="flex items-center justify-between p-2 hover:bg-muted rounded-md cursor-pointer">
                <span className="text-sm">Anuncios</span>
                <Badge variant="secondary">3</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Participantes Activos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {activeParticipants.map((participant) => (
                <div key={participant.id} className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={
                        participant.avatar ||
                        "/placeholder.svg?height=32&width=32"
                      }
                      alt={participant.name}
                    />
                    <AvatarFallback>
                      {getInitials(participant.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{participant.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {participant.posts} publicaciones
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

const activeParticipants = [
  {
    id: 1,
    name: "Laura Méndez",
    avatar: "/placeholder.svg?height=32&width=32",
    posts: 15,
  },
  {
    id: 2,
    name: "Carlos Ruiz",
    avatar: "/placeholder.svg?height=32&width=32",
    posts: 12,
  },
  {
    id: 3,
    name: "Ana García",
    avatar: "/placeholder.svg?height=32&width=32",
    posts: 8,
  },
  {
    id: 4,
    name: "Miguel Torres",
    avatar: "/placeholder.svg?height=32&width=32",
    posts: 7,
  },
];

const forumPosts = [
  {
    id: 1,
    title: "Duda sobre el ejercicio 3 de la Tarea 1",
    author: "Laura Méndez",
    authorAvatar: "/placeholder.svg?height=32&width=32",
    date: "16 Feb, 2025",
    excerpt:
      "Estoy teniendo problemas con el ejercicio 3 de la tarea de algoritmos. ¿Alguien podría explicar cómo resolver la parte de ordenamiento?",
    category: "Ayuda con Tareas",
    replies: 5,
    views: 28,
  },
  {
    id: 2,
    title: "Recursos adicionales sobre diagramas de flujo",
    author: "Carlos Ruiz",
    authorAvatar: "/placeholder.svg?height=32&width=32",
    date: "14 Feb, 2025",
    excerpt:
      "He encontrado algunos recursos muy útiles sobre diagramas de flujo que complementan lo visto en clase. Comparto los enlaces para quien esté interesado.",
    category: "Recursos Adicionales",
    replies: 3,
    views: 42,
  },
  {
    id: 3,
    title: "Recordatorio: Sesión de tutoría mañana",
    author: "Dr. Martínez",
    authorAvatar: "/placeholder.svg?height=32&width=32",
    date: "15 Feb, 2025",
    excerpt:
      "Les recuerdo que mañana tendremos una sesión de tutoría a las 16:00 para resolver dudas sobre la Tarea 1. La asistencia es opcional pero recomendada.",
    category: "Anuncios",
    replies: 2,
    views: 75,
  },
];
