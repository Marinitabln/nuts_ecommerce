import { Router } from "express";
import {
  login,
  register,
  getMe,
  updateMe,
  changePassword,
} from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Autenticación de usuarios
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login de usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: Token generado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *       401:
 *         description: Credenciales inválidas
 */

router.post("/login", login);

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Registro de un nuevo cliente
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [firstName, lastName, email, password, phone, department, location]
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               phone:
 *                 type: string
 *               department:
 *                 type: string
 *                 description: Departamento de Mendoza
 *               location:
 *                 type: string
 *                 description: Localidad dentro del departamento
 *     responses:
 *       201:
 *         description: Cuenta creada
 *       400:
 *         description: Datos inválidos o email ya registrado
 */

router.post("/register", register);

/**
 * @swagger
 * /api/auth/me:
 *   get:
 *     summary: Obtener el perfil del usuario autenticado
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Perfil del usuario
 *       401:
 *         description: No autorizado
 */
router.get("/me", authMiddleware, getMe);

/**
 * @swagger
 * /api/auth/me:
 *   put:
 *     summary: Actualizar el perfil del usuario autenticado (no incluye email)
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [firstName, lastName, phone, department, location]
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               phone:
 *                 type: string
 *               department:
 *                 type: string
 *               location:
 *                 type: string
 *     responses:
 *       200:
 *         description: Perfil actualizado
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: No autorizado
 */
router.put("/me", authMiddleware, updateMe);

/**
 * @swagger
 * /api/auth/me/password:
 *   put:
 *     summary: Cambiar la contraseña del usuario autenticado
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [currentPassword, newPassword]
 *             properties:
 *               currentPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Contraseña actualizada
 *       400:
 *         description: Datos inválidos o contraseña actual incorrecta
 *       401:
 *         description: No autorizado
 */
router.put("/me/password", authMiddleware, changePassword);

export default router;