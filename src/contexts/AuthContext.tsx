import React, { createContext, useContext, useState, useCallback } from 'react'

interface AuthUser {
  id: string
  email: string
  name: string
  role: 'admin' | 'superadmin'
}

interface AuthContextType {
  user: AuthUser | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Simulated admin credentials
const ADMIN_CREDENTIALS = {
  email: 'admin@example.com',
  password: 'admin123'
}

// Get initial user from localStorage
function getInitialUser(): AuthUser | null {
  try {
    const storedUser = localStorage.getItem('admin_user')
    if (storedUser) {
      return JSON.parse(storedUser)
    }
  } catch {
    // Ignore parse errors
  }
  return null
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(getInitialUser)
  const [isLoading, setIsLoading] = useState(false)

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
      const adminUser: AuthUser = {
        id: '1',
        email: email,
        name: 'Admin User',
        role: 'superadmin'
      }
      setUser(adminUser)
      localStorage.setItem('admin_user', JSON.stringify(adminUser))
      setIsLoading(false)
      return true
    }
    
    setIsLoading(false)
    return false
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    localStorage.removeItem('admin_user')
  }, [])

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      isLoading,
      login,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
