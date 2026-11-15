"use client";

import { Star } from "lucide-react";
import { cn } from "@/modules/shared/utils/cn";

interface FavoriteButtonProps {
  name: string;
  isFavorite: boolean;
  onToggle: () => void;
  size?: number;
  className?: string;
}

export const FavoriteButton = ({
  name,
  isFavorite,
  onToggle,
  size = 20,
  className,
}: FavoriteButtonProps) => {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={isFavorite}
      aria-label={
        isFavorite
          ? `Quitar ${name} de favoritos`
          : `Marcar ${name} como favorito`
      }
      className={cn(
        "cursor-pointer transition-transform hover:scale-110 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-canvas focus-visible:outline-none",
        className,
      )}
    >
      <Star
        size={size}
        strokeWidth={2}
        aria-hidden="true"
        className={cn(isFavorite ? "fill-primary text-primary" : "text-body")}
      />
    </button>
  );
};
