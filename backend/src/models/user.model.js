import { db } from "../config/firebase.js";

const usersCollection = db.collection("users");

const normalizeEmail = (email) => email.trim().toLowerCase();

export const toPublicUser = (user) => ({
  id: user.id,
  name: user.name,
  firstName: user.firstName,
  lastName: user.lastName,
  email: user.email,
  phone: user.phone,
  role: user.role,
  department: user.department,
  location: user.location,
  createdAt: user.createdAt,
});

export const getAll = async () => {
  const snapshot = await usersCollection.get();

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

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

export const update = async (email, data) => {
  const id = normalizeEmail(email);
  const docRef = usersCollection.doc(id);

  await docRef.update(data);

  const updatedDoc = await docRef.get();

  return {
    id: updatedDoc.id,
    ...updatedDoc.data(),
  };
};

export const remove = async (email) => {
  const id = normalizeEmail(email);
  const docRef = usersCollection.doc(id);

  const doc = await docRef.get();

  if (!doc.exists) return null;

  const deletedUser = {
    id: doc.id,
    ...doc.data(),
  };

  await docRef.delete();

  return deletedUser;
};
