// src/routes/index.js
// Configuración centralizada de todas las rutas de la app

import { createBrowserRouter, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import StudentsList from '../pages/students/StudentsList';
import StudentDetail from '../pages/students/StudentDetail';
import CreateStudent from '../pages/students/CreateStudent';
import EditStudent from '../pages/students/EditStudent';
import CoursesList from '../pages/courses/CoursesList';
import ProtectedRoute from '../components/ProtectedRoute';

// Router configuration
const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
    element: <ProtectedRoute component={Dashboard} />,
    children: [
      {
        path: '/',
        element: <Navigate to="/students" replace />,
      },
      {
        path: 'students',
        element: <StudentsList />,
      },
      {
        path: 'students/:id',
        element: <StudentDetail />,
      },
      {
        path: 'students/create',
        element: <CreateStudent />,
      },
      {
        path: 'students/:id/edit',
        element: <EditStudent />,
      },
      {
        path: 'courses',
        element: <CoursesList />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/students" replace />,
  },
]);

export default router;
