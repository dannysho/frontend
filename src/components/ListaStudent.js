import { useState, useEffect } from 'react';
import '../styles/ListaStudent.css';
import studentService from '../services/studentService';

function ListaStudent() {
  // Estado para almacenar la lista de estudiantes
  const [students, setStudents] = useState([]);
  
  // Estado para controlar si está cargando
  const [loading, setLoading] = useState(true);
  
  // Estado para almacenar errores
  const [error, setError] = useState(null);

  // useEffect se ejecuta cuando el componente se monta
  useEffect(() => {
    // Función asíncrona para obtener estudiantes
    const loadStudents = async () => {
      try {
        // Usar el servicio para obtener estudiantes
        const data = await studentService.getAllStudents();
        
        // Guardar los datos en el estado
        setStudents(data);
        
        // Limpiar cualquier error anterior
        setError(null);
      } catch (err) {
        // Si hay error, guardarlo en el estado
        setError(err.message);
      } finally {
        // Cambiar loading a false (se ejecuta siempre)
        setLoading(false);
      }
    };

    // Ejecutar la función
    loadStudents();
  }, []); // Array vacío: se ejecuta solo una vez al montar

  // Mostrar "Cargando..." mientras se hace el fetch
  if (loading) {
    return <div className="container"><p>Cargando estudiantes...</p></div>;
  }

  // Mostrar error si ocurrió algo
  if (error) {
    return <div className="container"><p className="error">Error: {error}</p></div>;
  }

  // Mostrar la tabla con los estudiantes
  return (
    <div className="container">
      <h2>Lista de Estudiantes</h2>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>DNI</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Teléfono</th>
          </tr>
        </thead>
        <tbody>
          {/* Mapear sobre el array de estudiantes para crear filas */}
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.dni}</td>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>Total: {students.length} estudiantes</p>
    </div>
  );
}

export default ListaStudent;
