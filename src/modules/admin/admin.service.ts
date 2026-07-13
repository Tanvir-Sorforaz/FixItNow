import { Prisma } from "@prisma/client";
import prisma from "../../lib/prisma.js";
import type { UserStatusInput } from "./admin.interface.js";


const getUsers = async () => {
  return prisma.user.findMany({
    include: { technicianProfile: true },
    orderBy: { createdAt: "desc" },
  });
};

const updateUserStatus = async (id: string, input: UserStatusInput) => {
  const user = await prisma.user.findUnique({ where: { id } });

  if (!user) {
    throw new AppError(404, "User not found");
  }

  return prisma.user.update({
    where: { id },
    data: { status: input.status },
  });
};

const getBookings = async () => {
 
};

const getCategories = async () => {
};

const createCategory = async () => {
};

export default { getUsers, updateUserStatus, getBookings, getCategories, createCategory };
