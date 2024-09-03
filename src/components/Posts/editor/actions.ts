"use server";
import { validateRequest } from "@/auth";
import { db } from "@/lib/db";
import { postDataInclude } from "@/lib/types";
import { createPostSchema } from "@/validation";
import { revalidatePath } from "next/cache";

export const SubmitPost = async (input: {
  content: string;
  imageUrl?: string | null;
}) => {
  const { user } = await validateRequest();
  if (!user) throw Error("Please login before post content");

  const validatedData = createPostSchema.parse(input);
  const newPost = await db.post.create({
    data: {
      content: validatedData.content || "",
      authorId: user.id,
      imageUrl: validatedData.imageUrl || null,
    },
    include: postDataInclude,
  });
  revalidatePath("/");
  return newPost;
};

export const deletePost = async (postId: string) => {
  const { user } = await validateRequest();
  if (!user) throw Error("Please login before deleting a post");
  const post = await db.post.findUnique({
    where: { id: postId },
    select: { authorId: true },
  });

  if (!post) throw Error("Post not found");
  if (post.authorId !== user.id)
    throw Error("You can only delete your own posts");

  await db.post.delete({ where: { id: postId } });
  revalidatePath("/");
  return { success: true };
};

// export const followUser = async (userId: string) => {
//   const { user } = await validateRequest();
//   if (!user) throw Error("Please login before following a user");

//   const targetUser = await db.user.findUnique({
//     where: { id: userId },
//   });

//   if (!targetUser) throw Error("User not found");

//   if (user.id === userId) throw Error("You cannot follow yourself");

//   const existingFollow = await db.follow.findUnique({
//     where: {
//       followerId_followingId: {
//         followerId: user.id,
//         followingId: userId,
//       },
//     },
//   });

//   if (existingFollow) throw Error("You are already following this user");

//   await db.follow.create({
//     data: {
//       follower: { connect: { id: user.id } },
//       following: { connect: { id: userId } },
//     },
//   });

//   revalidatePath(`/users/${targetUser.username}`);
//   return { success: true };
// };

// export const unfollowUser = async (userId: string) => {
//   const { user } = await validateRequest();
//   if (!user) throw Error("Please login before unfollowing a user");

//   const targetUser = await db.user.findUnique({
//     where: { id: userId },
//   });

//   if (!targetUser) throw Error("User not found");

//   const existingFollow = await db.follow.findUnique({
//     where: {
//       followerId_followingId: {
//         followerId: user.id,
//         followingId: userId,
//       },
//     },
//   });

//   if (!existingFollow) throw Error("You are not following this user");

//   await db.follow.delete({
//     where: {
//       followerId_followingId: {
//         followerId: user.id,
//         followingId: userId,
//       },
//     },
//   });

//   revalidatePath(`/users/${targetUser.username}`);
//   return { success: true };
// };
export const followUser = async (userId: string) => {
  const { user } = await validateRequest();
  if (!user) throw Error("Please login before following a user");

  const targetUser = await db.user.findUnique({
    where: { id: userId },
  });

  if (!targetUser) throw Error("User not found");

  if (user.id === userId) throw Error("You cannot follow yourself");

  const existingFollow = await db.follow.findUnique({
    where: {
      followerId_followingId: {
        followerId: user.id,
        followingId: userId,
      },
    },
  });

  if (existingFollow) throw Error("You are already following this user");

  await db.follow.create({
    data: {
      follower: { connect: { id: user.id } },
      following: { connect: { id: userId } },
    },
  });

  revalidatePath(`/users/${targetUser.username}`);
  return { success: true };
};

export const unfollowUser = async (userId: string) => {
  const { user } = await validateRequest();
  if (!user) throw Error("Please login before unfollowing a user");

  const targetUser = await db.user.findUnique({
    where: { id: userId },
  });

  if (!targetUser) throw Error("User not found");

  const existingFollow = await db.follow.findUnique({
    where: {
      followerId_followingId: {
        followerId: user.id,
        followingId: userId,
      },
    },
  });

  if (!existingFollow) throw Error("You are not following this user");

  await db.follow.delete({
    where: {
      followerId_followingId: {
        followerId: user.id,
        followingId: userId,
      },
    },
  });

  revalidatePath(`/users/${targetUser.username}`);
  return { success: true };
};