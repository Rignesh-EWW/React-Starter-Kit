import { ReactNode, createContext, useContext, useMemo, useState } from "react";
import { mockActivities, mockUsers, defaultSettings } from "../data/mock";
import { ActivityItem, AppSettings, User } from "../types";

interface DataContextProps {
  users: User[];
  activities: ActivityItem[];
  settings: AppSettings;
  createUser: (payload: Omit<User, "id" | "createdAt" | "lastActive">) => User;
  updateUser: (id: string, payload: Partial<User>) => void;
  deleteUser: (id: string) => void;
  updateSettings: (payload: Partial<AppSettings>) => void;
}

const DataContext = createContext<DataContextProps | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [activities, setActivities] = useState<ActivityItem[]>(mockActivities);
  const [settings, setSettings] = useState<AppSettings>(defaultSettings);

  const createUser = (
    payload: Omit<User, "id" | "createdAt" | "lastActive">
  ): User => {
    const now = new Date();
    const newUser: User = {
      ...payload,
      id: crypto.randomUUID(),
      createdAt: now.toISOString().slice(0, 10),
      lastActive: now.toISOString().slice(0, 10),
    };
    setUsers((prev) => [newUser, ...prev]);
    setActivities((prev) => [
      { id: crypto.randomUUID(), title: `New user created: ${newUser.name}` , timestamp: new Date().toISOString(), category: "user" },
      ...prev,
    ]);
    return newUser;
  };

  const updateUser = (id: string, payload: Partial<User>) => {
    setUsers((prev) => prev.map((user) => (user.id === id ? { ...user, ...payload } : user)));
  };

  const deleteUser = (id: string) => {
    setUsers((prev) => prev.filter((user) => user.id !== id));
    setActivities((prev) => [
      { id: crypto.randomUUID(), title: `User deleted: ${id}`, timestamp: new Date().toISOString(), category: "user" },
      ...prev,
    ]);
  };

  const updateSettings = (payload: Partial<AppSettings>) => {
    setSettings((prev) => ({ ...prev, ...payload }));
    setActivities((prev) => [
      {
        id: crypto.randomUUID(),
        title: "Settings updated",
        timestamp: new Date().toISOString(),
        category: "system",
      },
      ...prev,
    ]);
  };

  const value = useMemo(
    () => ({ users, activities, settings, createUser, updateUser, deleteUser, updateSettings }),
    [users, activities, settings]
  );

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within DataProvider");
  }
  return context;
}
