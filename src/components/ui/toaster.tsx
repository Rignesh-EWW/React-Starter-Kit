import { Toast, ToastViewport } from "@/components/ui/toast"
import { useToast } from "@/hooks/use-toast"

export function Toaster() {
  const { toasts, dismiss } = useToast()

  return (
    <ToastViewport>
      {toasts.map(function ({ id, title, description, variant }) {
        return (
          <Toast
            key={id}
            title={title as string}
            description={description as string}
            variant={variant}
            onOpenChange={() => dismiss(id)}
          />
        )
      })}
    </ToastViewport>
  )
}
