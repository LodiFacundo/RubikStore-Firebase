import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase';
import { useCart } from '../CartContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // Función para obtener los datos del producto desde Firebase
  const fetchProduct = useCallback(async () => {
    try {
      const q = query(collection(db, 'productos'), where('id', '==', Number(id)));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const productDoc = querySnapshot.docs[0];
        setProduct(productDoc.data());
      }
    } catch (error) {
      console.error('Error al obtener producto:', error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      setLoading(true);
      fetchProduct();
    }
  }, [id, fetchProduct]);

  const handleAddToCart = () => {
    if (product) {
      addToCart({ ...product, quantity: 1 });
    }
  };

  if (loading) {
    return <div className="text-center">Cargando...</div>;
  }

  if (!product) {
    return <div className="text-center">Producto no encontrado</div>;
  }

  return (
    <div className="container mt-4">
      <div className="product-container mt-5">
        <div className="product-image mb-3">
          <img
            src={`${process.env.PUBLIC_URL}/${product.image}`}
            alt={product.name}
            className="img-fluid"
          />
        </div>
        <div className="product-info">
          <h2 className="text-center">{product.name}</h2>
          <p className="mt-3 description">{product.shortDescription}</p>
          <p className="description">{product.longDescription}</p>
          <p>Precio: ${product.price}</p>
          <div className="button-group">
            <button onClick={handleAddToCart} className="custom-btn">
              Agregar al carrito
            </button>
            <Link to="/" className="custom-btn no-underline text-center">
              Volver al inicio
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;