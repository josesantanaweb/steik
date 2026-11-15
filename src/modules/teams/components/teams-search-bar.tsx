"use client";

import {
  useEffect,
  useRef,
  type KeyboardEvent,
  type ReactElement,
} from "react";
import { X } from "lucide-react";
import { cn } from "@/modules/shared/utils/cn";

interface TeamsSearchBarProps {
  isOpen: boolean;
  value: string;
  onValueChange: (value: string) => void;
  onClose: () => void;
  placeholder?: string;
  className?: string;
}

export const TeamsSearchBar = ({
  isOpen,
  value,
  onValueChange,
  onClose,
  placeholder = "Buscar equipo",
  className,
}: TeamsSearchBarProps): ReactElement => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === "Escape") {
      onClose();
    }
  };

  return (
    <div
      inert={!isOpen}
      aria-hidden={!isOpen}
      className={cn(
        "flex items-center gap-3 transition-[transform,opacity] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
        isOpen
          ? "translate-y-0 opacity-100 delay-100 duration-300"
          : "pointer-events-none -translate-y-2 opacity-0 duration-200",
        className,
      )}
    >
      <input
        ref={inputRef}
        type="search"
        value={value}
        placeholder={placeholder}
        aria-label="Buscar equipos"
        onChange={(event) => onValueChange(event.target.value)}
        onKeyDown={handleKeyDown}
        className="min-w-0 flex-1 bg-transparent p-0 text-lg leading-7 text-white outline-none [&::-webkit-search-cancel-button]:appearance-none placeholder:text-body"
      />
      <button
        type="button"
        onClick={onClose}
        aria-label="Cerrar búsqueda"
        className="shrink-0 cursor-pointer text-white transition-colors hover:text-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-canvas focus-visible:outline-none"
      >
        <X size={22} strokeWidth={2} aria-hidden="true" />
      </button>
    </div>
  );
};
