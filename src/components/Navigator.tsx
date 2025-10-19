import classNames from "classnames";
import {
  Bot,
  ChartNoAxesCombined,
  House,
  Images,
  Link,
  Moon,
  Scroll,
  Sun,
  Target,
} from "lucide-react";
import { ReactNode } from "react";
import { useLocation } from "react-router-dom";

import { useTheme } from "@/providers/theme";

import { NavigatorActionButton, NavigatorLink } from ".";

interface NavItem {
  icon: ReactNode;
  path?: string;
  action?: () => void;
  label?: string;
}

const Navigator = () => {
  const { setTheme, theme } = useTheme();
  const location = useLocation();

  const isChat = location.pathname === "/chat";

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const items: NavItem[] = [
    { icon: <House size="18" />, path: "/", label: "Início" },
    { icon: <Target size="18" />, path: "/raid", label: "Raid" },
    { icon: <Link size="18" />, path: "/links", label: "Links" },
    { icon: <Bot size="18" />, path: "/chat", label: "Chat" },
    {
      icon: <ChartNoAxesCombined size="18" />,
      path: "/metrics",
      label: "Métricas",
    },
    { icon: <Scroll size="18" />, path: "/whitepaper", label: "Whitepaper" },
    { icon: <Images size="18" />, path: "/arts", label: "Artes" },
    {
      icon: theme === "dark" ? <Sun size="18" /> : <Moon size="18" />,
      action: toggleTheme,
      label: "Tema",
    },
  ];

  return (
    <nav
      className={classNames(
        "fixed left-1/2 z-20 -translate-x-1/2 px-2 shadow-[rgba(0,0,0,0.2)]",
        "flex h-10 w-[260px] items-stretch justify-evenly overflow-hidden",
        "rounded-3xl border bg-[hsl(var(--background))]/90 shadow-lg",
        "backdrop-blur supports-[backdrop-filter]:backdrop-blur",
        "transition-all duration-150",
        {
          "bottom-5": !isChat,
          "top-14": isChat,
        },
      )}
      role="navigation"
      aria-label="Navegação principal"
    >
      {items.map((item, i) =>
        item.action ? (
          <NavigatorActionButton
            key={i}
            icon={item.icon}
            onClick={item.action}
            label={item.label}
          />
        ) : (
          <NavigatorLink
            key={i}
            icon={item.icon}
            path={item.path!}
            label={item.label}
          />
        ),
      )}
    </nav>
  );
};

export default Navigator;
