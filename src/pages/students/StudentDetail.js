// src/pages/students/StudentDetail.js
// Página de detalle de estudiante usando componentes reutilizables

import { useParams, Link } from 'react-router-dom';
import { useStudentDetail } from '../../hooks/useStudentDetail';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorMessage from '../../components/common/ErrorMessage';
import '../../styles/students/StudentDetail.css';

function StudentDetail() {
  const { id } = useParams();
  const { student, courses, loading, error } = useStudentDetail(id);

  if (loading) {
    return <LoadingSpinner message="Cargando estudiante..." />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (!student) {
    return (
      <div className="student-detail-container">
        <ErrorMessage message="Estudiante no encontrado" />
        <Link to="/students" className="btn-back">← Volver a la lista</Link>
      </div>
    );
  }

  return (
    <div className="student-detail-container">
      <div className="detail-header">
        <Link to="/students" className="btn-back">← Volver</Link>
        <h2>{student.name}</h2>
      </div>

      <div className="detail-box">
        <h3>Información del Estudiante</h3>
        <div className="detail-grid">
          <div><strong>ID:</strong> {student.id}</div>
          <div><strong>DNI:</strong> {student.dni}</div>
          <div><strong>Nombre:</strong> {student.name}</div>
          <div><strong>Email:</strong> {student.email || 'N/A'}</div>
          <div><strong>Teléfono:</strong> {student.phone || 'N/A'}</div>
          <div><strong>Fecha de Registro:</strong> {new Date(student.createdAt).toLocaleDateString()}</div>
        </div>
      </div>

      <div className="detail-box">
        <h3>Cursos Inscritos</h3>
        {courses.length === 0 ? (
          <p>No hay cursos inscritos</p>
        ) : (
          <table className="table-small">
            <thead>
              <tr>
                <th>Curso</th>
                <th>Descripción</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr key={course.id}>
                  <td>{course.name}</td>
                  <td>{course.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default StudentDetail;
