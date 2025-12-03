import * as React from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

interface DialogContextType {
  open: boolean
  setOpen: (open: boolean) => void
}

const DialogContext = React.createContext<DialogContextType | undefined>(undefined)

interface DialogProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
}

function Dialog({ open: controlledOpen, onOpenChange, children }: DialogProps) {
  const [internalOpen, setInternalOpen] = React.useState(false)
  
  const open = controlledOpen !== undefined ? controlledOpen : internalOpen
  
  const setOpen = (newOpen: boolean) => {
    if (controlledOpen === undefined) {
      setInternalOpen(newOpen)
    }
    onOpenChange?.(newOpen)
  }

  return (
    <DialogContext.Provider value={{ open, setOpen }}>
      {children}
    </DialogContext.Provider>
  )
}

function DialogTrigger({ children, asChild }: { children: React.ReactNode; asChild?: boolean }) {
  const context = React.useContext(DialogContext)
  if (!context) throw new Error('DialogTrigger must be used within Dialog')
  
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<any>, {
      onClick: () => context.setOpen(true),
    })
  }
  
  return <button onClick={() => context.setOpen(true)}>{children}</button>
}

function DialogContent({ children, className }: { children: React.ReactNode; className?: string }) {
  const context = React.useContext(DialogContext)
  if (!context) throw new Error('DialogContent must be used within Dialog')
  
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') context.setOpen(false)
    }
    
    if (context.open) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [context.open, context])
  
  if (!context.open) return null
  
  return (
    <div className="fixed inset-0 z-50">
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => context.setOpen(false)}
      />
      <div className="fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2">
        <div className={cn(
          "w-full max-w-lg rounded-xl border border-gray-200 bg-white p-6 shadow-2xl animate-in fade-in-0 zoom-in-95",
          className
        )}>
          {children}
          <button
            onClick={() => context.setOpen(false)}
            className="absolute right-4 top-4 rounded-sm p-1 text-gray-400 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

function DialogHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex flex-col space-y-1.5 text-center sm:text-left", className)} {...props} />
}

function DialogFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)} {...props} />
}

function DialogTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h2 className={cn("text-lg font-semibold leading-none tracking-tight", className)} {...props} />
}

function DialogDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-sm text-gray-500", className)} {...props} />
}

const DialogClose = ({ children }: { children: React.ReactNode }) => {
  const context = React.useContext(DialogContext)
  if (!context) throw new Error('DialogClose must be used within Dialog')
  
  return <span onClick={() => context.setOpen(false)}>{children}</span>
}

export { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription, DialogClose }
