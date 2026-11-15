import {
  CalendarDays,
  DollarSign,
  History,
  LayoutGrid,
  Shield,
  type LucideIcon,
} from "lucide-react";
import { ROUTES } from "./routes";

export interface BottomNavItem {
  key: string;
  label: string;
  href: string;
  icon: LucideIcon;
  isCenter?: boolean;
}

export const BOTTOM_NAV_ITEMS: BottomNavItem[] = [
  { key: "dashboard", label: "Dashboard", href: ROUTES.HOME, icon: LayoutGrid },
  { key: "teams", label: "Equipos", href: ROUTES.TEAMS, icon: Shield },
  {
    key: "new-bet",
    label: "Nueva apuesta",
    href: ROUTES.NEW_BET,
    icon: DollarSign,
    isCenter: true,
  },
  { key: "matches", label: "Partidos", href: ROUTES.MATCHES, icon: CalendarDays },
  { key: "history", label: "Historial", href: ROUTES.HISTORY, icon: History },
];
