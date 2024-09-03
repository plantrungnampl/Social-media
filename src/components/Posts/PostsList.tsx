"use client";
import Image from "next/image";
import React, { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import {
  Edit,
  Ellipsis,
  MessageCircle,
  RefreshCw,
  ThumbsUp,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { PostData } from "@/lib/types";
import { DEFAULT_CAT_AVATAR } from "@/constant/constant";
import { useSession } from "@/app/(site)/sessionProvider";
import { useDeleteMutationPost } from "./editor/mutation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
interface PostProps {
  post: PostData;
}

export const PostsList: React.FC<PostProps> = ({ post }) => {
  const { user } = useSession();
  const deletePostMutation = useDeleteMutationPost();
  const handleDeletePost = () => {
    deletePostMutation.mutate(post.id);
  };

  const isAuthor = user?.id === post.author.id;
  return (
    <article className="bg-white shadow-md rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <Link
            href={`/author/${post?.author?.username}`}
            className="flex items-center group"
          >
            <Image
              src={post?.author?.avatarUrl || DEFAULT_CAT_AVATAR}
              alt={post?.author?.displayName || post?.author?.username}
              width={40}
              height={40}
              className="rounded-full mr-3 transition-transform group-hover:scale-105"
            />
            <div>
              <h2 className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                {post?.author?.displayName || post?.author?.username}
              </h2>
              <p className="text-sm text-gray-500">
                {formatDistanceToNow(new Date(post?.createdAt), {
                  addSuffix: true,
                })}
              </p>
            </div>
          </Link>
          {isAuthor && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                  <Ellipsis className="w-5 h-5 text-gray-500" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </DropdownMenuItem>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete your post and remove the data from our servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleDeletePost}>
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
                <DropdownMenuItem>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Update
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
        <p className="text-gray-700 whitespace-pre-wrap hover:text-gray-900 transition-colors mb-4">
          {post?.content}
        </p>
        {post.imageUrl && (
          <div className="mb-4 relative w-full h-72 overflow-hidden rounded-lg">
            <Image
              src={post.imageUrl}
              alt="Post"
              layout="fill"
              objectFit="cover"
            />
          </div>
        )}
      </div>
      <div className="bg-gray-50 px-6 py-3 flex items-center space-x-4">
        <button className="flex items-center text-gray-600 hover:text-blue-600 transition-colors duration-200">
          <ThumbsUp className="w-5 h-5 mr-2" />
          <span>Like</span>
        </button>
        <Link
          href={`/posts/${post.id}#comments`}
          className="flex items-center text-gray-600 hover:text-blue-600 transition-colors duration-200"
        >
          <MessageCircle className="w-5 h-5 mr-2" />
          <span>Comment</span>
        </Link>
      </div>
    </article>
  );
};
