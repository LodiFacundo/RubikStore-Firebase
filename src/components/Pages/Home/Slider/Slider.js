import React from 'react';
import './Slider.css';

const Slider = () => (
  <div>
    <div className="rubik-message">
      <h2>Bienvenido a RubikStore</h2>
      <p>Descubre nuestra colección de productos Rubik y más!</p>
      <div className="categories-button">
        <a href="#categorias" className="btn btn-primary">Ver Categorías</a>
      </div>
    </div>
    <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src="img/fondo.jpg" className="d-block slider-image" alt="..." />
        </div>
        <div className="carousel-item">
          <img src="img/fondo1.jpg" className="d-block slider-image" alt="..." />
        </div>
        <div className="carousel-item">
          <img src="img/fondo2.jpg" className="d-block slider-image" alt="..." />
        </div>
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
    <div id="categorias"></div>
  </div>
);

export default Slider;