import { RegisterForm } from "@/components/auth/register-form";
import { GalleryVerticalEnd, GraduationCap } from "lucide-react";

export default function RegisterPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <GraduationCap className="size-4" />
            </div>
            Saberis
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-sm">
            <RegisterForm />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block overflow-hidden">
        {/* Patrón de íconos distribuidos uniformemente */}
        <div className="absolute inset-0 grid grid-cols-6 gap-8 p-12 opacity-20">
          {Array.from({ length: 36 }).map((_, i) => (
            <div key={i} className="flex items-center justify-center">
              <GraduationCap
                className="text-primary size-8 md:size-10"
                style={{ transform: `rotate(${(i % 4) * 90}deg)` }}
              />
            </div>
          ))}
        </div>

        {/* Placeholder central */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-background/80 p-8 rounded-lg shadow-lg backdrop-blur-sm">
            <div className="flex flex-col items-center gap-2">
              <GraduationCap className="text-primary size-16" />
              <h2 className="text-2xl font-semibold">Saberis</h2>
              <p className="text-muted-foreground text-center">
                Tu espacio para aprender, enseñar y crecer
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
