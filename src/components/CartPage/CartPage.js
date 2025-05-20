import React from 'react';
import { useCart } from '../CartContext';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CartPage.css';

const CartPage = () => {
  const { cart, increaseQuantity, decreaseQuantity, clearCart, removeItem, totalPrice } = useCart();

  const handleIncreaseQuantity = (productId) => {
    increaseQuantity(productId);
  };

  const handleDecreaseQuantity = (productId) => {
    decreaseQuantity(productId);
  };

  const handleRemoveItem = (productId) => {
    removeItem(productId);
  };

  return (
    <div className="d-flex flex-column align-items-center">
      <h2 className="mb-4">Carrito de Compras</h2>
      <div className="mb-4">
        {cart.length === 0 ? (
          <div className="empty-cart-container">
            <p>El carrito está vacío</p>
            <div className="d-grid gap-2">
              <Link to="/" className="btn btn-info">Volver al inicio</Link>
            </div>
          </div>
        ) : (
          <div>
            <table className="cart-table">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Descripción</th>
                  <th>Precio</th>
                  <th>Cantidad</th>
                  <th>Total</th>
                  <th>Eliminar</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.shortDescription}</td>
                    <td>${item.price}</td>
                    <td>
                      <button onClick={() => handleDecreaseQuantity(item.id)} className="btn btn-outline-secondary me-2" disabled={item.quantity === 1}>-</button>
                      {item.quantity}
                      <button onClick={() => handleIncreaseQuantity(item.id)} className="btn btn-outline-secondary ms-2">+</button>
                    </td>
                    <td>${item.price * item.quantity}</td>
                    <td>
                      <button onClick={() => handleRemoveItem(item.id)} className="btn btn-danger">Eliminar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="d-grid gap-2">
              <p className="text-end fw-bold fs-5">Total del carrito: ${totalPrice()}</p>
              <button onClick={clearCart} className="btn btn-danger">Vaciar carrito</button>
              <Link to="/checkout" className="btn btn-primary">Finalizar compra</Link>
              <Link to="/" className="btn btn-info mt-3">Volver al inicio</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
