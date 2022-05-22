import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export interface Context {
  req: Request;
  res: Response;
  prismaContext: { prisma: PrismaClient };
}

export const prismaContext = {
  prisma: prisma,
};
