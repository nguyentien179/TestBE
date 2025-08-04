import { z } from "zod";

export const UserResponseDTO = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string(),
  role: z.enum(["GUEST", "REGISTERED", "ADMIN", "EDITOR"]),
  createdAt: z.string().datetime()
});

export const UpdateUserDTO = z.object({
  name: z.string().min(1).optional(),
  password: z.string().min(6).optional(),
});
