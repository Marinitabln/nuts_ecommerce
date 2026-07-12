import { db } from "../src/config/firebase.js";

const slugify = (value) =>
  value.trim().toLowerCase().replace(/\s+/g, "-");

const seedCategories = async () => {
  try {
    console.log("Migrando categorías...");

    const snapshot = await db.collection("products").get();
    const categoryNames = new Set(
      snapshot.docs.map((doc) => doc.data().category).filter(Boolean)
    );

    const batch = db.batch();

    categoryNames.forEach((name) => {
      const docRef = db.collection("categories").doc(slugify(name));

      batch.set(docRef, {
        name,
        createdAt: new Date().toISOString(),
      });
    });

    await batch.commit();

    console.log(`Categorías migradas: ${[...categoryNames].join(", ")}`);
    process.exit(0);
  } catch (error) {
    console.error("Error migrando categorías:", error);
    process.exit(1);
  }
};

seedCategories();
