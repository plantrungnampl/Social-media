"use client";
import React, { useCallback, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ImageIcon, Smile, Send, X } from "lucide-react";
import { useSession } from "@/app/(site)/sessionProvider";
import { DEFAULT_CAT_AVATAR } from "@/constant/constant";
import { UploadDropzone } from "@/utils/uploadthing";
import { useImageResize } from "@/hook/useImageResize";
import { useSubmitMutationPost } from "./Posts/editor/mutation";
import "../components/Posts/editor/style.css";
import Image from "next/image";
interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreatePostModal: React.FC<CreatePostModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { user } = useSession();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { resizeImage, resizedImage } = useImageResize();
  const mutation = useSubmitMutationPost();
  const [content, setContent] = useState("");

  const updateContent = useCallback((newContent: string) => {
    setContent(newContent);
  }, []);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bold: false,
        italic: false,
      }),
      Placeholder.configure({
        placeholder: `What's on your mind, ${user?.username}?`,
      }),
    ],
    content: "",
    immediatelyRender: false,

    onUpdate: ({ editor }) => {
      updateContent(editor.getText());
    },
  });

  const isDisabled = !content.trim() && !selectedImage;

  const onSubmit = async () => {
    if (!content.trim() && !selectedImage) return;

    try {
      await mutation.mutateAsync({
        content: content.trim(),
        imageUrl: selectedImage,
      });
      editor?.commands.clearContent();
      setSelectedImage(null);
      setContent("");
      onClose();
    } catch (error) {
      console.error("Error submitting post:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">Create articles</DialogTitle>
        </DialogHeader>
        <div className="flex items-start space-x-4 mb-4">
          <Avatar className="w-10 h-10">
            <AvatarImage
              src={user?.avatarUrl || DEFAULT_CAT_AVATAR}
              alt={user?.displayName || user?.username}
            />
            <AvatarFallback>{user?.username?.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-grow">
            <p className="font-semibold">
              {user?.displayName || user?.username}
            </p>
            <Button variant="outline" size="sm">
              Public
            </Button>
          </div>
        </div>
        <EditorContent
          editor={editor}
          className="editor-content flex-1 max-h-[300px] overflow-y-auto w-full rounded-lg p-3 border border-gray-200 focus-within:border-blue-500 transition-all duration-300"
        />
        {selectedImage && (
          <div className="relative mt-2">
            <img
              src={selectedImage}
              alt="Selected"
              className="w-full rounded-md"
            />
            <Button
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2"
              onClick={() => setSelectedImage(null)}
            >
              <X size={16} />
            </Button>
          </div>
        )}
        <div className="flex flex-col gap-2 justify-between items-center">
          <div className="flex space-x-2 w-full">
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-500 hover:text-blue-500 transition-colors duration-300"
                >
                  <ImageIcon size={20} />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Upload Image</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <UploadDropzone
                    className="bg-slate-800 ut-label:text-lg ut-allowed-content:ut-uploading:text-red-300"
                    endpoint="imageUploader"
                    onBeforeUploadBegin={(files) => {
                      return files.map((file) => {
                        resizeImage(file);
                        return file;
                      });
                    }}
                    onClientUploadComplete={(res) => {
                      if (res && res[0]) {
                        setSelectedImage(res[0].url);
                      }
                    }}
                    onUploadError={(error: Error) => {
                      console.error(error);
                      alert("Upload failed");
                    }}
                  />
                </div>
              </DialogContent>
            </Dialog>
            <Button variant="ghost" size="icon">
              <Smile size={20} />
            </Button>
          </div>
          <Button
            onClick={onSubmit}
            disabled={isDisabled}
            className={`w-full bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-all duration-300 flex items-center ${
              mutation.isPending ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {mutation.isPending ? "Posting..." : "Post"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
