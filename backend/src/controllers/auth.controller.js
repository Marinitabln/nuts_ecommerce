import {
  loginService,
  registerService,
  getMeService,
  updateMeService,
  changePasswordService,
} from "../services/auth.service.js";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await loginService({ email, password });

    res.json(result);
  } catch (error) {
    res.status(401).json({
      message: error.message,
    });
  }
};

export const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, phone, department, location } = req.body;

    const result = await registerService({
      firstName,
      lastName,
      email,
      password,
      phone,
      department,
      location,
    });

    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await getMeService(req.user.email);
    res.json(user);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

export const updateMe = async (req, res) => {
  try {
    const { firstName, lastName, phone, department, location } = req.body;

    const result = await updateMeService(req.user.email, {
      firstName,
      lastName,
      phone,
      department,
      location,
    });

    res.json(result);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    await changePasswordService(req.user.email, { currentPassword, newPassword });

    res.json({ message: "Contraseña actualizada correctamente" });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
