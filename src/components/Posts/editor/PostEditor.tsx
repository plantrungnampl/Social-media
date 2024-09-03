"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession } from "@/app/(site)/sessionProvider";
import { DEFAULT_CAT_AVATAR } from "@/constant/constant";
import { CreatePostModal } from "@/components/CreatePostModal";

export const PostEditor: React.FC = () => {
  const { user } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="post-editor bg-white shadow-lg rounded-lg p-4 transition-all duration-300 hover:shadow-xl">
      <div className="flex items-center space-x-4">
        <Avatar className="w-10 h-10">
          <AvatarImage
            src={user?.avatarUrl || DEFAULT_CAT_AVATAR}
            alt={user?.displayName || user?.username}
          />
          <AvatarFallback>YN</AvatarFallback>
        </Avatar>
        <Button
          variant="outline"
          className="flex-grow text-left justify-start"
          onClick={() => setIsModalOpen(true)}
        >
          What's on your mind, {user?.username}?
        </Button>
      </div>
      <CreatePostModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};
