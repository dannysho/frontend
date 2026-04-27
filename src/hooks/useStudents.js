// src/hooks/useStudents.js
// Custom hook para manejar operaciones de estudiantes

import { useState, useEffect } from 'react';
import studentService from '../services/studentService';

export const useStudents = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Cargar todos los estudiantes
  const loadStudents = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await studentService.getAllStudents();
      setStudents(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Crear estudiante
  const createStudent = async (studentData) => {
    setError(null);
    try {
      await studentService.createStudent(studentData);
      await loadStudents(); // Recargar lista
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  // Actualizar estudiante
  const updateStudent = async (id, studentData) => {
    setError(null);
    try {
      await studentService.updateStudent(id, studentData);
      await loadStudents(); // Recargar lista
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  // Eliminar estudiante
  const deleteStudent = async (id) => {
    setError(null);
    try {
      await studentService.deleteStudent(id);
      setStudents(students.filter(s => s.id !== id));
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  // Obtener estudiante por ID
  const getStudent = async (id) => {
    setError(null);
    try {
      const student = await studentService.getStudentById(id);
      return { success: true, data: student };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  // Cargar estudiantes al montar
  useEffect(() => {
    loadStudents();
  }, []);

  return {
    students,
    loading,
    error,
    loadStudents,
    createStudent,
    updateStudent,
    deleteStudent,
    getStudent,
  };
};