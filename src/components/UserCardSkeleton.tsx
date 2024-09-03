import React from "react";

const UserCardSkeleton: React.FC = () => {
  return (
    <div className="flex items-center space-x-2 py-2 cursor-pointer hover:bg-gray-50 transition-colors duration-700 rounded-lg animate-pulse">
      <div className="flex items-center flex-grow min-w-0">
        <div className="w-8 h-8 bg-gray-200 rounded-full flex-shrink-0"></div>
        <div className="flex-grow min-w-0 ml-2">
          <div className="h-4 bg-gray-200 rounded w-24 mb-1"></div>
          <div className="h-3 bg-gray-200 rounded w-20"></div>
        </div>
      </div>
      <div className="w-20 h-8 bg-gray-200 rounded"></div>
    </div>
  );
};

export const UserCardListSkeleton: React.FC = () => {
  return (
    <div className="space-y-4">
      {[...Array(3)].map((_, index) => (
        <UserCardSkeleton key={index} />
      ))}
    </div>
  );
};
