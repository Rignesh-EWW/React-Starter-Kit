import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "./button"

interface AlertDialogContextType {
  open: boolean
  setOpen: (open: boolean) => void
}

const AlertDialogContext = React.createContext<AlertDialogContextType | undefined>(undefined)

interface AlertDialogProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
}

function AlertDialog({ open: controlledOpen, onOpenChange, children }: AlertDialogProps) {
  const [internalOpen, setInternalOpen] = React.useState(false)
  
  const open = controlledOpen !== undefined ? controlledOpen : internalOpen
  
  const setOpen = (newOpen: boolean) => {
    if (controlledOpen === undefined) {
      setInternalOpen(newOpen)
    }
    onOpenChange?.(newOpen)
  }

  return (
    <AlertDialogContext.Provider value={{ open, setOpen }}>
      {children}
    </AlertDialogContext.Provider>
  )
}

function AlertDialogTrigger({ children, asChild }: { children: React.ReactNode; asChild?: boolean }) {
  const context = React.useContext(AlertDialogContext)
  if (!context) throw new Error('AlertDialogTrigger must be used within AlertDialog')
  
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<any>, {
      onClick: () => context.setOpen(true),
    })
  }
  
  return <button onClick={() => context.setOpen(true)}>{children}</button>
}

function AlertDialogContent({ children, className }: { children: React.ReactNode; className?: string }) {
  const context = React.useContext(AlertDialogContext)
  if (!context) throw new Error('AlertDialogContent must be used within AlertDialog')
  
  React.useEffect(() => {
    if (context.open) {
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [context.open])
  
  if (!context.open) return null
  
  return (
    <div className="fixed inset-0 z-50">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
      <div className="fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2">
        <div className={cn(
          "w-full max-w-lg rounded-xl border border-gray-200 bg-white p-6 shadow-2xl animate-in fade-in-0 zoom-in-95",
          className
        )}>
          {children}
        </div>
      </div>
    </div>
  )
}

function AlertDialogHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex flex-col space-y-2 text-center sm:text-left", className)} {...props} />
}

function AlertDialogFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 mt-4", className)} {...props} />
}

function AlertDialogTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h2 className={cn("text-lg font-semibold", className)} {...props} />
}

function AlertDialogDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-sm text-gray-500", className)} {...props} />
}

function AlertDialogAction({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <Button className={cn(className)} {...props} />
}

function AlertDialogCancel({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const context = React.useContext(AlertDialogContext)
  if (!context) throw new Error('AlertDialogCancel must be used within AlertDialog')
  
  return (
    <Button 
      variant="outline" 
      className={cn("mt-2 sm:mt-0", className)} 
      onClick={() => context.setOpen(false)}
      {...props} 
    />
  )
}

export {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
}
