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
  firstName: user.firstName,
  lastName: user.lastName,
  email: user.email,
  phone: user.phone,
  role: user.role,
  department: user.department,
  location: user.location,
});

export const registerService = async ({
  firstName,
  lastName,
  email,
  password,
  phone,
  department,
  location,
}) => {
  if (!firstName || !lastName || !email || !password || !phone || !department || !location) {
    throw new Error("Todos los campos son obligatorios");
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

  const trimmedFirstName = firstName.trim();
  const trimmedLastName = lastName.trim();

  const user = await UserModel.create({
    firstName: trimmedFirstName,
    lastName: trimmedLastName,
    name: `${trimmedFirstName} ${trimmedLastName}`,
    email: email.trim().toLowerCase(),
    passwordHash,
    role: "customer",
    phone: phone.trim(),
    department: department.trim(),
    location: location.trim(),
    createdAt: new Date().toISOString(),
  });

  return {
    token: signToken(user),
    user: toPublicUser(user),
  };
};

export const getMeService = async (email) => {
  const user = await UserModel.getByEmail(email);

  if (!user) {
    throw new Error("Usuario no encontrado");
  }

  return toPublicUser(user);
};

export const updateMeService = async (
  email,
  { firstName, lastName, phone, department, location }
) => {
  if (!firstName || !lastName || !phone || !department || !location) {
    throw new Error("Todos los campos son obligatorios");
  }

  const existingUser = await UserModel.getByEmail(email);

  if (!existingUser) {
    throw new Error("Usuario no encontrado");
  }

  const trimmedFirstName = firstName.trim();
  const trimmedLastName = lastName.trim();

  const updatedUser = await UserModel.update(email, {
    firstName: trimmedFirstName,
    lastName: trimmedLastName,
    name: `${trimmedFirstName} ${trimmedLastName}`,
    phone: phone.trim(),
    department: department.trim(),
    location: location.trim(),
  });

  return {
    token: signToken(updatedUser),
    user: toPublicUser(updatedUser),
  };
};

export const changePasswordService = async (
  email,
  { currentPassword, newPassword }
) => {
  if (!currentPassword || !newPassword) {
    throw new Error("Ingresá la contraseña actual y la nueva");
  }

  if (newPassword.length < PASSWORD_MIN_LENGTH) {
    throw new Error(
      `La nueva contraseña debe tener al menos ${PASSWORD_MIN_LENGTH} caracteres`
    );
  }

  const user = await UserModel.getByEmail(email);

  if (!user) {
    throw new Error("Usuario no encontrado");
  }

  const isValidPassword = await bcrypt.compare(currentPassword, user.passwordHash);

  if (!isValidPassword) {
    throw new Error("La contraseña actual es incorrecta");
  }

  const passwordHash = await bcrypt.hash(newPassword, 10);

  await UserModel.update(email, { passwordHash });
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
