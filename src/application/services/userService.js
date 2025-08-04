import prisma from "../../infrastructure/client.js";
import {
  UpdateUserDTO,
  UserResponseDTO,
} from "../../domain/DTOs/User/UserDTO.js";
import bcrypt from "bcryptjs";

class UserService {
  async getAllUsers() {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
      },
    });

    return users.map((user) =>
      UserResponseDTO.parse({
        ...user,
        createdAt: user.createdAt.toISOString(),
      })
    );
  }

  async getUserById(id) {
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
      },
    });

    if (!user) throw new Error("User not found");
    return UserResponseDTO.parse(user);
  }

  async updateUser(id, input) {
    const dto = UpdateUserDTO.parse(input);

    const data = {};
    if (dto.name) data.name = dto.name;
    if (dto.password) {
      const hashed = await bcrypt.hash(dto.password, 10);
      data.password = hashed;
    }

    const user = await prisma.user.update({
      where: { id },
      data,
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
      },
    });

    return UserResponseDTO.parse(user);
  }

  async deleteUser(id) {
    await prisma.user.delete({ where: { id } });
    return { message: "User deleted" };
  }
}

export default new UserService();
