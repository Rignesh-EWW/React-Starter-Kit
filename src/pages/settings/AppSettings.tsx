import { useState } from 'react'
import { 
  Smartphone, 
  Save, 
  Loader2, 
  AlertTriangle,
  Download,
  ToggleLeft,
  Trash2,
  Plus
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useData } from '@/contexts/DataContext'
import { useToast } from '@/hooks/use-toast'
import { cn } from '@/lib/utils'

export function AppSettingsPage() {
  const { appSettings, updateAppSettings } = useData()
  const { toast } = useToast()
  const [settings, setSettings] = useState(appSettings)
  const [isSaving, setIsSaving] = useState(false)
  const [newVersion, setNewVersion] = useState('')

  const handleSave = async () => {
    setIsSaving(true)
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))
    
    updateAppSettings(settings)
    
    toast({
      title: 'Settings saved',
      description: 'App settings have been updated successfully.',
      variant: 'success'
    })
    
    setIsSaving(false)
  }

  const handleAddDeprecatedVersion = () => {
    if (newVersion && !settings.deprecatedVersions.includes(newVersion)) {
      setSettings({
        ...settings,
        deprecatedVersions: [...settings.deprecatedVersions, newVersion]
      })
      setNewVersion('')
    }
  }

  const handleRemoveDeprecatedVersion = (version: string) => {
    setSettings({
      ...settings,
      deprecatedVersions: settings.deprecatedVersions.filter(v => v !== version)
    })
  }

  const handleFeatureToggle = (feature: string, enabled: boolean) => {
    setSettings({
      ...settings,
      features: {
        ...settings.features,
        [feature]: enabled
      }
    })
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-gray-900">App Settings</h1>
          <p className="text-gray-500 mt-1">
            Manage app versioning, updates, and feature toggles
          </p>
        </div>
        <Button onClick={handleSave} disabled={isSaving} className="bg-blue-600 hover:bg-blue-700">
          {isSaving ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </>
          )}
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Version Control */}
        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Smartphone className="h-5 w-5 text-blue-600" />
              <div>
                <CardTitle className="font-display text-gray-900">Version Control</CardTitle>
                <CardDescription>
                  Manage app versions and updates
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="currentVersion" className="text-gray-700">Current Version</Label>
                <Input
                  id="currentVersion"
                  value={settings.currentVersion}
                  onChange={(e) => setSettings({ ...settings, currentVersion: e.target.value })}
                  placeholder="e.g., 2.5.0"
                  className="bg-gray-50 border-gray-200"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="minVersion" className="text-gray-700">Minimum Supported Version</Label>
                <Input
                  id="minVersion"
                  value={settings.minSupportedVersion}
                  onChange={(e) => setSettings({ ...settings, minSupportedVersion: e.target.value })}
                  placeholder="e.g., 2.0.0"
                  className="bg-gray-50 border-gray-200"
                />
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <Label className="text-gray-700">Deprecated Versions</Label>
              <p className="text-sm text-gray-500">
                Users on these versions will see a deprecation warning
              </p>
              
              <div className="flex gap-2">
                <Input
                  value={newVersion}
                  onChange={(e) => setNewVersion(e.target.value)}
                  placeholder="Enter version (e.g., 1.5.0)"
                  onKeyDown={(e) => e.key === 'Enter' && handleAddDeprecatedVersion()}
                  className="bg-gray-50 border-gray-200"
                />
                <Button variant="outline" onClick={handleAddDeprecatedVersion}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex flex-wrap gap-2">
                {settings.deprecatedVersions.map((version) => (
                  <Badge
                    key={version}
                    variant="secondary"
                    className="pl-3 pr-1 py-1.5 flex items-center gap-2"
                  >
                    v{version}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-5 w-5 hover:bg-red-100 hover:text-red-600"
                      onClick={() => handleRemoveDeprecatedVersion(version)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
                {settings.deprecatedVersions.length === 0 && (
                  <p className="text-sm text-gray-400 italic">No deprecated versions</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Force Update & Maintenance */}
        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Download className="h-5 w-5 text-blue-600" />
              <div>
                <CardTitle className="font-display text-gray-900">Update Settings</CardTitle>
                <CardDescription>
                  Control app update behavior
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className={cn(
              "flex items-center justify-between p-4 rounded-lg border",
              settings.forceUpdate ? "border-blue-200 bg-blue-50" : "border-gray-200 bg-gray-50"
            )}>
              <div className="flex items-center gap-3">
                <div className={cn(
                  "p-2 rounded-lg",
                  settings.forceUpdate ? "bg-blue-100 text-blue-600" : "bg-gray-200 text-gray-500"
                )}>
                  <Download className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Force Update</p>
                  <p className="text-sm text-gray-500">
                    Require users to update to the latest version
                  </p>
                </div>
              </div>
              <Switch
                checked={settings.forceUpdate}
                onCheckedChange={(checked) => setSettings({ ...settings, forceUpdate: checked })}
              />
            </div>

            <div className={cn(
              "flex items-center justify-between p-4 rounded-lg border",
              settings.maintenanceMode ? "border-amber-200 bg-amber-50" : "border-gray-200 bg-gray-50"
            )}>
              <div className="flex items-center gap-3">
                <div className={cn(
                  "p-2 rounded-lg",
                  settings.maintenanceMode ? "bg-amber-100 text-amber-600" : "bg-gray-200 text-gray-500"
                )}>
                  <AlertTriangle className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Maintenance Mode</p>
                  <p className="text-sm text-gray-500">
                    Temporarily disable app access for all users
                  </p>
                </div>
              </div>
              <Switch
                checked={settings.maintenanceMode}
                onCheckedChange={(checked) => setSettings({ ...settings, maintenanceMode: checked })}
              />
            </div>

            {settings.maintenanceMode && (
              <div className="p-4 rounded-lg bg-amber-50 border border-amber-200 animate-fade-in">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-amber-700">Maintenance Mode Active</p>
                    <p className="text-sm text-amber-600 mt-1">
                      Users will see a maintenance message when they try to access the app.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Feature Toggles */}
        <Card className="bg-white border border-gray-200 shadow-sm lg:col-span-2">
          <CardHeader>
            <div className="flex items-center gap-2">
              <ToggleLeft className="h-5 w-5 text-blue-600" />
              <div>
                <CardTitle className="font-display text-gray-900">Feature Toggles</CardTitle>
                <CardDescription>
                  Enable or disable specific features in your application
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {Object.entries(settings.features).map(([feature, enabled]) => (
                <div
                  key={feature}
                  className={cn(
                    "flex items-center justify-between p-4 rounded-lg border transition-all",
                    enabled ? "border-blue-200 bg-blue-50" : "border-gray-200 bg-gray-50"
                  )}
                >
                  <div>
                    <p className="font-medium capitalize text-gray-900">
                      {feature.replace(/([A-Z])/g, ' $1').trim()}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {enabled ? 'Enabled' : 'Disabled'}
                    </p>
                  </div>
                  <Switch
                    checked={enabled}
                    onCheckedChange={(checked) => handleFeatureToggle(feature, checked)}
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
