// src/pages/Dashboard.js
// Layout principal de la aplicación (con navbar y outlet para las páginas)

import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../styles/Dashboard.css';

function Dashboard() {
  return (
    <div className="dashboard">
      <Navbar />
      <main className="dashboard-content">
        <Outlet />
      </main>
    </div>
  );
}

export default Dashboard;
