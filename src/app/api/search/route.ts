'use server'
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest, res: NextResponse) => {
  try {

  } catch (err) {
    console.log(err);
    NextResponse.json({ message: "search Error , Please try again" }, { status: 404 });
  }
};
