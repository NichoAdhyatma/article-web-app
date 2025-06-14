"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";

interface InputProps extends React.ComponentProps<"input"> {
  leftIcon?: React.ReactNode;
}

function Input({ className, type, leftIcon, ...props }: InputProps) {
  const [showPassword, setShowPassword] = React.useState(false);
  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;

  const hasLeftIcon = !!leftIcon;

  return (
    <div className="relative w-full">
      {/* Left Icon */}
      {hasLeftIcon && (
        <div className="absolute inset-y-0 left-2 flex items-center text-slate-400 pointer-events-none">
          {leftIcon}
        </div>
      )}

      <input
        type={inputType}
        data-slot="input"
        className={cn(
          "file:text-foreground placeholder:text-slate-400 selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-white text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          "py-2 px-3",
          hasLeftIcon && "pl-8",
          className
        )}
        {...props}
      />

      {/* Right Password Toggle */}
      {isPassword && (
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute inset-y-0 right-2 flex items-center hover:text-foreground"
          tabIndex={-1}
        >
          {showPassword ? (
            <EyeOff color="#475569" size={18} />
          ) : (
            <Eye color="#475569" size={18} />
          )}
        </button>
      )}
    </div>
  );
}

export { Input };
