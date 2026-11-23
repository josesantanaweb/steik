"use client";

import type { ReactElement } from "react";
import { cn } from "@/modules/shared/utils/cn";
import { FormResult, type FormResult as Result } from "@/modules/teams/types";

const FORM_RESULT_STYLES: Record<
  Result,
  { letter: string; label: string; className: string }
> = {
  [FormResult.WIN]: {
    letter: "G",
    label: "Ganada",
    className: "border-success text-success bg-success/10",
  },
  [FormResult.LOSS]: {
    letter: "P",
    label: "Perdida",
    className: "border-error text-error bg-error/10",
  },
  [FormResult.DRAW]: {
    letter: "E",
    label: "Empate",
    className: "border-stroke bg-surface text-body",
  },
};

interface FormBadgeProps {
  result: Result;
  className?: string;
}

export const FormBadge = ({
  result,
  className,
}: FormBadgeProps): ReactElement => {
  const { letter, label, className: resultClassName } =
    FORM_RESULT_STYLES[result];

  return (
    <span
      role="img"
      aria-label={label}
      className={cn(
        "flex h-10 w-10 items-center justify-center rounded-lg border text-lg font-semibold",
        resultClassName,
        className,
      )}
    >
      <span aria-hidden="true">{letter}</span>
    </span>
  );
};

interface RecentFormProps {
  results: Result[];
  title?: string;
  className?: string;
}

export const RecentForm = ({
  results,
  title = "Forma reciente",
  className,
}: RecentFormProps): ReactElement => {
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <h4 className="text-lg font-semibold text-white uppercase">{title}</h4>
      <div className="flex items-center gap-2">
        {results.map((result, index) => (
          <FormBadge key={index} result={result} />
        ))}
      </div>
    </div>
  );
};
