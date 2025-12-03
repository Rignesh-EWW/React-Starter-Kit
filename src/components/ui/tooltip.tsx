import * as React from "react"
import { cn } from "@/lib/utils"

interface TooltipProviderProps {
  children: React.ReactNode
}

function TooltipProvider({ children }: TooltipProviderProps) {
  return <>{children}</>
}

interface TooltipProps {
  children: React.ReactNode
}

function Tooltip({ children }: TooltipProps) {
  return <div className="relative inline-block">{children}</div>
}

function TooltipTrigger({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

interface TooltipContentProps extends React.HTMLAttributes<HTMLDivElement> {
  sideOffset?: number
}

const TooltipContent = React.forwardRef<HTMLDivElement, TooltipContentProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "z-50 overflow-hidden rounded-md border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-900 shadow-md",
        className
      )}
      {...props}
    />
  )
)
TooltipContent.displayName = "TooltipContent"

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
