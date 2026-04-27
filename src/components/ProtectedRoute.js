// src/components/ProtectedRoute.js
// Componente para proteger rutas que necesitan autenticación

import { Navigate } from 'react-router-dom';
import authService from '../services/authService';

function ProtectedRoute({ component: Component }) {
  // Verificar si el usuario está autenticado
  const isAuthenticated = authService.isAuthenticated();

  // Si no está autenticado, redirigir a login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Si está autenticado, mostrar el componente
  return Component ? <Component /> : null;
}

export default ProtectedRoute;
