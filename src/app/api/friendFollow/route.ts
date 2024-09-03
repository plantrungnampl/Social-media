import { validateRequest } from "@/auth";
import { db } from "@/lib/db";
import { userSelect } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { user } = await validateRequest();
    if (!user)
      return NextResponse.json({ error: "Unanthorize" }, { status: 401 });
    const userFollow = await db.user.findMany({
      where: {
        NOT: {
          id: user.id,
        },
      },
      select: userSelect,
      take: 5,
    });

    return NextResponse.json(userFollow);
  } catch (err) {
    return NextResponse.json(err);
  }
}
