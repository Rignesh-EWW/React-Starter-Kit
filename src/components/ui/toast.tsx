import * as React from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

export interface ToastProps {
  id?: string
  title?: React.ReactNode
  description?: React.ReactNode
  variant?: 'default' | 'destructive' | 'success'
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

const Toast = React.forwardRef<HTMLDivElement, ToastProps & React.HTMLAttributes<HTMLDivElement>>(
  ({ className, variant = 'default', title, description, onOpenChange, ...props }, ref) => {
    const variants = {
      default: "border bg-white text-gray-900",
      destructive: "border-red-200 bg-red-50 text-red-600",
      success: "border-emerald-200 bg-emerald-50 text-emerald-700",
    }

    return (
      <div
        ref={ref}
        className={cn(
          "pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-4 shadow-lg transition-all",
          variants[variant],
          className
        )}
        {...props}
      >
        <div className="grid gap-1">
          {title && <div className="text-sm font-semibold">{title}</div>}
          {description && <div className="text-sm opacity-90">{description}</div>}
        </div>
        {onOpenChange && (
          <button
            onClick={() => onOpenChange(false)}
            className="rounded-md p-1 text-gray-400 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    )
  }
)
Toast.displayName = "Toast"

const ToastViewport = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "fixed bottom-0 right-0 z-[100] flex max-h-screen w-full flex-col p-4 sm:max-w-[420px]",
        className
      )}
      {...props}
    />
  )
)
ToastViewport.displayName = "ToastViewport"

export { Toast, ToastViewport }
