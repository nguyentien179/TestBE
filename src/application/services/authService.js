import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../../infrastructure/client.js";
import { RegisterSchema } from "../../domain/DTOs/Auth/RegisterDTO.js";
import { LoginSchema } from "../../domain/DTOs/Auth/LoginDTO.js";
import { RefreshTokenSchema } from "../../domain/DTOs/Auth/RefreshTokenDTO.js";

class AuthService {
  async register(input) {
    const dto = RegisterSchema.parse(input);

    const existing = await prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (existing) throw new Error("Email already in use");

    const hashed = await bcrypt.hash(dto.password, 10);

    const user = await prisma.user.create({
      data: {
        email: dto.email,
        password: hashed,
        name: dto.name,
        role: "REGISTERED",
      },
    });

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };
  }

  async login(input) {
    const dto = LoginSchema.parse(input);

    const user = await prisma.user.findUnique({ where: { email: dto.email } });
    if (!user) throw new Error("Invalid credentials");

    const valid = await bcrypt.compare(dto.password, user.password);
    if (!valid) throw new Error("Invalid credentials");

    const accessToken = this.#generateAccessToken(user);
    const refreshToken = this.#generateRefreshToken(user);

    await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken },
    });

    return { accessToken, refreshToken };
  }

  async refreshToken(input) {
    const dto = RefreshTokenSchema.parse(input);

    let payload;
    try {
      payload = jwt.verify(dto.refreshToken, process.env.REFRESH_TOKEN_SECRET);
    } catch {
      throw new Error("Invalid refresh token");
    }

    const user = await prisma.user.findUnique({ where: { id: payload.id } });
    if (!user || user.refreshToken !== dto.refreshToken) {
      throw new Error("Refresh token does not match");
    }

    const newAccessToken = this.#generateAccessToken(user);
    const newRefreshToken = this.#generateRefreshToken(user);

    await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken: newRefreshToken },
    });

    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
  }

  async logout(userId) {
    await prisma.user.update({
      where: { id: userId },
      data: { refreshToken: null },
    });
  }

  async getProfile(userId) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }
    return user;
  }

  #generateAccessToken(user) {
    return jwt.sign(
      { id: user.id, role: user.role },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRY || "15m" }
    );
  }

  #generateRefreshToken(user) {
    return jwt.sign({ id: user.id }, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY || "7d",
    });
  }
}

export default new AuthService();
