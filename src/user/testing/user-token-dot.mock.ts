import { User } from "@prisma/client";

export const mockUser: User = {
    id: 1,
    name: "rafael",
    email: "rafael@gmail.com",
    password: "$2b$10$BZHL8TFl2sIWeXcEM0Li6u9uzOlHQ/8vh6Zfv5TesWno/E08b5QeW",
    role: "admin",
    createdAt: new Date(2020),
    updatedAt: new Date(2020)
}; 