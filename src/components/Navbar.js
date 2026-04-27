// src/components/Navbar.js
// Barra de navegación usando hook de autenticación

import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import '../styles/Navbar.css';

function Navbar() {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          📚 Sistema Estudiantes
        </Link>

        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/students" className="nav-link">
              Estudiantes
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/courses" className="nav-link">
              Cursos
            </Link>
          </li>
        </ul>

        <button onClick={handleLogout} className="btn-logout">
          Cerrar Sesión
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
