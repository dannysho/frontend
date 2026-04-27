// src/pages/students/StudentsList.js
// Página de lista de estudiantes usando componentes reutilizables

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStudents } from '../../hooks/useStudents';
import StudentTable from '../../components/students/StudentTable';
import SearchBar from '../../components/common/SearchBar';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorMessage from '../../components/common/ErrorMessage';
import '../../styles/students/StudentsList.css';

function StudentsList() {
  const { students, loading, error, deleteStudent } = useStudents();
  const [searchTerm, setSearchTerm] = useState('');

  // Filtrar estudiantes por búsqueda
  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.dni.includes(searchTerm) ||
    (student.email && student.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Manejar eliminación
  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este estudiante?')) {
      await deleteStudent(id);
    }
  };

  // Manejar búsqueda
  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  if (loading) {
    return <LoadingSpinner message="Cargando estudiantes..." />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div className="students-list-container">
      <div className="students-header">
        <h2>Estudiantes</h2>
        <Link to="/students/create" className="btn-create">
          + Nuevo Estudiante
        </Link>
      </div>

      <SearchBar
        placeholder="Buscar por nombre, DNI o email..."
        onSearch={handleSearch}
      />

      <StudentTable
        students={filteredStudents}
        onDelete={handleDelete}
      />

      <p className="total">Total: {filteredStudents.length} estudiantes</p>
    </div>
  );
}

export default StudentsList;
