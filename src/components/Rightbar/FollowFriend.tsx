"use client";
import React, { Suspense } from "react";
import { UserCard } from "./UserCard";
import { UserCardListSkeleton } from "../UserCardSkeleton";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { User } from "@prisma/client";
export const FollowFriend = () => {
  return (
    <div className="mt-4">
      <h2 className="text-sm font-semibold mb-3 text-gray-700">
        People you might know
      </h2>
      <Suspense fallback={<UserCardListSkeleton />}>
        <FollowFriendServer />
      </Suspense>
    </div>
  );
};

async function FollowFriendServer() {
  const followFriend = async () => {
    try {
      const { data } = await axios.get("/api/friendFollow");
      return data;
    } catch (err) {
      console.log(err);
    }
  };
  const { data: userFollow, isLoading } = useQuery({
    queryKey: ["friendFollow"],
    queryFn: followFriend,
  });
  if (isLoading) {
    return (
      <>
        <UserCardListSkeleton />
      </>
    );
  }
  return (
    <div className="space-y-4">
      {userFollow?.map((user: User) => (
        <UserCard key={user.id} users={user} />
      ))}
    </div>
  );
}
