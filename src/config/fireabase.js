/** @format */

import { initializeApp } from "firebase/app";
import { useEffect } from "react";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  collection,
  onSnapshot,
  deleteDoc,
  doc,
  addDoc,
} from "firebase/firestore";
import { firebaseConfig } from "./config";
import { useDispatch } from "react-redux";
import { setProduct } from "../redux/productSlice";

const app = initializeApp(firebaseConfig);
getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);

export const productsRef = collection(db, "products");
export const useProductsListener = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    return onSnapshot(productsRef, (snapshot) => {
      const docs = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt,
        };
      });
      dispatch(setProduct(docs));
    });
  }, [dispatch]);
};

export const deleteProduct = (id) => {
  deleteDoc(doc(db, "products", id));
};

export const addProducts = () => {
  addDoc(productsRef, {
    name: "Xiami",
    description: "Çinli mali",
    price: 2002,
    uid: auth.currentUser?.uid,
    createdAt: new Date(Date.now()).toString(),
  });
};
