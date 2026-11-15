"use client";

import type { ReactElement } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BOTTOM_NAV_ITEMS, ROUTES, type BottomNavItem } from "@/constants";
import { cn } from "@/modules/shared/utils/cn";
import { isActiveRoute } from "@/modules/shared/utils/is-active-route";

const FOCUS_RING =
  "outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-canvas";

interface NavItemProps {
  item: BottomNavItem;
  isActive: boolean;
}

const NavLink = ({ item, isActive }: NavItemProps): ReactElement => {
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "flex w-full flex-col items-center justify-center gap-1 rounded-xl py-2 transition-colors",
        FOCUS_RING,
        isActive ? "text-primary" : "text-body hover:text-white"
      )}
    >
      <Icon size={22} strokeWidth={2} />
      <span className="text-[11px] font-medium">{item.label}</span>
    </Link>
  );
};

const CenterButton = ({ item, isActive }: NavItemProps): ReactElement => {
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      aria-label={item.label}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "group relative -top-8 flex h-14 w-14 items-center justify-center rounded-2xl",
        FOCUS_RING
      )}
    >
      <span className="from-secondary to-primary absolute inset-0 rotate-45 rounded-2xl bg-linear-to-t shadow-[0_8px_24px_rgba(152,237,32,0.3)] transition-transform group-active:scale-95" />
      <Icon
        size={26}
        strokeWidth={2.5}
        className="text-canvas relative z-10"
      />
    </Link>
  );
};

export const BottomNav = (): ReactElement => {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Navegación principal"
      className="fixed right-0 bottom-5 left-0 z-50 mx-auto w-[90%] md:max-w-md"
    >
      <ul className="bg-surface border-stroke relative flex h-15 items-center border-t px-2">
        {BOTTOM_NAV_ITEMS.map((item) => {
          const isActive = isActiveRoute(pathname, item.href, ROUTES.HOME);

          return (
            <li key={item.key} className="flex flex-1 justify-center">
              {item.isCenter ? (
                <CenterButton item={item} isActive={isActive} />
              ) : (
                <NavLink item={item} isActive={isActive} />
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
