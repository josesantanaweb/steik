"use client";

import type { ReactElement } from "react";
import { Logo } from "@/modules/shared/components/ui";

export const Header = (): ReactElement => {
  return (
    <header className="bg-surface fixed top-0 right-0 left-0 z-50 mx-auto h-17 md:max-w-md">
      <div className="flex h-full items-center justify-between px-5">
        <Logo />
      </div>
    </header>
  );
};
