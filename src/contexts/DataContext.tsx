import React, { createContext, useContext, useState, useCallback } from 'react'
import { User, AppSettings, PolicyContent, DashboardMetrics, ActivityItem } from '@/types'

// Initial mock data
const initialUsers: User[] = [
  { id: '1', name: 'John Smith', email: 'john@example.com', role: 'admin', status: 'active', createdAt: '2024-01-15', lastLogin: '2024-12-01' },
  { id: '2', name: 'Sarah Johnson', email: 'sarah@example.com', role: 'user', status: 'active', createdAt: '2024-02-20', lastLogin: '2024-11-28' },
  { id: '3', name: 'Michael Chen', email: 'michael@example.com', role: 'moderator', status: 'active', createdAt: '2024-03-10', lastLogin: '2024-12-02' },
  { id: '4', name: 'Emily Davis', email: 'emily@example.com', role: 'user', status: 'inactive', createdAt: '2024-04-05', lastLogin: '2024-10-15' },
  { id: '5', name: 'Alex Wilson', email: 'alex@example.com', role: 'user', status: 'suspended', createdAt: '2024-05-12', lastLogin: '2024-09-20' },
  { id: '6', name: 'Jessica Brown', email: 'jessica@example.com', role: 'user', status: 'active', createdAt: '2024-06-18', lastLogin: '2024-12-01' },
  { id: '7', name: 'David Lee', email: 'david@example.com', role: 'moderator', status: 'active', createdAt: '2024-07-22', lastLogin: '2024-11-30' },
  { id: '8', name: 'Amanda Taylor', email: 'amanda@example.com', role: 'user', status: 'active', createdAt: '2024-08-14', lastLogin: '2024-12-02' },
  { id: '9', name: 'Chris Martinez', email: 'chris@example.com', role: 'user', status: 'inactive', createdAt: '2024-09-03', lastLogin: '2024-08-25' },
  { id: '10', name: 'Laura Anderson', email: 'laura@example.com', role: 'user', status: 'active', createdAt: '2024-10-08', lastLogin: '2024-12-01' },
]

const initialSettings: AppSettings = {
  forceUpdate: false,
  currentVersion: '2.5.0',
  minSupportedVersion: '2.0.0',
  deprecatedVersions: ['1.0.0', '1.5.0', '1.8.0'],
  maintenanceMode: false,
  features: {
    darkMode: true,
    notifications: true,
    analytics: true,
    betaFeatures: false,
  }
}

const initialPolicies: PolicyContent = {
  privacyPolicy: `<h1>Privacy Policy</h1>
<p>Last updated: December 2024</p>

<h2>1. Information We Collect</h2>
<p>We collect information you provide directly to us, such as when you create an account, make a purchase, or contact us for support.</p>

<h2>2. How We Use Your Information</h2>
<p>We use the information we collect to provide, maintain, and improve our services, process transactions, and communicate with you.</p>

<h2>3. Information Sharing</h2>
<p>We do not sell, trade, or otherwise transfer your personal information to outside parties without your consent.</p>

<h2>4. Data Security</h2>
<p>We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>

<h2>5. Contact Us</h2>
<p>If you have any questions about this Privacy Policy, please contact us at privacy@example.com.</p>`,
  termsAndConditions: `<h1>Terms and Conditions</h1>
<p>Last updated: December 2024</p>

<h2>1. Acceptance of Terms</h2>
<p>By accessing and using this service, you accept and agree to be bound by the terms and provisions of this agreement.</p>

<h2>2. Use License</h2>
<p>Permission is granted to temporarily use this service for personal, non-commercial purposes only.</p>

<h2>3. User Responsibilities</h2>
<p>Users are responsible for maintaining the confidentiality of their account information and for all activities that occur under their account.</p>

<h2>4. Limitations</h2>
<p>We shall not be liable for any damages arising from the use or inability to use our services.</p>

<h2>5. Modifications</h2>
<p>We reserve the right to modify these terms at any time. Continued use of the service constitutes acceptance of the modified terms.</p>

<h2>6. Governing Law</h2>
<p>These terms shall be governed by and construed in accordance with applicable laws.</p>`,
  lastUpdated: '2024-12-01'
}

