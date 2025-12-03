# ShadCN Admin Panel

A React + Vite admin panel built with ShadCN-inspired components. It includes secure login, dashboard metrics, user management CRUD, and settings for version control, feature toggles, and policy editing with a rich text editor.

## Features

- **Login** with validation (demo credentials: `admin@example.com` / `admin123`).
- **Dashboard** showing user counts, system health, release info, and recent activity.
- **User management** with create, edit, delete, search, filter, pagination, and status/role tracking.
- **Settings** for force update controls, version matrix, feature toggles, and editable Privacy Policy & Terms via a rich text editor.
- **Responsive layout** using sidebar navigation and ShadCN-styled components.

## Getting started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Run the dev server:

   ```bash
   npm run dev
   ```

3. Build for production:

   ```bash
   npm run build
   ```

## Tech stack

- React 18 + Vite + TypeScript
- React Router for routing
- Tailwind CSS for styling
- ShadCN-inspired UI primitives built with Tailwind + CVA (no Radix dependency)
- React Hook Form + Zod for validation
- React Quill for rich text editing

## Notes

All data and authentication are mocked on the client for demonstration purposes. Replace the providers in `src/context` with real API integrations for production use.
