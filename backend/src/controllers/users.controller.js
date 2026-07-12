import {
  getAllUsersService,
  updateUserRoleService,
  deleteUserService,
} from "../services/users.service.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await getAllUsersService();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    const user = await updateUserRoleService(id, role, req.user.email);

    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await deleteUserService(id, req.user.email);

    res.json(deleted);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
