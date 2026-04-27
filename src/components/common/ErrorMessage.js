// src/components/common/ErrorMessage.js
// Componente reutilizable para mostrar errores

import '../../styles/common/ErrorMessage.css';

const ErrorMessage = ({ message, onRetry }) => (
  <div className="error-message">
    <div className="error-content">
      <span className="error-icon">⚠️</span>
      <span className="error-text">{message}</span>
      {onRetry && (
        <button onClick={onRetry} className="retry-button">
          Reintentar
        </button>
      )}
    </div>
  </div>
);

export default ErrorMessage;