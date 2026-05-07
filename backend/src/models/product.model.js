import { db } from "../config/firebase.js";

const productsCollection = db.collection("products");

export const getAll = async () => {
  const snapshot = await productsCollection.get();

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const getById = async (id) => {
  const doc = await productsCollection.doc(id).get();

  if (!doc.exists) return null;

  return {
    id: doc.id,
    ...doc.data(),
  };
};

export const create = async (product) => {
  const docRef = await productsCollection.add(product);

  return {
    id: docRef.id,
    ...product,
  };
};

export const update = async (id, data) => {
  const docRef = productsCollection.doc(id);

  await docRef.update(data);

  const updatedDoc = await docRef.get();

  return {
    id: updatedDoc.id,
    ...updatedDoc.data(),
  };
};

export const remove = async (id) => {
  const docRef = productsCollection.doc(id);

  const doc = await docRef.get();

  if (!doc.exists) return null;

  const deletedProduct = {
    id: doc.id,
    ...doc.data(),
  };

  await docRef.delete();

  return deletedProduct;
};