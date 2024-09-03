import { PostsList } from "@/components/Posts/PostsList";
import { PostEditor } from "@/components/Posts/editor/PostEditor";
import { db } from "@/lib/db";
import { PostData, postDataInclude } from "@/lib/types";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Post } from "@prisma/client";
import { ForU } from "./For-y";

export default function Home() {
  // const posts = await db.post.findMany({
  //   include: postDataInclude,

  //   orderBy: {
  //     createdAt: "desc",
  //   },
  // });

  return (
    <div className="bg-white shadow rounded-lg p-6">
      {/* <h1 className="text-2xl font-bold mb-4">
        Welcome to Social Media Project
      </h1> */}
      <PostEditor />
      <div className="space-y-4 mt-6">
        <ForU />
      </div>
    </div>
  );
}
