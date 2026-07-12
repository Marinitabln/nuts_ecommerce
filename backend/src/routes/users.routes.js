import { Router } from "express";
import {
  getAllUsers,
  updateUserRole,
  deleteUser,
} from "../controllers/users.controller.js";
import { authMiddleware, requireAdmin } from "../middlewares/auth.middleware.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Gestión de usuarios (solo administradores)
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Obtener todos los usuarios
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Acceso restringido a administradores
 */
router.get("/", authMiddleware, requireAdmin, getAllUsers);

/**
 * @swagger
 * /api/users/{id}/role:
 *   put:
 *     summary: Cambiar el rol de un usuario
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Email del usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [role]
 *             properties:
 *               role:
 *                 type: string
 *                 enum: [admin, customer]
 *     responses:
 *       200:
 *         description: Rol actualizado
 *       400:
 *         description: Datos inválidos o acción bloqueada por resguardos
 *       401:
 *         description: No autorizado
 */
router.put("/:id/role", authMiddleware, requireAdmin, updateUserRole);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Eliminar un usuario
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Email del usuario
 *     responses:
 *       200:
 *         description: Usuario eliminado
 *       400:
 *         description: Acción bloqueada por resguardos
 *       401:
 *         description: No autorizado
 */
router.delete("/:id", authMiddleware, requireAdmin, deleteUser);

export default router;
