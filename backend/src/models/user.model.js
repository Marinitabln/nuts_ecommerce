import { db } from "../config/firebase.js";

const usersCollection = db.collection("users");

const normalizeEmail = (email) => email.trim().toLowerCase();

export const getByEmail = async (email) => {
  const doc = await usersCollection.doc(normalizeEmail(email)).get();

  if (!doc.exists) return null;

  return {
    id: doc.id,
    ...doc.data(),
  };
};

export const create = async (user) => {
  const id = normalizeEmail(user.email);
  const docRef = usersCollection.doc(id);

  await docRef.set(user);

  return {
    id,
    ...user,
  };
};
