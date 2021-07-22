import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import LoadingGif from '../images/LoadingGif.gif';
import DrinkGif from '../images/drink1.gif';
import '../styles/loading.css';

export default function Loading() {
  const { path } = useRouteMatch();
  return (
    <div className="loading-container">
      <img src={ path.includes('comidas') ? LoadingGif : DrinkGif } alt="" />
    </div>

  );
}
