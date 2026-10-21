import { PrismaClient } from "@prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

const adapter = new PrismaLibSql({
  // .trim() removes any invisible spaces that might have been pasted into Vercel
  url: (process.env.TURSO_DATABASE_URL || "").trim(),
  authToken: (process.env.TURSO_AUTH_TOKEN || "").trim(),
});

export const prisma = globalForPrisma.prisma || new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
