// src/pages/students/EditStudent.js
// Página para editar un estudiante usando componentes reutilizables

import { useParams, useNavigate, Link } from 'react-router-dom';
import { useStudentDetail } from '../../hooks/useStudentDetail';
import StudentForm from '../../components/students/StudentForm';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorMessage from '../../components/common/ErrorMessage';
import '../../styles/students/StudentForm.css';

function EditStudent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { student, loading, error, updating, updateStudent } = useStudentDetail(id);

  const handleSubmit = async (formData) => {
    try {
      await updateStudent(formData);
      navigate(`/students/${id}`);
    } catch (err) {
      // El error ya se maneja en el hook
      console.error('Error updating student:', err);
    }
  };

  if (loading) {
    return <LoadingSpinner message="Cargando estudiante..." />;
  }

  if (error && !student) {
    return (
      <div className="edit-student-container">
        <ErrorMessage message={error} />
        <Link to="/students" className="btn-back">← Volver a la lista</Link>
      </div>
    );
  }

  return (
    <div className="edit-student-container">
      <div className="form-header">
        <Link to="/students" className="btn-back">← Volver</Link>
        <h2>Editar Estudiante</h2>
      </div>

      {error && <ErrorMessage message={error} />}

      <StudentForm
        initialData={student}
        onSubmit={handleSubmit}
        submitButtonText="Guardar Cambios"
        loading={updating}
      />
    </div>
  );
}

export default EditStudent;
