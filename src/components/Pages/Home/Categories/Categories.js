import React from 'react';
import { Link } from 'react-router-dom';
import './Categories.css';

const categories = [
  { to: '/categoria/cubos', imgSrc: 'img/Cubos.jpg', alt: 'Cubos', title: 'Cubos' },
  { to: '/categoria/modificaciones', imgSrc: 'img/Modificaciones.jpg', alt: 'Modificaciones', title: 'Modificaciones' },
  { to: '/categoria/lubricantes', imgSrc: 'img/Lubricantes.jpg', alt: 'Lubricantes', title: 'Lubricantes' },
  { to: '/categoria/puzzles', imgSrc: 'img/Puzzles.jpg', alt: 'Puzzles', title: 'Puzzles' },
  { imgSrc: 'img/Proximamente.jpg', title: 'Próximamente', disabled: true },
];

const Categories = () => (
  <div>
    <h2 className="title-container">Categorías</h2>
    <div className="row mt-5 cardCenter">
      {categories.map(({ to, imgSrc, alt, title, disabled }, index) => (
        <div className="cardStyle" key={index}>
          <img src={imgSrc} className="card-img-top" alt={alt} />
          <h5 className="text-center mt-3">{title}</h5>
          {disabled ? (
            <button className="btn btn-secondary mt-3" disabled>Proximamente</button>
          ) : (
            <Link to={to}>
              <button className="btn btn-secondary mt-3">Ver más</button>
            </Link>
          )}
        </div>
      ))}
    </div>
  </div>
);

export default Categories;