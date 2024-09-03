import { validateRequest } from "@/auth";
import { db } from "@/lib/db";
import { PostPage, postDataInclude } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { user } = await validateRequest();
    const cursor = req.nextUrl.searchParams.get("cursor") || undefined;
    const pagesize = 10;
    if (!user)
      return NextResponse.json({ error: "Unanthorize" }, { status: 401 });
    const posts = await db.post.findMany({
      include: postDataInclude,

      orderBy: {
        createdAt: "desc",
      },
      take: pagesize + 1,
      cursor: cursor ? { id: cursor } : undefined,
    });
    const nextCursor = posts.length > pagesize ? posts[pagesize].id : null;
    const data: PostPage = {
      posts: posts.slice(0, pagesize),
      nextCursor,
    };
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json(err);
  }
}
