// src/pages/students/CreateStudent.js
// Página para crear un nuevo estudiante usando componentes reutilizables

import { useNavigate, Link } from 'react-router-dom';
import { useStudents } from '../../hooks/useStudents';
import StudentForm from '../../components/students/StudentForm';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorMessage from '../../components/common/ErrorMessage';
import '../../styles/students/StudentForm.css';

function CreateStudent() {
  const navigate = useNavigate();
  const { createStudent, loading, error } = useStudents();

  const handleSubmit = async (formData) => {
    try {
      await createStudent(formData);
      navigate('/students');
    } catch (err) {
      // El error ya se maneja en el hook
      console.error('Error creating student:', err);
    }
  };

  if (loading) {
    return <LoadingSpinner message="Creando estudiante..." />;
  }

  return (
    <div className="create-student-container">
      <div className="form-header">
        <Link to="/students" className="btn-back">← Volver</Link>
        <h2>Crear Nuevo Estudiante</h2>
      </div>

      {error && <ErrorMessage message={error} />}

      <StudentForm
        onSubmit={handleSubmit}
        submitButtonText="Crear Estudiante"
        loading={loading}
      />
    </div>
  );
}

export default CreateStudent;
