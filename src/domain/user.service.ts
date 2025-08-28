import { prisma } from "../db/prisma";
import { hashPassword, verifyPassword } from "../utils/password";
import { User } from "@prisma/client";

export async function createUser(data: {
  fullName: string;
  birthDate: Date;
  email: string;
  password: string;
  role?: "user" | "admin";
}) {
  const passwordHash = await hashPassword(data.password);
  const user = await prisma.user.create({
    data: {
      fullName: data.fullName,
      birthDate: data.birthDate,
      email: data.email.toLowerCase(),
      password: passwordHash,
      role: data.role ?? "user",
    },
  });
  return {
    id: user.id,
    fullName: user.fullName,
    birthDate: user.birthDate.toISOString(),
    email: user.email,
    role: user.role,
    isActive: user.isActive,
    createdAt: user.createdAt.toISOString(),
    updatedAt: user.updatedAt.toISOString(),
  };
}

export async function findByEmail(email: string) {
  return prisma.user.findUnique({ where: { email: email.toLowerCase() } });
}
