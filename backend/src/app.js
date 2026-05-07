import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import productsRoutes from "./routes/products.routes.js";
import authRoutes from "./routes/auth.routes.js";

import { notFoundHandler } from "./middlewares/error.middleware.js";

import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./docs/swagger.js";

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/products", productsRoutes);
app.use("/api/auth", authRoutes);

app.use(notFoundHandler);

export default app;