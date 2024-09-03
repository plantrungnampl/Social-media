import { Prisma } from "@prisma/client";

export const userSelect = {
  id: true,
  username: true,
  displayName: true,
  avatarUrl: true,
} satisfies Prisma.UserSelect;
export const postDataInclude = {
  author: {
    select: userSelect,
  },
} satisfies Prisma.PostInclude;
export type PostData = Prisma.PostGetPayload<{
  include: typeof postDataInclude;
}>;
export interface PostPage {
  posts: PostData[];
  nextCursor: string | null;
}
export interface FollowerInfo {
  followers: number
  isFollowerByUser: boolean;
}