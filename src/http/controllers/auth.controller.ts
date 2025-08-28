import { Request, Response } from "express";
import { createUser, findByEmail } from "../../domain/user.service";
import { verifyPassword } from "../../utils/password";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function register(req: Request, res: Response) {
  const { fullName, birthDate, email, password, role } = req.body;

  if (!fullName || !birthDate || !email || !password) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const existing = await findByEmail(email);
  if (existing) return res.status(409).json({ error: "Email already exists" });

  const user = await createUser({ fullName, birthDate: new Date(birthDate), email, password, role });
  res.status(201).json(user);
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: "Missing email or password" });

  const user = await findByEmail(email);
  if (!user) return res.status(401).json({ error: "Invalid credentials" });

  const ok = await verifyPassword(password, user.password);
  if (!ok) return res.status(401).json({ error: "Invalid credentials" });

  if (!user.isActive) return res.status(403).json({ error: "User is blocked" });

  const token = jwt.sign({ sub: user.id, role: user.role }, JWT_SECRET, { expiresIn: "7d" });

  res.json({ token, user: { id: user.id, fullName: user.fullName, email: user.email, role: user.role } });
}
