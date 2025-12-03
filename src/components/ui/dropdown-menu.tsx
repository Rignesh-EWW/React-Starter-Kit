import * as React from "react"
import { cn } from "@/lib/utils"

interface DropdownMenuContextType {
  open: boolean
  setOpen: (open: boolean) => void
}

const DropdownMenuContext = React.createContext<DropdownMenuContextType | undefined>(undefined)

function DropdownMenu({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false)

  return (
    <DropdownMenuContext.Provider value={{ open, setOpen }}>
      <div className="relative inline-block text-left">
        {children}
      </div>
    </DropdownMenuContext.Provider>
  )
}

function DropdownMenuTrigger({ children, asChild }: { children: React.ReactNode; asChild?: boolean }) {
  const context = React.useContext(DropdownMenuContext)
  if (!context) throw new Error('DropdownMenuTrigger must be used within DropdownMenu')
  
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<any>, {
      onClick: (e: React.MouseEvent) => {
        e.stopPropagation()
        context.setOpen(!context.open)
      },
    })
  }
  
  return (
    <button onClick={() => context.setOpen(!context.open)}>
      {children}
    </button>
  )
}

interface DropdownMenuContentProps {
  children: React.ReactNode
  align?: 'start' | 'end'
  className?: string
}

function DropdownMenuContent({ children, align = 'end', className }: DropdownMenuContentProps) {
  const context = React.useContext(DropdownMenuContext)
  if (!context) throw new Error('DropdownMenuContent must be used within DropdownMenu')
  
  const ref = React.useRef<HTMLDivElement>(null)
  
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        context.setOpen(false)
      }
    }
    
    if (context.open) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [context.open, context])
  
  if (!context.open) return null
  
  return (
    <div
      ref={ref}
      className={cn(
        "absolute z-50 mt-2 min-w-[8rem] rounded-md border border-gray-200 bg-white p-1 shadow-lg animate-in fade-in-0 zoom-in-95",
        align === 'end' ? 'right-0' : 'left-0',
        className
      )}
    >
      {children}
    </div>
  )
}

interface DropdownMenuItemProps extends React.HTMLAttributes<HTMLDivElement> {
  inset?: boolean
}

function DropdownMenuItem({ className, inset, ...props }: DropdownMenuItemProps) {
  const context = React.useContext(DropdownMenuContext)
  
  return (
    <div
      className={cn(
        "relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-gray-100 focus:bg-gray-100",
        inset && "pl-8",
        className
      )}
      onClick={() => context?.setOpen(false)}
      {...props}
    />
  )
}

function DropdownMenuSeparator({ className }: { className?: string }) {
  return <div className={cn("-mx-1 my-1 h-px bg-gray-200", className)} />
}

function DropdownMenuLabel({ className, inset, ...props }: React.HTMLAttributes<HTMLDivElement> & { inset?: boolean }) {
  return (
    <div
      className={cn("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className)}
      {...props}
    />
  )
}

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
}
