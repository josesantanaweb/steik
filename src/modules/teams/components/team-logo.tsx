"use client";

import { useState, type ReactElement } from "react";
import { cn } from "@/modules/shared/utils/cn";

interface TeamLogoProps {
  src?: string;
  name: string;
  className?: string;
}

export const TeamLogo = ({
  src,
  name,
  className,
}: TeamLogoProps): ReactElement => {
  const [hasError, setHasError] = useState(false);
  const initials = name.trim().charAt(0).toUpperCase();
  const showImage = Boolean(src) && !hasError;

  return (
    <span
      className={cn(
        "border-stroke bg-canvas flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-full border",
        showImage ? 'border-transparent' : "border-stroke",
        className
      )}
    >
      {showImage ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={name}
          loading="lazy"
          onError={() => setHasError(true)}
          className="size-full object-contain p-1"
        />
      ) : (
        <span aria-hidden="true" className="text-sm font-semibold text-white">
          {initials}
        </span>
      )}
    </span>
  );
};
