import * as React from "react";
import { cn } from "@/lib/utils";
import Eye from "../svg/eye";
import Eyeslash from "../svg/eye-slash";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  showPassword?: boolean;
  error?: any;
  onTogglePasswordVisibility?: (showPassword: boolean) => void;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      error,
      showPassword,
      onTogglePasswordVisibility,
      ...props
    },
    ref
  ) => {
    const togglePasswordVisibility = () => {
      if (onTogglePasswordVisibility) {
        onTogglePasswordVisibility(!showPassword);
      }
    };
    return (
      <div className="relative">
        <input
          type={showPassword ? "text" : type}
          className={cn(
            `flex h-9 w-full rounded-md border ${
              error
                ? "border-red-500 ring-red-400  "
                : "border-input focus-visible:ring-ring"
            } bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:ring-1  transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50`,
            className
          )}
          ref={ref}
          {...props}
        />
        {type === "password" && onTogglePasswordVisibility && (
          <button
            type="button"
            className="absolute right-2 top-2"
            //  onClick={() => setShowPassword(!showPassword)}
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <Eye /> : <Eyeslash />}
          </button>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
