export type UserRole = "admin" | "manager" | "support" | "viewer";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: "active" | "invited" | "suspended";
  createdAt: string;
  lastActive: string;
}

export interface ActivityItem {
  id: string;
  title: string;
  timestamp: string;
  category: "user" | "security" | "system";
}

export interface AppSettings {
  forceUpdate: boolean;
  latestVersion: string;
  minSupportedVersion: string;
  deprecatedVersions: string[];
  featureToggles: Record<string, boolean>;
  privacyPolicy: string;
  terms: string;
}
