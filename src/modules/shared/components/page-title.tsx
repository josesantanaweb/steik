import type { HTMLAttributes, ReactElement, ReactNode } from "react";
import { cn } from "@/modules/shared/utils/cn";
import { BackButton } from "./back-button";

export interface PageTitleProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  showBackButton?: boolean;
  action?: ReactNode;
}

export const PageTitle = ({
  title,
  showBackButton = false,
  action,
  className,
  ...props
}: PageTitleProps): ReactElement => {
  return (
    <div
      className={cn("flex items-center gap-3 px-5 py-5", className)}
      {...props}
    >
      {showBackButton && <BackButton />}
      <h1 className="min-w-0 flex-1 text-xl leading-7 font-semibold text-white">
        {title}
      </h1>
      {action}
    </div>
  );
};
