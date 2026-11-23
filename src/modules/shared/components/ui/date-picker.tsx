"use client";

import * as React from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import { DayPicker } from "react-day-picker";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/modules/shared/utils/cn";
import "react-day-picker/dist/style.css";

const datePickerVariants = cva(
  "rounded-lg bg-surface border-stroke text-white placeholder:text-body/50 w-full min-w-40 rounded-lg border px-3 py-2 text-base outline-none transition-colors disabled:cursor-not-allowed disabled:opacity-60",
  {
    variants: {
      inputSize: {
        sm: "h-9 text-xs",
        lg: "h-12 text-base",
      },
    },
    defaultVariants: {
      inputSize: "lg",
    },
  }
);

export interface DatePickerProps
  extends Omit<VariantProps<typeof datePickerVariants>, "size"> {
  value?: string;
  onChange?: (value: string) => void;
  label?: string;
  error?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export const DatePicker = React.forwardRef<HTMLDivElement, DatePickerProps>(
  (
    { className, inputSize, label, error, value, onChange, placeholder, disabled },
    ref
  ) => {
    const [open, setOpen] = React.useState(false);
    const containerRef = React.useRef<HTMLDivElement>(null);

    const selectedDate = value ? new Date(value + "T00:00:00") : undefined;

    const handleSelect = (date: Date | undefined) => {
      if (date) {
        const dateStr = date.toISOString().split("T")[0];
        onChange?.(dateStr);
        setOpen(false);
      }
    };

    React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(event.target as Node)
        ) {
          setOpen(false);
        }
      };

      if (open) {
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
      }
    }, [open]);

    return (
      <div ref={ref} className="flex w-full flex-col">
        <div className="flex w-full flex-col gap-1.5">
          {label && (
            <span
              className={cn(
                "text-sm font-semibold uppercase",
                error ? "text-error" : "text-white"
              )}
            >
              {label}
            </span>
          )}
          <div ref={containerRef} className="relative">
            <button
              type="button"
              onClick={() => setOpen(!open)}
              disabled={disabled}
              className={cn(
                datePickerVariants({ inputSize, className }),
                error && "border-error focus:border-error",
                "flex items-center justify-between text-left text-white disabled:opacity-60",
                open && "border-white/30"
              )}
            >
              <span className="text-body/50 text-sm">
                {value
                  ? new Date(value + "T00:00:00").toLocaleDateString("es-VE", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })
                  : placeholder || "Fecha"}
              </span>
              <CalendarIcon
                size={inputSize === "sm" ? 15 : 18}
                className="text-body"
              />
            </button>

            {open && (
              <div className="border-stroke bg-surface absolute top-full left-0 z-50 mt-1 rounded-lg border p-3 shadow-lg">
                <style>{`
                  .rdp {
                    --rdp-cell-size: 36px;
                    --rdp-accent-color: rgba(255, 255, 255, 0.2);
                    --rdp-background-color: rgba(255, 255, 255, 0.1);
                    color: white;
                  }
                  .rdp-months {
                    color: white;
                  }
                  .rdp-caption {
                    color: white;
                    font-weight: 600;
                    font-size: 0.875rem;
                  }
                  .rdp-head_cell {
                    color: #a0a0a8;
                    font-weight: 500;
                    font-size: 0.75rem;
                  }
                  .rdp-cell {
                    padding: 0;
                  }
                  .rdp-day {
                    color: white;
                    border-radius: 0.375rem;
                  }
                  .rdp-day:hover:not([disabled]) {
                    background-color: rgba(255, 255, 255, 0.1);
                  }
                  .rdp-day_selected:not([disabled]) {
                    background-color: rgba(255, 255, 255, 0.2);
                    color: white;
                  }
                  .rdp-day_today:not(.rdp-day_outside) {
                    border: 1px solid rgba(255, 255, 255, 0.3);
                    color: white;
                  }
                  .rdp-button {
                    border-radius: 0.375rem;
                    width: 28px;
                    height: 28px;
                    color: white;
                  }
                  .rdp-button:hover:not([disabled]) {
                    opacity: 0.8;
                  }
                  .rdp-day_disabled {
                    color: #a0a0a8;
                  }
                  .rdp-day_outside {
                    color: #a0a0a8;
                  }
                `}</style>
                <DayPicker
                  mode="single"
                  selected={selectedDate}
                  onSelect={handleSelect}
                  disabled={disabled}
                  showOutsideDays={false}
                />
              </div>
            )}
          </div>
        </div>
        {error && (
          <span className="text-error mt-1.5 text-xs font-medium">{error}</span>
        )}
      </div>
    );
  }
);

DatePicker.displayName = "DatePicker";
