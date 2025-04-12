/* eslint-disable react/display-name */
"use client";

import {
  useCallback,
  useRef,
  forwardRef,
  useImperativeHandle,
  useEffect,
} from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ImageIcon, Upload } from "lucide-react";
import { useImageStore } from "@/store/image";
import { CldImage } from "next-cloudinary";
import { AspectRatio } from "../ui/aspect-ratio";

interface ImageUploaderProps {
  fallback: string | null;
}

const ImageUploader = forwardRef(({ fallback }: ImageUploaderProps, ref) => {
  const { selectedImage, imageUrl, setSelectedImage, uploadImage } =
    useImageStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = useCallback(
    (file: File) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    },
    [setSelectedImage]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (file && file.type.startsWith("image/")) {
        handleImageChange(file);
      }
    },
    [handleImageChange]
  );

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  }, []);

  const handlePaste = useCallback(
    (e: React.ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (items) {
        for (let i = 0; i < items.length; i++) {
          if (items[i].type.indexOf("image") !== -1) {
            const file = items[i].getAsFile();
            if (file) handleImageChange(file);
            break;
          }
        }
      }
    },
    [handleImageChange]
  );

  const handleUpload = useCallback(() => {
    if (selectedImage) {
      return uploadImage(selectedImage);
    }
    return Promise.resolve(null);
  }, [selectedImage, uploadImage]);

  useImperativeHandle(ref, () => ({
    handleUpload,
    getImageUrl: () => imageUrl,
  }));

  useEffect(() => {
    if (fallback) setSelectedImage(fallback);
  }, [fallback]);

  return (
    <Card className="w-[105px] mx-auto bg-transparent border-0 shadow-none">
      <CardContent className="p-0">
        <div
          className="relative aspect-square rounded-full overflow-hidden group cursor-pointer"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onPaste={handlePaste}
          onClick={() => fileInputRef.current?.click()}
        >
          {selectedImage ? (
            <>
              <AspectRatio ratio={1}>
                <CldImage
                  src={selectedImage}
                  alt="Preview"
                  width="100"
                  height="100"
                  className="w-full h-full object-cover rounded-full"
                  crop={{
                    type: "auto",
                    source: true,
                  }}
                />
              </AspectRatio>
            </>
          ) : (
            <div className="w-full h-full bg-muted rounded-full flex items-center justify-center">
              <ImageIcon className="w-20 h-20 text-muted-foreground" />
            </div>
          )}
          <div className="absolute inset-0 bg-black/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <Upload className="h-12 w-12 text-background bg-foreground p-3 rounded-full" />
          </div>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleImageChange(file);
          }}
        />
      </CardContent>
    </Card>
  );
});

export default ImageUploader;
