# Admin Panel

A modern, responsive admin panel built with React, TypeScript, and shadcn/ui components. Features a beautiful dark theme with emerald/teal accent colors.

## Features

### 🔐 Authentication
- Secure login page with form validation
- Protected routes with authentication guards
- Session persistence via localStorage

### 📊 Dashboard
- Overview of key metrics and statistics
- Real-time activity feed
- Quick access to app settings and user management
- Beautiful animated cards with gradients

### 👥 User Management
- **Create Users**: Add new users with name, email, role, and status
- **List Users**: Paginated table with search and filter capabilities
- **View Users**: Detailed user profile view
- **Edit Users**: Update user information
- **Delete Users**: Remove users with confirmation dialog

### ⚙️ Settings Module
- **Privacy Policy**: Rich text editor for managing privacy policy
- **Terms & Conditions**: Rich text editor for managing terms
- **App Settings**:
  - Version control (current, minimum supported, deprecated versions)
  - Force update toggle
  - Maintenance mode
  - Feature toggles

## Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **shadcn/ui** components (Radix UI primitives)
- **React Router** for navigation
- **React Hook Form** with Zod validation
- **Tiptap** for rich text editing
- **Lucide React** for icons

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Demo Credentials

```
Email: admin@example.com
Password: admin123
```

## Project Structure

```
src/
├── components/
│   ├── layout/          # Layout components (Sidebar, MainLayout)
│   ├── ui/              # shadcn/ui components
│   └── RichTextEditor.tsx
├── contexts/
│   ├── AuthContext.tsx  # Authentication state
│   └── DataContext.tsx  # App data state
├── hooks/
│   └── use-toast.ts     # Toast notifications
├── lib/
│   └── utils.ts         # Utility functions
├── pages/
│   ├── users/           # User management pages
│   ├── settings/        # Settings pages
│   ├── Dashboard.tsx
│   └── Login.tsx
├── types/
│   └── index.ts         # TypeScript interfaces
├── App.tsx              # Main app with routing
└── main.tsx             # Entry point
```

## Design System

### Color Palette
- **Background**: Deep black (#080808)
- **Primary**: Emerald green (hsl 142 76% 36%)
- **Accent**: Teal/Cyan gradients
- **Cards**: Glass morphism effect with subtle borders

### Typography
- **Display Font**: Clash Display (headings)
- **Body Font**: DM Sans (body text)

### Components
- Consistent rounded corners (0.75rem)
- Subtle animations and transitions
- Glass-morphism card effects
- Gradient accent colors

## Responsive Design

The admin panel is fully responsive:
- **Desktop**: Full sidebar navigation
- **Tablet**: Collapsible sidebar
- **Mobile**: Hamburger menu with slide-out navigation

## Future Improvements

- [ ] Add dark/light theme toggle
- [ ] Implement real API integration
- [ ] Add data export functionality
- [ ] Add user avatar upload
- [ ] Implement email notifications
- [ ] Add audit logs
- [ ] Multi-language support

## License

MIT License
