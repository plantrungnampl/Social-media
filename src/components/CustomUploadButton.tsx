import React from "react";
import { OurFileRouter } from "@/app/api/uploadthing/core";
import { Image } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UploadButton } from "@/utils/uploadthing";
import { useImageResize } from "@/hook/useImageResize";

interface CustomUploadButtonProps {
  onUploadComplete: (url: string) => void;
}

export const CustomUploadButton: React.FC<CustomUploadButtonProps> = ({
  onUploadComplete,
}) => {
  const { resizedImage, resizeImage } = useImageResize();

  return (
    <UploadButton
      endpoint="imageUploader"
      onBeforeUploadBegin={(files) => {
        return files.map((file) => {
          resizeImage(file);
          return file;
        });
      }}
      onClientUploadComplete={(res) => {
        if (res && res[0] && resizedImage) {
          onUploadComplete(resizedImage);
        }
      }}
      onUploadError={(error: Error) => {
        console.error(error);
        alert("Upload failed");
      }}
    >
      {({ onClick }) => (
        <Button
          variant="ghost"
          size="icon"
          className="text-gray-500 hover:text-blue-500 transition-colors duration-300"
          onClick={onClick}
        >
          <Image size={20} />
        </Button>
      )}
    </UploadButton>
  );
};
