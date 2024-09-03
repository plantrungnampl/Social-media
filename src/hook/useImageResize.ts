import { useState } from "react";
import Resizer from "react-image-file-resizer";

export const useImageResize = () => {
  const [resizedImage, setResizedImage] = useState<string | null>(null);

  const resizeImage = (file: any) => {
    Resizer.imageFileResizer(
      file,
      800, // max width
      600, // max height
      "JPEG",
      80, // quality
      0, // rotation
      (uri) => {
        setResizedImage(uri as string);
      },
      "base64"
    );
  };

  return { resizedImage, resizeImage };
};
