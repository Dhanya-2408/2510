export type ButtonType = "button" | "reset" | "submit";

/**
 * Represents the common needed for the button component
 */

export interface IButtonStyleProps {
  isSmall?: boolean;
  isFull?: boolean;
  isStretched?: boolean;
  isSeparatorDot?: boolean;
  isExpand?: boolean;
}

export interface ITextButtonProps extends IButtonStyleProps {
  children: any;
  ariaLabel?: string;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type?: ButtonType;
  className?: string;
  buttonType?: string;
  isLoading?: boolean;
}
