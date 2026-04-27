// src/services/authService.js
// Servicio para manejar autenticación con JWT

import fetchAPI from './api';

const authService = {
  // Registrar nuevo usuario
  register: async (userData) => {
    return fetchAPI('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  // Login - devuelve el token
  login: async (credentials) => {
    const response = await fetchAPI('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    
    // Guardar el token en localStorage
    if (response.token) {
      localStorage.setItem('token', response.token);
    }
    
    return response;
  },

  // Obtener el token guardado
  getToken: () => {
    return localStorage.getItem('token');
  },

  // Verificar si el usuario está logueado
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },

  // Logout - eliminar el token
  logout: () => {
    localStorage.removeItem('token');
  },
};

export default authService;
