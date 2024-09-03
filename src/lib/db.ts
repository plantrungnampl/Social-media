import { PrismaClient } from "@prisma/client";
import { withOptimize } from "@prisma/extension-optimize";

const extendedPrisma = () => new PrismaClient().$extends(withOptimize());
type prismaClientExtended = ReturnType<typeof extendedPrisma>;

declare global {
  var prisma: prismaClientExtended | undefined;
}
export const db =
  globalThis.prisma || new PrismaClient().$extends(withOptimize());

if (process.env.NODE_ENV !== "production") global.prisma = db;
