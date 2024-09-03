"use server";
import { validateRequest } from "@/auth";
import { db } from "@/lib/db";
import { FollowerInfo } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params: { userId } }: { params: { userId: string } }
) {
  try {
    const { user: isLoggInUser } = await validateRequest();
    if (!isLoggInUser)
      return NextResponse.json({ error: "Unanthorize" }, { status: 401 });
    const user = await db.user.findUnique({
      where: { id: userId },
      select: {
        followers: {
          where: {
            followerId: isLoggInUser.id,
          },
          select: {
            followerId: true,
          },
        },
        _count: {
          select: {
            followers: true,
          },
        },
      },
    });
    if (!user) {
      return NextResponse.json({ error: "users not found" }, { status: 404 });
    }
    const data: FollowerInfo = {
      followers: user._count.followers,
      isFollowerByUser:!!user.followers.length
    };
    return NextResponse.json(data)
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
}
