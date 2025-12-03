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
          <h1 className="text-3xl font-display font-bold text-gradient">App Settings</h1>
          <p className="text-muted-foreground mt-1">
            Manage app versioning, updates, and feature toggles
          </p>
        </div>
        <Button onClick={handleSave} disabled={isSaving}>
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
        <Card className="glass-card">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Smartphone className="h-5 w-5 text-primary" />
              <div>
                <CardTitle className="font-display">Version Control</CardTitle>
                <CardDescription>
                  Manage app versions and updates
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="currentVersion">Current Version</Label>
                <Input
                  id="currentVersion"
                  value={settings.currentVersion}
                  onChange={(e) => setSettings({ ...settings, currentVersion: e.target.value })}
                  placeholder="e.g., 2.5.0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="minVersion">Minimum Supported Version</Label>
                <Input
                  id="minVersion"
                  value={settings.minSupportedVersion}
                  onChange={(e) => setSettings({ ...settings, minSupportedVersion: e.target.value })}
                  placeholder="e.g., 2.0.0"
                />
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <Label>Deprecated Versions</Label>
              <p className="text-sm text-muted-foreground">
                Users on these versions will see a deprecation warning
              </p>
              
              <div className="flex gap-2">
                <Input
                  value={newVersion}
                  onChange={(e) => setNewVersion(e.target.value)}
                  placeholder="Enter version (e.g., 1.5.0)"
                  onKeyDown={(e) => e.key === 'Enter' && handleAddDeprecatedVersion()}
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
                      className="h-5 w-5 hover:bg-destructive/20 hover:text-destructive"
                      onClick={() => handleRemoveDeprecatedVersion(version)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
                {settings.deprecatedVersions.length === 0 && (
                  <p className="text-sm text-muted-foreground italic">No deprecated versions</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Force Update & Maintenance */}
        <Card className="glass-card">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Download className="h-5 w-5 text-primary" />
              <div>
                <CardTitle className="font-display">Update Settings</CardTitle>
                <CardDescription>
                  Control app update behavior
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className={cn(
              "flex items-center justify-between p-4 rounded-lg border",
              settings.forceUpdate ? "border-primary bg-primary/5" : "border-border"
            )}>
              <div className="flex items-center gap-3">
                <div className={cn(
                  "p-2 rounded-lg",
                  settings.forceUpdate ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                )}>
                  <Download className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">Force Update</p>
                  <p className="text-sm text-muted-foreground">
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
              settings.maintenanceMode ? "border-amber-500 bg-amber-500/5" : "border-border"
            )}>
              <div className="flex items-center gap-3">
                <div className={cn(
                  "p-2 rounded-lg",
                  settings.maintenanceMode ? "bg-amber-500/10 text-amber-400" : "bg-muted text-muted-foreground"
                )}>
                  <AlertTriangle className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">Maintenance Mode</p>
                  <p className="text-sm text-muted-foreground">
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
              <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/30 animate-fade-in">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-amber-400 mt-0.5" />
                  <div>
                    <p className="font-medium text-amber-400">Maintenance Mode Active</p>
                    <p className="text-sm text-amber-400/80 mt-1">
                      Users will see a maintenance message when they try to access the app.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Feature Toggles */}
        <Card className="glass-card lg:col-span-2">
          <CardHeader>
            <div className="flex items-center gap-2">
              <ToggleLeft className="h-5 w-5 text-primary" />
              <div>
                <CardTitle className="font-display">Feature Toggles</CardTitle>
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
                    enabled ? "border-primary/50 bg-primary/5" : "border-border bg-muted/20"
                  )}
                >
                  <div>
                    <p className="font-medium capitalize">
                      {feature.replace(/([A-Z])/g, ' $1').trim()}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
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
