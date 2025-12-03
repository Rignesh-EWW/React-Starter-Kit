import { Link } from "react-router-dom";
import { LayoutDashboard, Settings, UsersRound } from "lucide-react";
import { cn } from "../../lib/utils";

interface SidebarProps {
  currentPath: string;
}

const links = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/users", label: "Users", icon: UsersRound },
  { href: "/settings", label: "Settings", icon: Settings },
];

export default function Sidebar({ currentPath }: SidebarProps) {
  return (
    <aside className="hidden min-h-screen w-64 border-r bg-white/80 px-4 py-6 shadow-sm md:block">
      <div className="mb-8 px-2 text-left">
        <p className="text-sm font-semibold text-muted-foreground">ShadCN Admin</p>
        <h1 className="text-2xl font-bold">Control Center</h1>
      </div>
      <nav className="space-y-1">
        {links.map(({ href, label, icon: Icon }) => {
          const active = currentPath === href;
          return (
            <Link
              key={href}
              to={href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition hover:bg-primary/10",
                active ? "bg-primary/10 text-primary" : "text-muted-foreground"
              )}
            >
              <Icon className="h-4 w-4" />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
