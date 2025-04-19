"use client";

import { type ChangeEvent, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Upload, X } from "lucide-react";

interface ImageUploadProps {
  className?: string;
  onChange?: (file: File | null) => void;
}

export function ImageUpload({ className, onChange }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      onChange?.(file);
    } else {
      setPreview(null);
      onChange?.(null);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    onChange?.(null);
  };

  return (
    <div className={cn("flex flex-col items-center gap-4", className)}>
      {preview ? (
        <div className="relative">
          <img
            src={preview || "/placeholder.svg"}
            alt="Preview"
            className="h-24 w-24 rounded-full object-cover border"
          />
          <Button
            variant="destructive"
            size="icon"
            className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
            onClick={handleRemove}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div className="flex h-24 w-24 items-center justify-center rounded-full border border-dashed bg-muted">
          <Upload className="h-8 w-8 text-muted-foreground" />
        </div>
      )}

      <div className="flex items-center justify-center">
        <label htmlFor="thumbnail-upload" className="cursor-pointer">
          <Button variant="outline" type="button" size="sm" className="text-xs">
            {preview ? "Cargar imagen" : "Subir imagen"}
          </Button>
          <input
            id="thumbnail-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>
      </div>
    </div>
  );
}
