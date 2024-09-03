import { validateRequest } from "@/auth";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

export const ourFileRouter = {
  // imageUploader: f({ image: { maxFileSize: "4MB" } }).onUploadComplete(
  //   async ({ metadata, file }: { metadata: any; file: any }) => {
  //     console.log("Upload complete for userId:", metadata.userId);
  //     console.log("file url", file.url);
  //   }
  // ),
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    .middleware(async () => {
      const { user } = await validateRequest();

      if (!user) throw new UploadThingError("Unauthorized");

      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId);

      console.log("file url", file.url);

      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
