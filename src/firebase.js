// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDpQBivE7dgfYN9_JFx3LXnIe7LcBHmGhU",
  authDomain: "rubik-store-2d7f9.firebaseapp.com",
  projectId: "rubik-store-2d7f9",
  storageBucket: "rubik-store-2d7f9.firebasestorage.app",
  messagingSenderId: "360310325713",
  appId: "1:360310325713:web:2cda9ff31d33a2643ea0f0"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Función para obtener productos desde Firestore
const fetchProducts = async () => {
  const querySnapshot = await getDocs(collection(db, "productos"));
  const productosList = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return productosList;
};

// 👉 Exportá tanto fetchProducts como db
export { fetchProducts, db };