const initialActivity: ActivityItem[] = [
  { id: '1', action: 'New user registered', user: 'John Smith', timestamp: '2 minutes ago', type: 'user' },
  { id: '2', action: 'Settings updated', user: 'Admin', timestamp: '15 minutes ago', type: 'settings' },
  { id: '3', action: 'User role changed', user: 'Sarah Johnson', timestamp: '1 hour ago', type: 'user' },
  { id: '4', action: 'System backup completed', user: 'System', timestamp: '3 hours ago', type: 'system' },
  { id: '5', action: 'New version deployed', user: 'Admin', timestamp: '1 day ago', type: 'system' },
]

interface DataContextType {
  // Users
  users: User[]
  getUser: (id: string) => User | undefined
  createUser: (user: Omit<User, 'id' | 'createdAt'>) => void
  updateUser: (id: string, user: Partial<User>) => void
  deleteUser: (id: string) => void
  
  // Settings
  appSettings: AppSettings
  updateAppSettings: (settings: Partial<AppSettings>) => void
  
  // Policies
  policies: PolicyContent
  updatePolicies: (policies: Partial<PolicyContent>) => void
  
  // Metrics
  metrics: DashboardMetrics
  
  // Activity
  recentActivity: ActivityItem[]
  addActivity: (activity: Omit<ActivityItem, 'id'>) => void
}

const DataContext = createContext<DataContextType | undefined>(undefined)

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [users, setUsers] = useState<User[]>(initialUsers)
  const [appSettings, setAppSettings] = useState<AppSettings>(initialSettings)
  const [policies, setPolicies] = useState<PolicyContent>(initialPolicies)
  const [recentActivity, setRecentActivity] = useState<ActivityItem[]>(initialActivity)

  const getUser = useCallback((id: string) => {
    return users.find(u => u.id === id)
  }, [users])

  const createUser = useCallback((userData: Omit<User, 'id' | 'createdAt'>) => {
    const newUser: User = {
      ...userData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split('T')[0]
    }
    setUsers(prev => [...prev, newUser])
    addActivity({
      action: `New user created: ${newUser.name}`,
      user: 'Admin',
      timestamp: 'Just now',
      type: 'user'
    })
  }, [])

  const updateUser = useCallback((id: string, userData: Partial<User>) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, ...userData } : u))
    addActivity({
      action: `User updated: ${userData.name || 'Unknown'}`,
      user: 'Admin',
      timestamp: 'Just now',
      type: 'user'
    })
  }, [])

  const deleteUser = useCallback((id: string) => {
    const userToDelete = users.find(u => u.id === id)
    setUsers(prev => prev.filter(u => u.id !== id))
    addActivity({
      action: `User deleted: ${userToDelete?.name || 'Unknown'}`,
      user: 'Admin',
      timestamp: 'Just now',
      type: 'user'
    })
  }, [users])

  const updateAppSettings = useCallback((settings: Partial<AppSettings>) => {
    setAppSettings(prev => ({ ...prev, ...settings }))
    addActivity({
      action: 'App settings updated',
      user: 'Admin',
      timestamp: 'Just now',
      type: 'settings'
    })
  }, [])

  const updatePolicies = useCallback((newPolicies: Partial<PolicyContent>) => {
    setPolicies(prev => ({ 
      ...prev, 
      ...newPolicies,
      lastUpdated: new Date().toISOString().split('T')[0]
    }))
    addActivity({
      action: 'Policies updated',
      user: 'Admin',
      timestamp: 'Just now',
      type: 'settings'
    })
  }, [])

  const addActivity = useCallback((activity: Omit<ActivityItem, 'id'>) => {
    const newActivity: ActivityItem = {
      ...activity,
      id: Date.now().toString()
    }
    setRecentActivity(prev => [newActivity, ...prev.slice(0, 9)])
  }, [])

  const metrics: DashboardMetrics = {
    totalUsers: users.length,
    activeUsers: users.filter(u => u.status === 'active').length,
    newUsersThisMonth: users.filter(u => {
      const createdDate = new Date(u.createdAt)
      const now = new Date()
      return createdDate.getMonth() === now.getMonth() && createdDate.getFullYear() === now.getFullYear()
    }).length,
    systemHealth: appSettings.maintenanceMode ? 'warning' : 'healthy',
    recentActivity
  }

  return (
    <DataContext.Provider value={{
      users,
      getUser,
      createUser,
      updateUser,
      deleteUser,
      appSettings,
      updateAppSettings,
      policies,
      updatePolicies,
      metrics,
      recentActivity,
      addActivity
    }}>
      {children}
    </DataContext.Provider>
  )
}

export function useData() {
  const context = useContext(DataContext)
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider')
  }
  return context
}
