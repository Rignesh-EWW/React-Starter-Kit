import * as React from "react"
import { cn } from "@/lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline' | 'success' | 'warning'
}

function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-100 text-gray-700 hover:bg-gray-200",
    destructive: "bg-red-100 text-red-700 hover:bg-red-200",
    outline: "border border-gray-300 text-gray-700",
    success: "bg-emerald-100 text-emerald-700 hover:bg-emerald-200",
    warning: "bg-amber-100 text-amber-700 hover:bg-amber-200",
  }

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors",
        variants[variant],
        className
      )}
      {...props}
    />
  )
}

export { Badge }
