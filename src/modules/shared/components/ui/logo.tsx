"use client";

import Image from "next/image";
import Link from "next/link";
import { APP_NAME, ASSETS, ROUTES } from "@/constants";
import { cn } from "@/modules/shared/utils/cn";

export const Logo = ({ className }: { className?: string }) => {
  return (
    <Link
      href={ROUTES.HOME}
      className={cn("block w-32", className)}
      aria-label="Ir al inicio"
    >
      <Image
        src={ASSETS.IMAGES.LOGO}
        alt={APP_NAME}
        width={160}
        height={40}
        priority
        className="h-auto w-full"
      />
    </Link>
  );
};
