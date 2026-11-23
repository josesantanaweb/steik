"use client";

import type { ReactElement } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/modules/shared/utils/cn";

interface ProgressBarProps {
  value: number;
  label?: string;
  className?: string;
}

export const ProgressBar = ({
  value,
  label,
  className,
}: ProgressBarProps): ReactElement => {
  const shouldReduceMotion = useReducedMotion();
  const clampedValue = Math.min(100, Math.max(0, value));
  const width = `${clampedValue}%`;

  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={clampedValue}
      className={cn(
        "bg-stroke flex h-2.5 w-full items-center overflow-hidden rounded-xl",
        className,
      )}
    >
      <motion.span
        initial={{ width: shouldReduceMotion ? width : 0 }}
        animate={{ width }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-primary h-full rounded-xl"
      />
    </div>
  );
};
