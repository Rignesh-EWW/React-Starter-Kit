import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from '@/contexts/AuthContext'
import { DataProvider } from '@/contexts/DataContext'
import { MainLayout } from '@/components/layout/MainLayout'
import { TooltipProvider } from '@/components/ui/tooltip'
import {
  LoginPage,
  DashboardPage,
  UsersListPage,
  UserViewPage,
  UserCreatePage,
  UserEditPage,
  PrivacyPolicyPage,
  TermsConditionsPage,
  AppSettingsPage,
} from '@/pages'

// Protected Route component
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 rounded-xl bg-blue-600 flex items-center justify-center shadow-xl animate-pulse">
            <span className="text-white font-bold text-xl font-display">A</span>
          </div>
          <p className="text-gray-500 animate-pulse">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}

// Public Route - redirects to dashboard if already authenticated
function PublicRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 rounded-xl bg-blue-600 flex items-center justify-center shadow-xl animate-pulse">
            <span className="text-white font-bold text-xl font-display">A</span>
          </div>
          <p className="text-gray-500 animate-pulse">Loading...</p>
        </div>
      </div>
    )
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  return <>{children}</>
}

function AppRoutes() {
  return (
    <Routes>
      {/* Public routes */}
      <Route
        path="/login"
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        }
      />

      {/* Protected routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<DashboardPage />} />
        
        {/* User Management */}
        <Route path="users" element={<UsersListPage />} />
        <Route path="users/create" element={<UserCreatePage />} />
        <Route path="users/:id" element={<UserViewPage />} />
        <Route path="users/:id/edit" element={<UserEditPage />} />
        
        {/* Settings */}
        <Route path="settings/privacy" element={<PrivacyPolicyPage />} />
        <Route path="settings/terms" element={<TermsConditionsPage />} />
        <Route path="settings/app" element={<AppSettingsPage />} />
      </Route>

      {/* Catch all - redirect to dashboard */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  )
}

function App() {
  return (
    <BrowserRouter>
      <TooltipProvider>
        <AuthProvider>
          <DataProvider>
            <AppRoutes />
          </DataProvider>
        </AuthProvider>
      </TooltipProvider>
    </BrowserRouter>
  )
}

export default App
