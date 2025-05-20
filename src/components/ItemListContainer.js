import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BsArrowUp, BsArrowDown } from 'react-icons/bs';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import 'bootstrap/dist/css/bootstrap.min.css';

const ItemListContainer = () => {
  const [products, setProducts] = useState([]);
  const [sortType, setSortType] = useState('default');
  const location = useLocation();

  // Función para obtener la categoría desde la URL
  const getCategoryFromPath = (path) => {
    if (path.includes('/cubos')) return 'cubos';
    if (path.includes('/modificaciones')) return 'modificaciones';
    if (path.includes('/lubricantes')) return 'lubricantes';
    if (path.includes('/puzzles')) return 'puzzles';
    return null;
  };

  // useEffect para cargar los productos al montar el componente
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const category = getCategoryFromPath(location.pathname);
        const productsRef = collection(db, 'productos');
        const q = category ? query(productsRef, where('category', '==', category)) : productsRef;

        const snapshot = await getDocs(q);
        let fetchedProducts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        // Ordenamos los productos según el tipo de precio
        if (sortType === 'asc') {
          fetchedProducts.sort((a, b) => a.price - b.price);
        } else if (sortType === 'desc') {
          fetchedProducts.sort((a, b) => b.price - a.price);
        }

        setProducts(fetchedProducts);
      } catch (error) {
        console.error('Error al obtener productos de Firestore:', error);
      }
    };

    fetchProducts();
  }, [location.pathname, sortType]);

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Lista de productos</h2>
      <div className="d-flex justify-content-center mb-3">
        <button onClick={() => setSortType('asc')} className="btn btn-outline-info me-2">
          Precio menor <BsArrowDown />
        </button>
        <button onClick={() => setSortType('desc')} className="btn btn-outline-info">
          Precio mayor <BsArrowUp />
        </button>
      </div>
      <div className="row">
        {products.map((product) => (
          <div key={product.id} className="col-md-4 mb-4">
            <div className="card h-100 text-center">
              <img
                src={`${process.env.PUBLIC_URL}/${product.image}`}
                className="card-img-top"
                alt={product.name}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.shortDescription}</p>
                <p className="card-text fw-bold">${product.price}</p>
                <Link
                  to={`/product/${product.id}`}
                  className="btn btn-outline-info btn-sm mt-auto"
              >
                  Detalles
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemListContainer;