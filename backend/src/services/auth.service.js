import jwt from "jsonwebtoken";

const MOCK_USER = {
  id: "1",
  email: "admin@nuts.com",
  password: "NutsAdmin01*", 
};

export const loginService = ({ email, password }) => {
  if (email !== MOCK_USER.email || password !== MOCK_USER.password) {
    throw new Error("Credenciales inválidas");
  }

  const token = jwt.sign(
    {
      userId: MOCK_USER.id,
      email: MOCK_USER.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: "2h" }
  );

  return {
    token,
  };
};