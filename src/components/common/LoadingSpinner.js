// src/components/common/LoadingSpinner.js
// Componente reutilizable para mostrar carga

import '../../styles/common/LoadingSpinner.css';

const LoadingSpinner = ({ message = 'Cargando...' }) => (
  <div className="loading-spinner">
    <div className="spinner"></div>
    <p>{message}</p>
  </div>
);

export default LoadingSpinner;