"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Home, BookOpen, Search, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  // Track mouse movement for the interactive effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth - 0.5,
        y: e.clientY / window.innerHeight - 0.5,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground p-4">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/50 to-background opacity-80" />

      {/* Slow-moving educational-themed floating elements */}
      <div className="absolute inset-0 overflow-hidden">
        {["📚", "🎓", "✏️", "📝", "🔍", "📊", "💡", "🧠", "📖", "🧮"].map((emoji, i) => (
          <div
            key={i}
            className="absolute text-4xl opacity-10"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `floatSlow ${Math.random() * 30 + 180}s linear infinite`, // Much slower animation
              transform: `rotate(${Math.random() * 30 - 15}deg)`,
            }}
          >
            {emoji}
          </div>
        ))}
      </div>

      {/* Main content */}
      <div
        className="relative z-10 max-w-2xl w-full text-center bg-card backdrop-blur-lg rounded-2xl p-8 border border-border shadow-xl"
        style={{
          transform: `translate(${mousePosition.x * 5}px, ${mousePosition.y * 5}px)`, // Reduced movement
          transition: "transform 0.3s ease-out", 
        }}
      >
        {/* Educational 404 visualization */}
        <div className="mb-6 relative">
          <div className="flex items-center justify-center gap-4">
            <div className="text-8xl font-bold leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/70">
              404
            </div>
          </div>

          {/* Animated underline - slower */}
          <div className="h-1 w-full bg-gradient-to-r from-transparent via-primary to-transparent animate-pulse duration-[4s] mt-4" />
        </div>

        <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80">
          Página no encontrada
        </h1>

        <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
          Parece que la página que está buscando no existe. El conocimiento que buscas podría estar en otro
          lugar de nuestra plataforma.
        </p>

        {/* Educational metaphor */}
        <div className="mb-8 p-4 bg-muted/50 rounded-lg border border-border">
          <p className="text-primary/90 italic">
            "El aprendizaje es un camino con muchas rutas. A veces necesitamos explorar un nuevo sendero para encontrar
            lo que buscamos."
          </p>
        </div>

        {/* Navigation options */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            asChild
            size="lg"
            variant="default"
          >
            <Link href="/">
              <Home className="mr-2 h-5 w-5" />
              Inicio
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            size="lg"
          >
            <Link href="/courses">
              <BookOpen className="mr-2 h-5 w-5" />
              Mis Cursos
            </Link>
          </Button>

          <Button
            variant="ghost"
            size="lg"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Regresar
          </Button>
        </div>

        <div className="mt-8 text-sm text-muted-foreground">
          <p className="mb-2">¿Buscabas algo específico?</p>
          <div className="flex items-center justify-center">
            <Search className="w-4 h-4 mr-2 text-primary/70" />
            <span>Prueba usando el buscador en la página principal</span>
          </div>
        </div>
      </div>

      <div className="mt-8 text-xs text-muted-foreground/70">
        © {new Date().getFullYear()} Virtual Saberis • Plataforma de Aprendizaje
      </div>

      <style jsx global>{`
        @keyframes floatSlow {
          0% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(5px, 5px) rotate(1deg); }
          66% { transform: translate(-5px, 3px) rotate(-1deg); }
          100% { transform: translate(0, 0) rotate(0deg); }
        }
        
        .animate-pulse {
          animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  )
}