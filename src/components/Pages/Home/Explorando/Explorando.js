import React from 'react';
import './Explorando.css';

const Explorando = () => (
  <>
    <h3 className='title-container'>Explorando Juegos de Estrategia</h3>
    <section className='sectionBody'>
      <div className='containerHomeInspiration'>
        <div className='cardHomeInspiration'>
          <div className='image'>
            <img src='img/home.gif' alt='Cubo Rubik 3x3' />
          </div>
          <div className='content'>
            <h3>Cubo Rubik 3x3</h3>
            <p>¡Explora el clásico cubo de Rubik 3x3 para desafiar tu mente y mejorar tus habilidades de resolución de problemas!</p>
          </div>
        </div>
      </div>
      <div className='containerHomeInspiration'>
        <div className='cardHomeInspiration'>
          <div className='image'>
            <img src='img/ajedrez2.jpg' alt='Ajedrez' />
          </div>
          <div className='content'>
            <h3>Ajedrez</h3>
            <p>Descubre nuestro juego de ajedrez con piezas de diseño único y tablero de alta calidad.</p>
          </div>
        </div>
      </div>
      <div className='containerHomeInspiration'>
        <div className='cardHomeInspiration'>
          <div className='image'>
            <img src='img/agregar.jpg' alt='Rompe Cabezas' />
          </div>
          <div className='content'>
            <h3>Rompe Cabezas</h3>
            <p>Desafía tu mente con nuestros rompecabezas, perfectos para desarrollar la lógica y la concentración.</p>
          </div>
        </div>
      </div>
    </section>
  </>
);

export default Explorando;