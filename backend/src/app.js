import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import productsRoutes from "./routes/products.routes.js";
import authRoutes from "./routes/auth.routes.js";

import { notFoundHandler } from "./middlewares/error.middleware.js";

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/api/products", productsRoutes);
app.use("/auth", authRoutes);

app.use(notFoundHandler);

export default app;