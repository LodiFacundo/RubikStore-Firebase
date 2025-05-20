import React from 'react';
import './Contacto.css';

const Contacto = () => (
  <section className='container'>
    <h1 className='text-center mt-4 mb-4'>Contacto</h1>
    <div className="card mb-3">
      <div className="row g-0">
        <div className="col-md-4">
          <img src="img/contacto.jpg" className="img-fluid rounded-start" alt="Contacto" />
        </div>
        <div className="col-4">
          <div className="card-body card-body-text position-absolute top-0 start-50">
            <h5 className="card-title">Rubik Store</h5>
            <p className="card-text">Envíanos un mail a:</p>
            <p className="card-text">RubikStore@gmail.com</p>
            <p className="card-text">+54 11 5252-5252 - WhatsApp: +54 11 5252-5252</p>
            <p className="card-text"><small className="text-muted">Lunes a Viernes de 09:00 a 14:00 hs.</small></p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Contacto;