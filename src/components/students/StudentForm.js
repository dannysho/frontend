// src/components/students/StudentForm.js
// Componente reutilizable para formularios de estudiantes

import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../../styles/students/StudentForm.css';

const StudentForm = ({ student, onSubmit, isEditing = false }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    dni: '',
    name: '',
    email: '',
    phone: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Cargar datos del estudiante si estamos editando
  useEffect(() => {
    if (student) {
      setFormData({
        dni: student.dni || '',
        name: student.name || '',
        email: student.email || '',
        phone: student.phone || '',
      });
    }
  }, [student]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const result = await onSubmit(formData);
      if (result.success) {
        navigate('/students');
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="student-form-container">
      <div className="form-header">
        <Link to="/students" className="btn-back">← Volver</Link>
        <h2>{isEditing ? 'Editar Estudiante' : 'Crear Nuevo Estudiante'}</h2>
      </div>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit} className="student-form">
        <div className="form-group">
          <label htmlFor="dni">DNI:</label>
          <input
            type="text"
            id="dni"
            name="dni"
            value={formData.dni}
            onChange={handleChange}
            placeholder="12345678"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="name">Nombre Completo:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Juan Pérez"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="juan@email.com"
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Teléfono:</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="123456789"
          />
        </div>

        <button type="submit" disabled={loading} className="btn-submit">
          {loading ? 'Guardando...' : isEditing ? 'Actualizar' : 'Crear'}
        </button>
      </form>
    </div>
  );
};

export default StudentForm;