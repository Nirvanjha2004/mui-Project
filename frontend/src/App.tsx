import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'

import SigninPage from './Pages/SigninPage'
import SignupPage from './Pages/SignupPage'
import UserDashboard from './components/UserDashboard/UserDashboard'
import UserProfile from './components/ProfilePage/UserPage'
import AdminDashboard from './components/AdminDashboard/AdminDashboard'
import CreateTest2 from './components/AdminDashboard/CreateTest2'
// Import other admin pages if they exist

// Protected route component
const ProtectedRoute = ({ children, adminOnly = false }: { children: React.ReactNode, adminOnly?: boolean }) => {
  const { isAuthenticated, user, loading } = useAuth();
  
  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }
  
  if (adminOnly && user?.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }
  
  return <>{children}</>;
};

// Create a component to handle root path redirect based on role
const HomeRedirect = () => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }
  
  // Redirect admin to admin dashboard, others to user dashboard
  if (user?.role === 'admin') {
    return <Navigate to="/admin" replace />;
  } else {
    return <Navigate to="/dashboard" replace />;
  }
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/signin" element={<SigninPage />} />
          <Route path="/signup" element={<SignupPage />} />
          
          {/* Protected routes */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <UserDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
            } 
          />
          
          {/* Admin routes */}
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute adminOnly={true}>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/admin/tests" 
            element={
              <ProtectedRoute adminOnly={true}>
                <div>Manage Tests Page</div> {/* Replace with actual component when available */}
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/admin/users" 
            element={
              <ProtectedRoute adminOnly={true}>
                <div>User Management Page</div> {/* Replace with actual component when available */}
              </ProtectedRoute>
            } 
          />
          
          {/* New route for creating tests */}
          <Route 
            path="/admin/tests/create" 
            element={
              <ProtectedRoute adminOnly={true}>
                <CreateTest2 />
              </ProtectedRoute>
            } 
          />
          
          {/* New admin routes */}
          <Route 
            path="/admin/results" 
            element={
              <ProtectedRoute adminOnly={true}>
                <div>Test Results Page</div> {/* Replace with actual component when available */}
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/admin/performance" 
            element={
              <ProtectedRoute adminOnly={true}>
                <div>Performance Analytics Page</div> {/* Replace with actual component when available */}
              </ProtectedRoute>
            } 
          />
          
          {/* Redirect home to appropriate dashboard based on role */}
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <HomeRedirect />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App