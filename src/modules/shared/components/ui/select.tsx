"use client";

import { useEffect, useRef, useState, type ReactElement } from "react";
import { ChevronDown, type LucideIcon } from "lucide-react";
import { cn } from "@/modules/shared/utils/cn";

export interface SelectOption<T extends string | number> {
  value: T;
  label: string;
}

export interface SelectProps<T extends string | number> {
  options: SelectOption<T>[];
  value?: T | null;
  onChange?: (value: T) => void;
  placeholder?: string;
  label?: string;
  leftIcon?: LucideIcon;
  className?: string;
  disabled?: boolean;
}

export function Select<T extends string | number>({
  options,
  value,
  onChange,
  placeholder = "Seleccionar...",
  label,
  leftIcon: Icon,
  className,
  disabled = false,
}: SelectProps<T>): ReactElement {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const selected = options.find((option) => option.value === value) ?? null;

  return (
    <div className={cn("relative", className)} ref={containerRef}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setIsOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={label}
        className="bg-surface border-stroke flex h-9 w-full gap-2 cursor-pointer items-center justify-between rounded-md border px-3 text-sm text-white transition-colors outline-none hover:border-white/40 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <div className="flex items-center gap-2">
          {Icon && (
            <Icon size={15} className="text-body shrink-0" aria-hidden="true" />
          )}
          <span className="min-w-max">
            {selected ? selected.label : (label ?? placeholder)}
          </span>
        </div>
        <ChevronDown
          size={15}
          className={cn(
            "text-white transition-transform duration-200",
            isOpen && "rotate-180"
          )}
          aria-hidden="true"
        />
      </button>

      {isOpen && (
        <div
          role="listbox"
          className="bg-surface border-stroke absolute top-[calc(100%+4px)] left-0 z-50 max-h-60 w-full min-w-max overflow-y-auto rounded-lg border py-1 shadow-lg backdrop-blur-md"
        >
          {options.length === 0 ? (
            <div className="text-body px-3 py-2 text-sm">No hay opciones</div>
          ) : (
            options.map((option) => (
              <button
                key={String(option.value)}
                type="button"
                role="option"
                aria-selected={option.value === value}
                onClick={() => {
                  onChange?.(option.value);
                  setIsOpen(false);
                }}
                className={cn(
                  "hover:bg-surface/70 flex w-full cursor-pointer items-center gap-2 px-3 py-2 text-left text-sm text-white transition-colors",
                  option.value === value && "bg-stroke font-semibold"
                )}
              >
                <span>{option.label}</span>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}
