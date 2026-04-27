// src/hooks/useStudentDetail.js
// Hook personalizado para manejar detalles de un estudiante específico

import { useState, useEffect } from 'react';
import studentService from '../services/studentService';

export function useStudentDetail(id) {
  const [student, setStudent] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const loadStudentDetail = async () => {
      if (!id) return;

      try {
        setLoading(true);
        setError(null);

        const studentData = await studentService.getStudentById(id);
        setStudent(studentData);

        const coursesData = await studentService.getStudentCourses(id);
        setCourses(coursesData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadStudentDetail();
  }, [id]);

  const updateStudent = async (formData) => {
    if (!id) return;

    try {
      setUpdating(true);
      setError(null);

      const updatedStudent = await studentService.updateStudent(id, formData);
      setStudent(updatedStudent);
      return updatedStudent;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setUpdating(false);
    }
  };

  return {
    student,
    courses,
    loading,
    error,
    updating,
    updateStudent
  };
}