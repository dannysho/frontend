// src/components/students/StudentTable.js
// Componente reutilizable para mostrar tabla de estudiantes

import { Link } from 'react-router-dom';
import '../../styles/students/StudentTable.css';

const StudentTable = ({ students, onDelete, showActions = true }) => {
  if (students.length === 0) {
    return <p className="no-data">No hay estudiantes encontrados</p>;
  }

  return (
    <table className="student-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>DNI</th>
          <th>Nombre</th>
          <th>Email</th>
          <th>Teléfono</th>
          {showActions && <th>Acciones</th>}
        </tr>
      </thead>
      <tbody>
        {students.map((student) => (
          <tr key={student.id}>
            <td>{student.id}</td>
            <td>{student.dni}</td>
            <td>
              <Link to={`/students/${student.id}`} className="student-link">
                {student.name}
              </Link>
            </td>
            <td>{student.email || '-'}</td>
            <td>{student.phone || '-'}</td>
            {showActions && (
              <td className="actions">
                <Link to={`/students/${student.id}/edit`} className="btn-edit">
                  Editar
                </Link>
                <button
                  onClick={() => onDelete(student.id)}
                  className="btn-delete"
                >
                  Eliminar
                </button>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default StudentTable;