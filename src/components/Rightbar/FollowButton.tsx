"use client";
import { Loader2, UserPlus, Check } from "lucide-react";
import React from "react";
import { useFollowMutation, useUnfollowMutation } from "../Posts/editor/mutation";
export const FollowButton: React.FC<{ userId: string, isFollowing: boolean }> = ({ userId, isFollowing }) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const { mutate: follow} = useFollowMutation();
  const { mutate: unfollow } = useUnfollowMutation();

  const handleToggleFollow = async () => {
    setIsLoading(true);
    try {
      if (isFollowing) {
        unfollow(userId);
      } else {
        follow(userId);
      }
    } catch (error) {
      console.error("Failed to toggle follow user:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleToggleFollow}
      disabled={isLoading}
      className={`px-3 py-1 rounded-full flex items-center justify-center transition-all text-xs font-medium ${
        isFollowing
          ? "bg-green-100 text-green-600 hover:bg-red-100 hover:text-red-600"
          : "bg-blue-100 hover:bg-blue-200 text-blue-600"
      }`}
    >
      {isLoading ? (
        <Loader2 className="w-3 h-3 animate-spin" />
      ) : isFollowing ? (
        <>
          <Check className="w-3 h-3 mr-1" />
          unfollow
        </>
      ) : (
        <>
          <UserPlus className="w-3 h-3 mr-1" />
          Follow
        </>
      )}
    </button>
  );
};