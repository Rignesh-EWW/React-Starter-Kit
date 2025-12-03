import { NavLink, useLocation } from 'react-router-dom'
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  Shield, 
  Smartphone,
  ChevronLeft,
  LogOut,
  Menu
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { useAuth } from '@/contexts/AuthContext'
import { useState } from 'react'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Users', href: '/users', icon: Users },
]

const settingsNavigation = [
  { name: 'Privacy Policy', href: '/settings/privacy', icon: Shield },
  { name: 'Terms & Conditions', href: '/settings/terms', icon: FileText },
  { name: 'App Settings', href: '/settings/app', icon: Smartphone },
]

export function Sidebar() {
  const location = useLocation()
  const { user, logout } = useAuth()
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const SidebarContent = () => (
    <>
      {/* Logo */}
      <div className="flex items-center justify-between px-4 h-16 border-b border-gray-200">
        <div className={cn("flex items-center gap-3", collapsed && "justify-center w-full")}>
          <div className="h-9 w-9 rounded-lg bg-blue-600 flex items-center justify-center shadow-md">
            <span className="text-white font-bold text-lg font-display">A</span>
          </div>
          {!collapsed && (
            <span className="font-display font-semibold text-lg text-gray-900">AdminPanel</span>
          )}
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setCollapsed(!collapsed)}
          className={cn("hidden lg:flex text-gray-500 hover:text-gray-700", collapsed && "absolute -right-3 top-6 bg-white border shadow-md rounded-full h-6 w-6")}
        >
          <ChevronLeft className={cn("h-4 w-4 transition-transform", collapsed && "rotate-180")} />
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <div className={cn("text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3", collapsed ? "text-center" : "px-3")}>
          {collapsed ? "•" : "Main"}
        </div>
        
        {navigation.map((item) => {
          const isActive = location.pathname === item.href || location.pathname.startsWith(item.href + '/')
          return (
            <NavLink
              key={item.name}
              to={item.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                isActive 
                  ? "bg-blue-600 text-white shadow-md" 
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
                collapsed && "justify-center px-2"
              )}
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              {!collapsed && <span>{item.name}</span>}
            </NavLink>
          )
        })}

        <div className="pt-6">
          <div className={cn("text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3", collapsed ? "text-center" : "px-3")}>
            {collapsed ? "•" : "Settings"}
          </div>
          
          {settingsNavigation.map((item) => {
            const isActive = location.pathname === item.href
            return (
              <NavLink
                key={item.name}
                to={item.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                  isActive 
                    ? "bg-blue-600 text-white shadow-md" 
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
                  collapsed && "justify-center px-2"
                )}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                {!collapsed && <span>{item.name}</span>}
              </NavLink>
            )
          })}
        </div>
      </nav>

      {/* User section */}
      <div className="p-3 border-t border-gray-200">
        <div className={cn(
          "flex items-center gap-3 p-3 rounded-lg bg-gray-50",
          collapsed && "flex-col p-2"
        )}>
          <Avatar className="h-9 w-9 ring-2 ring-blue-100">
            <AvatarFallback className="bg-blue-600 text-white font-semibold">
              {user?.name?.charAt(0) || 'A'}
            </AvatarFallback>
          </Avatar>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{user?.name}</p>
              <p className="text-xs text-gray-500 truncate">{user?.email}</p>
            </div>
          )}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={logout}
            className="h-8 w-8 text-gray-400 hover:text-red-500"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </>
  )

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 lg:hidden bg-white shadow-md"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        <Menu className="h-5 w-5" />
      </Button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-72 bg-white flex flex-col border-r border-gray-200 transition-transform duration-300 lg:hidden",
        mobileOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <SidebarContent />
      </aside>

      {/* Desktop sidebar */}
      <aside className={cn(
        "hidden lg:flex fixed inset-y-0 left-0 z-40 flex-col bg-white border-r border-gray-200 transition-all duration-300",
        collapsed ? "w-[72px]" : "w-72"
      )}>
        <SidebarContent />
      </aside>
    </>
  )
}
