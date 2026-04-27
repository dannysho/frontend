// src/services/api.js
// Configuración base de la API

const API_URL = 'http://localhost:5000/api';

// Función auxiliar para hacer peticiones
const fetchAPI = async (endpoint, options = {}) => {
  try {
    // Obtener el token del localStorage
    const token = localStorage.getItem('token');

    // Configurar headers con el token si existe
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export default fetchAPI;
