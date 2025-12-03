import { Badge } from "../components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { useData } from "../context/DataContext";
import { ActivityItem } from "../types";
import { BarChart3, ShieldCheck, UsersRound } from "lucide-react";

function Activity({ item }: { item: ActivityItem }) {
  const label =
    item.category === "security" ? "Security" : item.category === "system" ? "System" : "User";
  const badge =
    item.category === "security"
      ? "warning"
      : item.category === "system"
        ? "secondary"
        : "success";
  return (
    <div className="flex items-start justify-between rounded-lg border p-3">
      <div>
        <p className="font-medium">{item.title}</p>
        <p className="text-xs text-muted-foreground">{new Date(item.timestamp).toLocaleString()}</p>
      </div>
      <Badge variant={badge as never}>{label}</Badge>
    </div>
  );
}

export default function DashboardPage() {
  const { users, activities, settings } = useData();

  const activeUsers = users.filter((u) => u.status === "active").length;
  const pendingInvites = users.filter((u) => u.status === "invited").length;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm text-muted-foreground">Welcome back</p>
          <h2 className="text-2xl font-bold">Dashboard overview</h2>
        </div>
        <Badge variant="secondary">Latest version: {settings.latestVersion}</Badge>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex-row items-center justify-between">
            <div>
              <CardTitle>Total users</CardTitle>
              <CardDescription>Administrators and collaborators</CardDescription>
            </div>
            <UsersRound className="h-8 w-8 text-primary" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{users.length}</p>
            <p className="text-sm text-muted-foreground">{activeUsers} active accounts</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex-row items-center justify-between">
            <div>
              <CardTitle>System health</CardTitle>
              <CardDescription>Realtime guardrails</CardDescription>
            </div>
            <ShieldCheck className="h-8 w-8 text-green-600" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">Operational</p>
            <p className="text-sm text-muted-foreground">Force update {settings.forceUpdate ? "enabled" : "off"}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex-row items-center justify-between">
            <div>
              <CardTitle>Workload</CardTitle>
              <CardDescription>Invites and reviews pending</CardDescription>
            </div>
            <BarChart3 className="h-8 w-8 text-amber-600" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{pendingInvites}</p>
            <p className="text-sm text-muted-foreground">Invites awaiting activation</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent activity</CardTitle>
            <CardDescription>Audit friendly timeline of critical changes</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {activities.slice(0, 5).map((item) => (
              <Activity key={item.id} item={item} />
            ))}
            {activities.length === 0 && (
              <p className="text-sm text-muted-foreground">No events recorded yet.</p>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Release channel</CardTitle>
            <CardDescription>Version and rollout controls</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Minimum supported</span>
              <span className="font-semibold">{settings.minSupportedVersion}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Force update</span>
              <Badge variant={settings.forceUpdate ? "warning" : "outline"}>
                {settings.forceUpdate ? "Required" : "Disabled"}
              </Badge>
            </div>
            <div>
              <p className="text-muted-foreground">Deprecated versions</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {settings.deprecatedVersions.map((v) => (
                  <Badge key={v} variant="outline">
                    {v}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
