import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../CartContext';
import './NavBar.css';

const NavBar = () => {
  const { cart } = useCart();
  const cartItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const location = useLocation();

  const getNavLinkClass = (path) => location.pathname === path ? 'nav-link active' : 'nav-link';

  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container">
        <Link to="/" className="navbar-brand">
          <img src={`${process.env.PUBLIC_URL}/img/logo.gif`} alt="Logo" height="60" />
          Rubik Store
        </Link>
        <div className="navbar-nav mx-auto">
          <Link to="/" className={getNavLinkClass('/')}>Inicio</Link>
          <Link to="/categoria/cubos" className={getNavLinkClass('/categoria/cubos')}>Cubos</Link>
          <Link to="/categoria/modificaciones" className={getNavLinkClass('/categoria/modificaciones')}>Modificaciones</Link>
          <Link to="/categoria/puzzles" className={getNavLinkClass('/categoria/puzzles')}>Puzzles</Link>
          <Link to="/categoria/lubricantes" className={getNavLinkClass('/categoria/lubricantes')}>Lubricantes</Link>
        </div>
        <div className="navbar-nav ms-auto">
          <Link to="/carrito" className="nav-link position-relative">
            <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-cart text-dark" viewBox="0 0 16 16">
              <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
            </svg>
            {cartItemsCount > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill">
                {cartItemsCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;