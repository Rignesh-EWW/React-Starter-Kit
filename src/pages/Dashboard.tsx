import { 
  Users, 
  UserCheck, 
  UserPlus, 
  Activity,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Settings,
  Smartphone,
  Clock
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useData } from '@/contexts/DataContext'
import { useAuth } from '@/contexts/AuthContext'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'

export function DashboardPage() {
  const { metrics, appSettings, recentActivity } = useData()
  const { user } = useAuth()

  const stats = [
    {
      title: 'Total Users',
      value: metrics.totalUsers,
      change: '+12%',
      trend: 'up',
      icon: Users,
      color: 'bg-blue-500',
      lightColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    {
      title: 'Active Users',
      value: metrics.activeUsers,
      change: '+5%',
      trend: 'up',
      icon: UserCheck,
      color: 'bg-emerald-500',
      lightColor: 'bg-emerald-50',
      textColor: 'text-emerald-600'
    },
    {
      title: 'New This Month',
      value: metrics.newUsersThisMonth,
      change: '-8%',
      trend: 'down',
      icon: UserPlus,
      color: 'bg-violet-500',
      lightColor: 'bg-violet-50',
      textColor: 'text-violet-600'
    },
    {
      title: 'System Health',
      value: metrics.systemHealth === 'healthy' ? '100%' : metrics.systemHealth === 'warning' ? '85%' : '60%',
      status: metrics.systemHealth,
      icon: Activity,
      color: metrics.systemHealth === 'healthy' 
        ? 'bg-emerald-500' 
        : metrics.systemHealth === 'warning' 
          ? 'bg-amber-500' 
          : 'bg-red-500',
      lightColor: metrics.systemHealth === 'healthy' ? 'bg-emerald-50' : 'bg-amber-50',
      textColor: metrics.systemHealth === 'healthy' ? 'text-emerald-600' : 'text-amber-600'
    },
  ]

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 mt-1">
            Welcome back, {user?.name}! Here's what's happening today.
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" asChild>
            <Link to="/settings/app">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Link>
          </Button>
          <Button asChild className="bg-blue-600 hover:bg-blue-700">
            <Link to="/users">
              <Users className="h-4 w-4 mr-2" />
              Manage Users
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card 
            key={stat.title} 
            className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className={cn("p-3 rounded-xl", stat.lightColor)}>
                  <stat.icon className={cn("h-5 w-5", stat.textColor)} />
                </div>
                {stat.trend && (
                  <div className={cn(
                    "flex items-center gap-1 text-sm font-medium",
                    stat.trend === 'up' ? 'text-emerald-600' : 'text-red-500'
                  )}>
                    {stat.trend === 'up' ? (
                      <ArrowUpRight className="h-4 w-4" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4" />
                    )}
                    {stat.change}
                  </div>
                )}
                {stat.status && (
                  <Badge 
                    variant={stat.status === 'healthy' ? 'success' : stat.status === 'warning' ? 'warning' : 'destructive'}
                  >
                    {stat.status}
                  </Badge>
                )}
              </div>
              <div className="mt-4">
                <p className="text-3xl font-display font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-500 mt-1">{stat.title}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Activity */}
        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="font-display text-gray-900">Recent Activity</CardTitle>
                <CardDescription>Latest actions in the system</CardDescription>
              </div>
              <Clock className="h-5 w-5 text-gray-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.slice(0, 5).map((activity, index) => (
                <div 
                  key={activity.id} 
                  className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors animate-slide-in-left"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className={cn(
                    "p-2 rounded-lg",
                    activity.type === 'user' && 'bg-blue-50 text-blue-600',
                    activity.type === 'system' && 'bg-emerald-50 text-emerald-600',
                    activity.type === 'settings' && 'bg-violet-50 text-violet-600'
                  )}>
                    {activity.type === 'user' && <Users className="h-4 w-4" />}
                    {activity.type === 'system' && <Activity className="h-4 w-4" />}
                    {activity.type === 'settings' && <Settings className="h-4 w-4" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{activity.action}</p>
                    <p className="text-xs text-gray-500">
                      by {activity.user} · {activity.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats / App Info */}
        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="font-display text-gray-900">App Status</CardTitle>
                <CardDescription>Current app configuration</CardDescription>
              </div>
              <Smartphone className="h-5 w-5 text-gray-400" />
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-blue-50 border border-blue-100">
                <p className="text-sm text-gray-600 mb-1">Current Version</p>
                <p className="text-xl font-display font-bold text-blue-600">{appSettings.currentVersion}</p>
              </div>
              <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
                <p className="text-sm text-gray-600 mb-1">Min Supported</p>
                <p className="text-xl font-display font-bold text-gray-900">{appSettings.minSupportedVersion}</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 border border-gray-100">
                <span className="text-sm font-medium text-gray-700">Force Update</span>
                <Badge variant={appSettings.forceUpdate ? 'default' : 'secondary'}>
                  {appSettings.forceUpdate ? 'Enabled' : 'Disabled'}
                </Badge>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 border border-gray-100">
                <span className="text-sm font-medium text-gray-700">Maintenance Mode</span>
                <Badge variant={appSettings.maintenanceMode ? 'warning' : 'success'}>
                  {appSettings.maintenanceMode ? 'Active' : 'Inactive'}
                </Badge>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 border border-gray-100">
                <span className="text-sm font-medium text-gray-700">Deprecated Versions</span>
                <span className="text-sm text-gray-500">{appSettings.deprecatedVersions.length} versions</span>
              </div>
            </div>

            <Button variant="outline" className="w-full" asChild>
              <Link to="/settings/app">
                <TrendingUp className="h-4 w-4 mr-2" />
                View App Settings
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
