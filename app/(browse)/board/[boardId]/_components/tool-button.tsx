"use client";

import { LucideIcon } from "lucide-react";
interface ToolButtonProps {
  label: string;
  icon: LucideIcon;
  onClick: () => void;
  isActive?: boolean;
  isDisabled?: boolean;
};

export const ToolButton = ({
  label,
  icon: Icon,
  onClick,
  isActive,
  isDisabled,
}: ToolButtonProps) => {
  return (
    <div data-tip={label} className="tooltip tooltip-left">
      <button
        disabled={isDisabled}
        onClick={onClick}
        className="btn"
      >
        <Icon />
      </button>
    </div>
  );
};