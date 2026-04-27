// src/services/studentService.js
// Servicio para manejar todas las operaciones de estudiantes

import fetchAPI from './api';

const studentService = {
  // Obtener todos los estudiantes
  getAllStudents: async () => {
    return fetchAPI('/students');
  },

  // Obtener un estudiante por ID
  getStudentById: async (id) => {
    return fetchAPI(`/students/${id}`);
  },

  // Crear un nuevo estudiante
  createStudent: async (studentData) => {
    return fetchAPI('/students', {
      method: 'POST',
      body: JSON.stringify(studentData),
    });
  },

  // Actualizar un estudiante
  updateStudent: async (id, studentData) => {
    return fetchAPI(`/students/${id}`, {
      method: 'PUT',
      body: JSON.stringify(studentData),
    });
  },

  // Eliminar un estudiante
  deleteStudent: async (id) => {
    return fetchAPI(`/students/${id}`, {
      method: 'DELETE',
    });
  },

  // Obtener cursos de un estudiante
  getStudentCourses: async (id) => {
    return fetchAPI(`/students/${id}/courses`);
  },

  // Inscribir estudiante en un curso
  enrollCourse: async (id, courseId) => {
    return fetchAPI(`/students/${id}/courses/${courseId}`, {
      method: 'POST',
    });
  },
};

export default studentService;
