import { db } from "../src/config/firebase.js";
import products from "../src/data/products.js";
import admin from "firebase-admin";

const seedProducts = async () => {
  try {
    console.log("Migrando productos...");

    const snapshot = await db.collection("products").get();
    const batch = db.batch();

    snapshot.forEach((doc) => {
      batch.delete(doc.ref);
    });


    products.forEach((product, index) => {
      const docRef = db.collection("products").doc(product.id);

      batch.set(docRef, {
        order: index + 1,
        name: product.name,
        description: product.description,
        imageUrl: product.imageUrl,
        category: product.category,
        presentations: product.presentations,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });
    });

    await batch.commit();

    console.log("Productos migrados correctamente");
  } catch (error) {
    console.error("Error migrando productos:", error);
    process.exit(1);
  }
};

seedProducts();