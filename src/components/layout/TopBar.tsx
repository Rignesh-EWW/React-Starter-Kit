import { useAuth } from "../../context/AuthContext";
import { Button } from "../ui/button";
import { Bell, LogOut, Menu } from "lucide-react";

export default function TopBar() {
  const { userEmail, logout } = useAuth();

  return (
    <header className="flex items-center justify-between border-b bg-white px-4 py-3 shadow-sm">
      <div className="flex items-center gap-3">
        <button className="block rounded-md p-2 hover:bg-muted md:hidden" aria-label="Toggle menu">
          <Menu className="h-5 w-5" />
        </button>
        <div>
          <p className="text-xs uppercase text-muted-foreground">Admin Panel</p>
          <p className="text-lg font-semibold">ShadCN Control</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" aria-label="Alerts">
          <Bell className="h-5 w-5" />
        </Button>
        <div className="hidden text-right md:block">
          <p className="text-sm font-medium">{userEmail}</p>
          <p className="text-xs text-muted-foreground">System Administrator</p>
        </div>
        <Button variant="outline" onClick={logout} className="gap-2">
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
    </header>
  );
}
