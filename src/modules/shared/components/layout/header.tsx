"use client";

import type { ReactElement } from "react";
import { Logo } from "@/modules/shared/components/ui";
import { Balance } from "./balance";

interface HeaderProps {
  balance?: number;
  onAddMovement?: () => void;
}

export const Header = ({
  balance = 0,
  onAddMovement,
}: HeaderProps): ReactElement => {
  return (
    <header className="bg-canvas border-stroke fixed top-0 right-0 left-0 z-50 mx-auto h-17 border-b md:max-w-md">
      <div className="flex h-full items-center justify-between gap-4 px-5">
        <Logo className="w-24 shrink-0" />
        <Balance amount={balance} onAdd={onAddMovement} />
      </div>
    </header>
  );
};
