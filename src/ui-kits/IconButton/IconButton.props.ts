import { ReactNode } from "react";

export type IconButtonAnimationType = "left" | "right" | "bottom";

export interface IconButtonProps {
  children: ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  animationType?: IconButtonAnimationType;
  isSmall?: boolean;
  isMedium?: boolean;
  isLarge?: boolean;
  isActive?: boolean;
  isFlat?: boolean;
  classes?: string;
  disabled?: boolean;
}
