"use client";

import React, { useCallback } from "react";
// import { PostsList } from "@/components/Posts/PostsList";
import { PostData, PostPage } from "@/lib/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import dynamic from "next/dynamic";
import { PostsListSkeleton } from "@/components/LoadingSkeletonPost";

const PostsList = dynamic(
  () => import("@/components/Posts/PostsList").then((mod) => mod.PostsList),
  {
    loading: () => <PostsListSkeleton />,
  }
);
const UpdatingIndicator = dynamic(() =>
  import("@/components/UpdatingIndicator").then((mod) => mod.UpdatingIndicator)
);

const ErrorMessage = dynamic(() =>
  import("@/components/ErrorMessage").then((mod) => mod.ErrorMessage)
);
const InfiniteScrollLoader = dynamic(() =>
  import("@/components/InfiniteScrollLoader").then(
    (mod) => mod.InfiniteScrollLoader
  )
);

export const ForU: React.FC = () => {
  const fetchPosts = useCallback(
    async ({ pageParam }: any): Promise<PostPage> => {
      const { data } = await axios.get<PostPage>("/api/posts/for-you", {
        params: { cursor: pageParam },
      });
      return data;
    },
    []
  );

  const {
    data,
    status,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["for-you"],
    queryFn: fetchPosts,
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000,
  });

  if (status === "pending" && !isFetchingNextPage) {
    // return <LoadingSpinner />;
    return <PostsListSkeleton />;
  }

  if (status === "error") {
    return <ErrorMessage error={error} onRetry={() => fetchNextPage()} />;
  }

  const flatPost: PostData[] = data?.pages.flatMap((page) => page.posts) || [];
  // if (status === "success" && !flatPost.length && !hasNextPage) {
  //   return <p>No more posts to load</p>;
  // }
  return (
    <div className="space-y-4">
      {flatPost.map((post) => (
        <PostsList key={post.id} post={post} />
      ))}

      <InfiniteScrollLoader
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        fetchNextPage={fetchNextPage}
      />

      {isFetching && !isFetchingNextPage && <UpdatingIndicator />}
    </div>
  );
};
