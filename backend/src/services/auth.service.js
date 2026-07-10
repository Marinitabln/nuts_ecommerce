import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import * as UserModel from "../models/user.model.js";

const PASSWORD_MIN_LENGTH = 8;

const signToken = (user) =>
  jwt.sign(
    {
      userId: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "2h" }
  );

const toPublicUser = (user) => ({
  id: user.id,
  name: user.name,
  email: user.email,
  role: user.role,
});

export const registerService = async ({ name, email, password }) => {
  if (!name || !email || !password) {
    throw new Error("Nombre, email y contraseña son obligatorios");
  }

  if (password.length < PASSWORD_MIN_LENGTH) {
    throw new Error(
      `La contraseña debe tener al menos ${PASSWORD_MIN_LENGTH} caracteres`
    );
  }

  const existingUser = await UserModel.getByEmail(email);

  if (existingUser) {
    throw new Error("Ya existe una cuenta con ese email");
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await UserModel.create({
    name: name.trim(),
    email: email.trim().toLowerCase(),
    passwordHash,
    role: "customer",
    createdAt: new Date().toISOString(),
  });

  return {
    token: signToken(user),
    user: toPublicUser(user),
  };
};

export const loginService = async ({ email, password }) => {
  const user = email && (await UserModel.getByEmail(email));

  if (!user) {
    throw new Error("Credenciales inválidas");
  }

  const isValidPassword = await bcrypt.compare(password, user.passwordHash);

  if (!isValidPassword) {
    throw new Error("Credenciales inválidas");
  }

  return {
    token: signToken(user),
    user: toPublicUser(user),
  };
};
