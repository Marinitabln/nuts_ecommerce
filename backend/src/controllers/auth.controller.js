import { loginService } from "../services/auth.service.js";

export const login = (req, res) => {
  try {
    const { email, password } = req.body;

    const result = loginService({ email, password });

    res.json(result);
  } catch (error) {
    res.status(401).json({
      message: error.message,
    });
  }
};