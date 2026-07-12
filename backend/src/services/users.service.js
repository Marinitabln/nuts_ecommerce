import * as UserModel from "../models/user.model.js";

const VALID_ROLES = ["admin", "customer"];

const normalizeEmail = (email) => email.trim().toLowerCase();

export const getAllUsersService = async () => {
  const users = await UserModel.getAll();
  return users.map(UserModel.toPublicUser);
};

export const updateUserRoleService = async (targetEmail, role, requestingEmail) => {
  if (!VALID_ROLES.includes(role)) {
    throw new Error("Rol inválido");
  }

  if (normalizeEmail(targetEmail) === normalizeEmail(requestingEmail)) {
    throw new Error("No podés cambiar tu propio rol");
  }

  const targetUser = await UserModel.getByEmail(targetEmail);

  if (!targetUser) {
    throw new Error("Usuario no encontrado");
  }

  if (targetUser.role === "admin" && role === "customer") {
    const allUsers = await UserModel.getAll();
    const adminCount = allUsers.filter((user) => user.role === "admin").length;

    if (adminCount <= 1) {
      throw new Error("No podés quitarle el rol al único administrador");
    }
  }

  const updatedUser = await UserModel.update(targetEmail, { role });

  return UserModel.toPublicUser(updatedUser);
};

export const deleteUserService = async (targetEmail, requestingEmail) => {
  if (normalizeEmail(targetEmail) === normalizeEmail(requestingEmail)) {
    throw new Error("No podés eliminar tu propia cuenta");
  }

  const targetUser = await UserModel.getByEmail(targetEmail);

  if (!targetUser) {
    throw new Error("Usuario no encontrado");
  }

  if (targetUser.role === "admin") {
    const allUsers = await UserModel.getAll();
    const adminCount = allUsers.filter((user) => user.role === "admin").length;

    if (adminCount <= 1) {
      throw new Error("No podés eliminar al único administrador");
    }
  }

  const deletedUser = await UserModel.remove(targetEmail);

  return UserModel.toPublicUser(deletedUser);
};
