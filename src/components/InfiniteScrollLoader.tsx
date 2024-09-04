"use client";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { LoadingSpiner } from "./Loading/loadingSpiner";

interface InfiniteScrollLoaderProps {
  hasNextPage: boolean | undefined;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
}

export const InfiniteScrollLoader: React.FC<InfiniteScrollLoaderProps> = ({
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
}) => {
  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: false,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div ref={ref} className="h-20 flex items-center justify-center">
      {isFetchingNextPage ? (
        <>
          <LoadingSpiner />
        </>
      ) : hasNextPage ? (
        <button
          onClick={() => fetchNextPage()}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Load more
        </button>
      ) : (
        <p className="text-gray-500">No more posts to load</p>
      )}
    </div>
  );
};
