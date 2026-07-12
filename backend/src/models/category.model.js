import { db } from "../config/firebase.js";

const categoriesCollection = db.collection("categories");

export const getAll = async () => {
  const snapshot = await categoriesCollection.orderBy("name").get();

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const getById = async (id) => {
  const doc = await categoriesCollection.doc(id).get();

  if (!doc.exists) return null;

  return {
    id: doc.id,
    ...doc.data(),
  };
};

export const create = async (category) => {
  const docRef = categoriesCollection.doc(category.id);

  await docRef.set(category);

  return category;
};

export const update = async (id, data) => {
  const docRef = categoriesCollection.doc(id);

  await docRef.update(data);

  const updatedDoc = await docRef.get();

  return {
    id: updatedDoc.id,
    ...updatedDoc.data(),
  };
};

export const remove = async (id) => {
  const docRef = categoriesCollection.doc(id);

  const doc = await docRef.get();

  if (!doc.exists) return null;

  const deletedCategory = {
    id: doc.id,
    ...doc.data(),
  };

  await docRef.delete();

  return deletedCategory;
};
