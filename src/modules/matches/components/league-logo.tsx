"use client";

import { useState, type ReactElement } from "react";
import { Trophy } from "lucide-react";

interface LeagueLogoProps {
  src: string;
  name: string;
}

export const LeagueLogo = ({ src, name }: LeagueLogoProps): ReactElement => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return <Trophy size={18} strokeWidth={2} aria-hidden="true" />;
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={name}
      onError={() => setHasError(true)}
      className="size-6 object-contain p-1"
    />
  );
};
