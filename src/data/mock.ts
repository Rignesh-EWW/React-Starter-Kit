import { ActivityItem, AppSettings, User } from "../types";

export const mockUsers: User[] = [
  {
    id: "1",
    name: "Alex Rivera",
    email: "alex.rivera@example.com",
    role: "admin",
    status: "active",
    createdAt: "2024-11-10",
    lastActive: "2025-12-01",
  },
  {
    id: "2",
    name: "Priya Singh",
    email: "priya.singh@example.com",
    role: "manager",
    status: "active",
    createdAt: "2025-01-04",
    lastActive: "2025-11-30",
  },
  {
    id: "3",
    name: "Samir Chen",
    email: "samir.chen@example.com",
    role: "support",
    status: "invited",
    createdAt: "2025-10-02",
    lastActive: "2025-11-28",
  },
  {
    id: "4",
    name: "Taylor Brooks",
    email: "taylor.brooks@example.com",
    role: "viewer",
    status: "suspended",
    createdAt: "2025-09-15",
    lastActive: "2025-10-30",
  },
];

export const mockActivities: ActivityItem[] = [
  {
    id: "a1",
    title: "New admin added: Priya Singh",
    timestamp: "2025-12-01T10:00:00Z",
    category: "user",
  },
  {
    id: "a2",
    title: "Force update enabled for 2.4.0",
    timestamp: "2025-11-28T08:30:00Z",
    category: "system",
  },
  {
    id: "a3",
    title: "Suspicious login blocked",
    timestamp: "2025-11-25T14:45:00Z",
    category: "security",
  },
];

export const defaultSettings: AppSettings = {
  forceUpdate: true,
  latestVersion: "2.4.0",
  minSupportedVersion: "2.2.0",
  deprecatedVersions: ["2.0.0"],
  featureToggles: {
    "beta-dashboard": false,
    "alerts-center": true,
    "usage-insights": true,
  },
  privacyPolicy:
    "<h2>Privacy Policy</h2><p>We only collect data to keep your account secure and improve the app.</p>",
  terms:
    "<h2>Terms & Conditions</h2><p>By using this platform you agree to follow organizational policies.</p>",
};
