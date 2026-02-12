import { User } from "../types/user.types.js";

const users: User[] = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
];

export const getAllUsers = async (): Promise<User[]> => {
  return users;
};

export const createUser = async (name: string): Promise<User> => {
  if (!name) {
    throw new Error("Name is required");
  }

  const newUser: User = {
    id: users.length + 1,
    name,
  };

  users.push(newUser);
  return newUser;
};
