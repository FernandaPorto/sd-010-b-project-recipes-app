import React from 'react';
import HomeAndReturn from '../components/HomeAndReturn';
import '../styles/Credits(page).css';

function Credits() {
  return (
    <div className="credits-container">
      <div className="credits-item">
        <h3>App foi desenvolvido por:</h3>
      </div>
      <div className="credits-item">
        <h4><strong>Abimael Albuquerque</strong></h4>
      </div>
      <div className="credits-item">
        <h4><strong>Anderson Pedrosa</strong></h4>
      </div>
      <div className="credits-item">
        <h4><strong>André Arnoni</strong></h4>
      </div>
      <div className="credits-item">
        <h4><strong>Renan Antunes</strong></h4>
      </div>
      <footer className="credits-footer">
        Copyrigth© 2021 - Todos os direitos reservados
      </footer>
      <HomeAndReturn />
    </div>
  );
}

export default Credits;
