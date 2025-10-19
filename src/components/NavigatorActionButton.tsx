import { ReactNode } from "react";

interface NavigatorActionButtonProps {
  icon: ReactNode;
  onClick: () => void;
  label?: string;
}

const NavigatorActionButton = ({
  icon,
  onClick,
  label,
}: NavigatorActionButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-full flex-1 select-none items-center justify-center outline-none transition-colors duration-150 ease-in-out focus-visible:ring-2 focus-visible:ring-white/30 active:bg-white/15 active:text-[#A6A6A6] [@media(hover:hover)]:hover:bg-white/10 [@media(hover:hover)]:hover:text-[#A6A6A6]"
      title={label}
      aria-label={label}
    >
      {icon}
    </button>
  );
};

export default NavigatorActionButton;
