import bcrypt from "bcryptjs";

import { db } from "../src/config/firebase.js";

const ADMIN_EMAIL = "admin@nuts.com";
const ADMIN_PASSWORD = "NutsAdmin01*";
const ADMIN_NAME = "Marina Blanco";

const seedAdmin = async () => {
  try {
    console.log("Migrando usuario admin...");

    const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 10);

    await db.collection("users").doc(ADMIN_EMAIL).set({
      name: ADMIN_NAME,
      email: ADMIN_EMAIL,
      passwordHash,
      role: "admin",
      createdAt: new Date().toISOString(),
    });

    console.log("Usuario admin migrado correctamente");
    process.exit(0);
  } catch (error) {
    console.error("Error migrando usuario admin:", error);
    process.exit(1);
  }
};

seedAdmin();
