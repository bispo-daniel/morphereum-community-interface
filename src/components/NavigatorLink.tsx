import classNames from "classnames";
import { ReactNode } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";

interface NavigatorLinkProps {
  icon: ReactNode;
  path: string;
  label?: string;
}

const NavigatorLink = ({ icon, path, label }: NavigatorLinkProps) => {
  const location = useLocation();
  const isActive = location.pathname === path;

  return (
    <RouterLink
      to={path}
      draggable={false}
      aria-current={isActive ? "page" : undefined}
      className={classNames({
        "flex h-full flex-1 select-none items-center justify-center outline-none transition-colors duration-150 ease-in-out focus-visible:ring-2 focus-visible:ring-white/30 active:bg-white/15 active:text-[#A6A6A6] [@media(hover:hover)]:hover:bg-white/10 [@media(hover:hover)]:hover:text-[#A6A6A6]":
          true,
        "text-[var(--coin-pink)] dark:text-[var(--coin-pink)]": isActive,
      })}
      title={label}
    >
      {icon}
    </RouterLink>
  );
};

export default NavigatorLink;
