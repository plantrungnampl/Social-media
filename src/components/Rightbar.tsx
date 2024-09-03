import React from "react";
import { FollowFriend } from "./Rightbar/FollowFriend";
import TrendingTopics from "./Rightbar/TrendingToppic";

export function Rightbar() {
  return (
    <div className="bg-white shadow-lg w-64 fixed top-16 right-0 bottom-0 hidden md:block overflow-y-auto ">
      <div className="p-4 space-y-6">
        <div>
          <h2 className="text-lg font-semibold mb-3 text-gray-800">Discover</h2>
          <FollowFriend />
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-3 text-gray-800">
            Trending Topics
          </h2>
          <div className="space-y-2">
            {/* {["#TechNews", "#GlobalEvents", "#HealthTips"].map((topic) => (
              <div key={topic} className="bg-gray-50 p-2 rounded-md">
                <p className="text-sm font-medium text-gray-700">{topic}</p>
                <p className="text-xs text-gray-500">1.2K posts</p>
              </div>
            ))} */}
            <TrendingTopics />
          </div>
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-3 text-gray-800">
            Sponsored
          </h2>
          <div className="bg-gray-50 p-3 rounded-md">
            <h3 className="font-medium text-sm mb-1">New Product Launch</h3>
            <p className="text-xs text-gray-600">
              Check out our latest innovation!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
