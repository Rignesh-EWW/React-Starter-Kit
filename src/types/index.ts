export interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'user' | 'moderator'
  status: 'active' | 'inactive' | 'suspended'
  avatar?: string
  createdAt: string
  lastLogin?: string
}

export interface AppSettings {
  forceUpdate: boolean
  currentVersion: string
  minSupportedVersion: string
  deprecatedVersions: string[]
  maintenanceMode: boolean
  features: {
    [key: string]: boolean
  }
}

export interface PolicyContent {
  privacyPolicy: string
  termsAndConditions: string
  lastUpdated: string
}

export interface DashboardMetrics {
  totalUsers: number
  activeUsers: number
  newUsersThisMonth: number
  systemHealth: 'healthy' | 'warning' | 'critical'
  recentActivity: ActivityItem[]
}

export interface ActivityItem {
  id: string
  action: string
  user: string
  timestamp: string
  type: 'user' | 'system' | 'settings'
}
