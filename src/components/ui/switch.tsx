import * as React from "react";
import { cn } from "../../lib/utils";

type SwitchProps = {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
} & React.HTMLAttributes<HTMLButtonElement>;

const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  ({ checked = false, onCheckedChange, className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        role="switch"
        aria-checked={checked}
        type="button"
        onClick={() => onCheckedChange?.(!checked)}
        className={cn(
          "inline-flex h-6 w-11 items-center rounded-full border border-input bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          checked ? "bg-primary" : "bg-muted",
          className
        )}
        {...props}
      >
        <span
          className={cn(
            "ml-[2px] inline-block h-5 w-5 rounded-full bg-white shadow transition-transform",
            checked ? "translate-x-[14px]" : "translate-x-0"
          )}
        />
      </button>
    );
  }
);
Switch.displayName = "Switch";

export { Switch };
