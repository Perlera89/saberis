import Link from "next/link"
import { ArrowRight, BookOpen, Calendar, CheckCircle, GraduationCap, MessageSquare, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function LandingPage() {

  return (
    <>
      <div className="container mx-auto px-6">
        {/* Hero Section */}
        <section className="py-12 md:py-20 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1 space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Aprende sin límites con <span className="text-muted-foreground">Saberis</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Una plataforma de aprendizaje moderna y accesible para estudiantes y educadores.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Button size="lg" asChild>
                <Link href="/dashboard">
                  Acceder ahora <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline">
                Conocer más
              </Button>
            </div>
          </div>
          <div className="flex-1 flex justify-center">
            <div className="relative w-full max-w-md aspect-video bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg flex items-center justify-center">
              <GraduationCap className="h-24 w-24 text-primary" />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12 md:py-20">
          <h2 className="text-3xl font-bold text-center mb-12">Características principales</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<BookOpen className="h-10 w-10 text-primary" />}
              title="Cursos interactivos"
              description="Accede a contenido educativo de alta calidad con videos, lecturas y evaluaciones interactivas."
            />
            <FeatureCard
              icon={<Calendar className="h-10 w-10 text-primary" />}
              title="Calendario integrado"
              description="Organiza tu tiempo de estudio con recordatorios de fechas límite y eventos importantes."
            />
            <FeatureCard
              icon={<MessageSquare className="h-10 w-10 text-primary" />}
              title="Comunicación directa"
              description="Mantente en contacto con profesores y compañeros a través de nuestro sistema de mensajería."
            />
            <FeatureCard
              icon={<CheckCircle className="h-10 w-10 text-primary" />}
              title="Seguimiento de progreso"
              description="Visualiza tu avance en cada curso y recibe recomendaciones personalizadas."
            />
            <FeatureCard
              icon={<Users className="h-10 w-10 text-primary" />}
              title="Aprendizaje colaborativo"
              description="Trabaja en proyectos grupales y comparte conocimientos con otros estudiantes."
            />
            <FeatureCard
              icon={<GraduationCap className="h-10 w-10 text-primary" />}
              title="Certificaciones"
              description="Obtén certificados al completar cursos y demuestra tus nuevas habilidades."
            />
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 md:py-20">
          <div className="bg-primary/10 rounded-xl p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">¿Listo para comenzar tu viaje de aprendizaje?</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Únete a miles de estudiantes que ya están transformando su educación con Saberis.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/dashboard">Acceder ahora</Link>
              </Button>
              <Button size="lg" variant="outline">
                Solicitar demostración
              </Button>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-12 md:py-20">
          <h2 className="text-3xl font-bold text-center mb-12">Lo que dicen nuestros usuarios</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <TestimonialCard
              quote="Saberis ha transformado completamente la forma en que imparto mis clases. Mis estudiantes están más comprometidos que nunca."
              author="Prof. García"
              role="Docente de Ciencias"
            />
            <TestimonialCard
              quote="La plataforma es intuitiva y me permite organizar mi tiempo de estudio de manera eficiente. ¡Mis calificaciones han mejorado significativamente!"
              author="Laura Méndez"
              role="Estudiante"
            />
            <TestimonialCard
              quote="Como administrador, valoro la facilidad con la que podemos gestionar cursos y usuarios. El soporte técnico es excepcional."
              author="Carlos Ruiz"
              role="Director Académico"
            />
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-muted mt-12 py-8">
        <div className="container px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <GraduationCap className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold">Saberis</span>
            </div>
            <div className="flex gap-6">
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Términos
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Privacidad
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Contacto
              </Link>
            </div>
          </div>
          <div className="mt-6 text-center md:text-left text-sm text-muted-foreground">
            © 2025 Saberis. Todos los derechos reservados.
          </div>
        </div>
      </footer>
    </>
  )
}

function FeatureCard({ icon, title, description }) {
  return (
    <Card className="border-none shadow-none bg-muted/50">
      <CardContent className="pt-6">
        <div className="mb-4">{icon}</div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}

function TestimonialCard({ quote, author, role }) {
  return (
    <Card className="border-none shadow-none bg-muted/50">
      <CardContent className="pt-6">
        <p className="italic mb-4">"{quote}"</p>
        <div>
          <p className="font-semibold">{author}</p>
          <p className="text-sm text-muted-foreground">{role}</p>
        </div>
      </CardContent>
    </Card>
  )
}
