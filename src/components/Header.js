import React from 'react';

const Header = ({ endGame }) => (
  <header className="navbar">
      <section className="navbar-center text-error">Seconds Left</section>
      <section className="navbar-center">
        <button className="btn btn-default" onClick={endGame}>
          End Game
        </button>
      </section>
  </header>
);

export default Header;
