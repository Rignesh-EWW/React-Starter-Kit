import { useParams, Link, useNavigate } from 'react-router-dom'
import { 
  ArrowLeft, 
  Mail, 
  Calendar, 
  Clock, 
  Shield, 
  Pencil,
  Trash2,
  User
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { useData } from '@/contexts/DataContext'
import { useToast } from '@/hooks/use-toast'
import { cn } from '@/lib/utils'

export function UserViewPage() {
  const { id } = useParams<{ id: string }>()
  const { getUser, deleteUser } = useData()
  const { toast } = useToast()
  const navigate = useNavigate()

  const user = getUser(id || '')

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <User className="h-16 w-16 text-gray-400" />
        <h2 className="text-xl font-semibold text-gray-900">User not found</h2>
        <p className="text-gray-500">The user you're looking for doesn't exist.</p>
        <Button asChild className="bg-blue-600 hover:bg-blue-700">
          <Link to="/users">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Users
          </Link>
        </Button>
      </div>
    )
  }

  const handleDelete = () => {
    deleteUser(user.id)
    toast({
      title: 'User deleted',
      description: 'The user has been successfully deleted.',
      variant: 'success'
    })
    navigate('/users')
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-violet-500'
      case 'moderator':
        return 'bg-blue-500'
      default:
        return 'bg-emerald-500'
    }
  }

  const getStatusVariant = (status: string): "success" | "secondary" | "destructive" => {
    switch (status) {
      case 'active':
        return 'success'
      case 'inactive':
        return 'secondary'
      case 'suspended':
        return 'destructive'
      default:
        return 'secondary'
    }
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link to="/users">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-display font-bold text-gray-900">User Details</h1>
          <p className="text-gray-500 mt-1">View and manage user information</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Info Card */}
        <Card className="bg-white border border-gray-200 shadow-sm lg:col-span-2">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <Avatar className={cn(
                  "h-20 w-20 ring-4 ring-offset-2 ring-offset-white",
                  user.status === 'active' ? 'ring-emerald-200' : 'ring-gray-200'
                )}>
                  <AvatarFallback className={cn(
                    "text-white text-2xl font-display font-bold",
                    getRoleColor(user.role)
                  )}>
                    {user.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-2xl font-display text-gray-900">{user.name}</CardTitle>
                  <CardDescription className="flex items-center gap-2 mt-1">
                    <Mail className="h-4 w-4" />
                    {user.email}
                  </CardDescription>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" asChild>
                  <Link to={`/users/${user.id}/edit`}>
                    <Pencil className="h-4 w-4 mr-2" />
                    Edit
                  </Link>
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="sm" className="bg-red-600 hover:bg-red-700">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="bg-white">
                    <AlertDialogHeader>
                      <AlertDialogTitle className="text-gray-900">Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete {user.name}'s
                        account and remove their data from the system.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleDelete}
                        className="bg-red-600 text-white hover:bg-red-700"
                      >
                        Delete User
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <Separator />
            
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Role</p>
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-blue-600" />
                    <span className="capitalize font-medium text-gray-900">{user.role}</span>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Status</p>
                  <Badge variant={getStatusVariant(user.status)} className="capitalize">
                    {user.status}
                  </Badge>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Account Created</p>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-900">{user.createdAt}</span>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Last Login</p>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-900">{user.lastLogin || 'Never'}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions Card */}
        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle className="font-display text-gray-900">Quick Actions</CardTitle>
            <CardDescription>Manage this user</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link to={`/users/${user.id}/edit`}>
                <Pencil className="h-4 w-4 mr-2" />
                Edit User Details
              </Link>
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => {
                toast({
                  title: 'Password reset email sent',
                  description: `A password reset link has been sent to ${user.email}`,
                  variant: 'success'
                })
              }}
            >
              <Mail className="h-4 w-4 mr-2" />
              Send Password Reset
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => {
                toast({
                  title: user.status === 'active' ? 'User suspended' : 'User activated',
                  description: `${user.name} has been ${user.status === 'active' ? 'suspended' : 'activated'}`,
                })
              }}
            >
              <Shield className="h-4 w-4 mr-2" />
              {user.status === 'active' ? 'Suspend User' : 'Activate User'}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
