"use client";

import React from "react";

const PostSkeleton: React.FC = () => {
  return (
    <article className="bg-white shadow-md rounded-lg overflow-hidden transition-all duration-700 hover:shadow-lg animate-pulse">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="rounded-full bg-gray-200 w-10 h-10 mr-3"></div>
            <div>
              <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-16"></div>
            </div>
          </div>
          <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
        </div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>
      </div>
      <div className="bg-gray-50 px-6 py-3 flex items-center space-x-4">
        <div className="flex items-center">
          <div className="w-5 h-5 bg-gray-200 rounded mr-2"></div>
          <div className="h-4 bg-gray-200 rounded w-12"></div>
        </div>
        <div className="flex items-center">
          <div className="w-5 h-5 bg-gray-200 rounded mr-2"></div>
          <div className="h-4 bg-gray-200 rounded w-16"></div>
        </div>
      </div>
    </article>
  );
};

export const PostsListSkeleton: React.FC = () => {
  return (
    <div className="space-y-4">
      {[...Array(3)].map((_, index) => (
        <PostSkeleton key={index} />
      ))}
    </div>
  );
};
