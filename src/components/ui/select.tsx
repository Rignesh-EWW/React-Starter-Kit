import * as React from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface SelectContextType {
  value: string
  onValueChange: (value: string) => void
  open: boolean
  setOpen: (open: boolean) => void
}

const SelectContext = React.createContext<SelectContextType | undefined>(undefined)

interface SelectProps {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  children: React.ReactNode
}

function Select({ value: controlledValue, defaultValue, onValueChange, children }: SelectProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue || '')
  const [open, setOpen] = React.useState(false)
  
  const value = controlledValue !== undefined ? controlledValue : internalValue
  
  const handleValueChange = (newValue: string) => {
    if (controlledValue === undefined) {
      setInternalValue(newValue)
    }
    onValueChange?.(newValue)
    setOpen(false)
  }

  return (
    <SelectContext.Provider value={{ value, onValueChange: handleValueChange, open, setOpen }}>
      <div className="relative">
        {children}
      </div>
    </SelectContext.Provider>
  )
}

interface SelectTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

const SelectTrigger = React.forwardRef<HTMLButtonElement, SelectTriggerProps>(
  ({ className, children, ...props }, ref) => {
    const context = React.useContext(SelectContext)
    if (!context) throw new Error('SelectTrigger must be used within Select')
    
    return (
      <button
        ref={ref}
        type="button"
        onClick={() => context.setOpen(!context.open)}
        className={cn(
          "flex h-10 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      >
        {children}
        <ChevronDown className="h-4 w-4 opacity-50" />
      </button>
    )
  }
)
SelectTrigger.displayName = "SelectTrigger"

function SelectValue({ placeholder }: { placeholder?: string }) {
  const context = React.useContext(SelectContext)
  if (!context) throw new Error('SelectValue must be used within Select')
  
  return <span className={!context.value ? 'text-gray-400' : ''}>{context.value || placeholder}</span>
}

interface SelectContentProps {
  children: React.ReactNode
}

function SelectContent({ children }: SelectContentProps) {
  const context = React.useContext(SelectContext)
  if (!context) throw new Error('SelectContent must be used within Select')
  
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
      className="absolute z-50 mt-1 w-full rounded-md border border-gray-200 bg-white py-1 shadow-lg animate-in fade-in-0 zoom-in-95"
    >
      {children}
    </div>
  )
}

interface SelectItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string
  children: React.ReactNode
}

function SelectItem({ value, children, className, ...props }: SelectItemProps) {
  const context = React.useContext(SelectContext)
  if (!context) throw new Error('SelectItem must be used within Select')
  
  const isSelected = context.value === value
  
  return (
    <div
      onClick={() => context.onValueChange(value)}
      className={cn(
        "relative flex cursor-pointer select-none items-center px-3 py-2 text-sm hover:bg-gray-100",
        isSelected && "bg-blue-50 text-blue-600",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export { Select, SelectTrigger, SelectValue, SelectContent, SelectItem }
