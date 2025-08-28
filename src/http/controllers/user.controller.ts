import { Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import { prisma } from "../../db/prisma";

export async function getUserById(req: AuthRequest, res: Response) {
  const { id } = req.params;
  const requester = req.user!;

  if (requester.role !== "admin" && requester.id !== id) {
    return res.status(403).json({ error: "Forbidden" });
  }

  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      fullName: true,
      email: true,
      role: true,
      isActive: true,
      birthDate: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!user) return res.status(404).json({ error: "User not found" });
  res.json(user);
}

export async function listUsers(_req: AuthRequest, res: Response) {
  const requester = _req.user!;
  if (requester.role !== "admin") return res.status(403).json({ error: "Forbidden" });

  const users = await prisma.user.findMany({
    select: {
      id: true,
      fullName: true,
      email: true,
      role: true,
      isActive: true,
      birthDate: true,
      createdAt: true,
      updatedAt: true,
    },
    orderBy: { createdAt: "desc" },
  });

  res.json(users);
}

export async function blockUser(req: AuthRequest, res: Response) {
  const { id } = req.params;
  const requester = req.user!;

  // Разрешено: админ может заблокировать любого, а пользователь — только себя
  if (requester.role !== "admin" && requester.id !== id) {
    return res.status(403).json({ error: "Forbidden" });
  }

  const user = await prisma.user.update({
    where: { id },
    data: { isActive: false },
    select: {
      id: true,
      fullName: true,
      email: true,
      role: true,
      isActive: true,
    },
  });

  res.json(user);
}
