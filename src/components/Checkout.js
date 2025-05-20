import React, { useState } from 'react';
import { useCart } from './CartContext';
import { Link } from 'react-router-dom';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore'; // Para agregar documentos a Firestore

function Checkout() {
  const { cart, clearCart } = useCart(); // Obtener el carrito desde el context

  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    celular: '',
    calle: '',
    numero: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [orderId, setOrderId] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrorMsg('');
  };

  const validateInputs = () => {
    const { nombre, email, celular, calle, numero } = formData;

    if (!/^[a-zA-Z\s]+$/.test(nombre)) {
      return 'El nombre solo debe contener letras';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return 'Ingrese un correo electrónico válido';
    }
    if (celular.length < 9 || celular.length > 10 || !/^\d+$/.test(celular)) {
      return 'El número de celular debe tener entre 9 y 10 dígitos';
    }
    if (!/^[a-zA-Z\s]+$/.test(calle)) {
      return 'La calle solo debe contener letras';
    }
    if (!/^\d+$/.test(numero)) {
      return 'El número de casa solo debe contener números';
    }

    return '';
  };

  const handleBuy = async () => {
    const error = validateInputs();
    if (error) {
      setErrorMsg(error);
    } else {
      setIsProcessing(true);
      try {
        // Crear un objeto de orden
        const order = {
          customer: formData,
          products: cart,
          totalAmount: cart.reduce((total, item) => total + item.price * item.quantity, 0),
          status: 'processing',  // O cualquier otro estado que desees
          date: new Date()
        };

        // Agregar la orden a Firestore
        const docRef = await addDoc(collection(db, 'orders'), order);
        
        // Setear el ID de la orden y finalizar
        setOrderId(docRef.id);
        setSubmitted(true);
        clearCart();  // Vaciar carrito después de la compra
      } catch (error) {
        setErrorMsg('Hubo un error al procesar tu compra, por favor intenta de nuevo.');
      } finally {
        setIsProcessing(false);
      }
    }
  };

  return (
    <div className="container">
      <main className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
        <div className="messages text-center">
          {errorMsg && (
            <div className="error">
              <h4 className="bg-danger text-white">{errorMsg}</h4>
            </div>
          )}
          {submitted && (
            <div className="success">
              <h4 className="bg-success text-white">
                Compra realizada con éxito. ID de orden: {orderId}
              </h4>
            </div>
          )}
          {isProcessing && (
            <div className="success">
              <h4 className="bg-info text-white">Estamos preparando su orden...</h4>
            </div>
          )}
        </div>
        {!isProcessing && !submitted && (
          <form className="needs-validation" onSubmit={(e) => e.preventDefault()}>
            <div className="row g-3">
              {['nombre', 'email', 'celular', 'calle', 'numero'].map((field, index) => (
                <div className="col-12" key={index}>
                  <label htmlFor={field} className="form-label">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                  <input
                    onChange={handleChange}
                    value={formData[field]}
                    type={field === 'email' ? 'email' : 'text'}
                    className="form-control input"
                    id={field}
                    name={field}
                    placeholder={`Ingrese su ${field}`}
                    required
                  />
                </div>
              ))}
            </div>
            <hr className="my-4" />
            <div className="d-flex justify-content-center">
              <button onClick={handleBuy} className="btn btn-primary btn-lg mt-5" type="button">Finalizar compra</button>
            </div>
          </form>
        )}
        {submitted && (
          <div className="text-center mt-4">
            <Link to="/" className="btn btn-primary btn-lg">Volver al inicio</Link>
          </div>
        )}
      </main>
    </div>
  );
}

export default Checkout;
