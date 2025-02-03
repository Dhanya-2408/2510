import { ReactElement, FC } from "react";
import { ITextButtonProps } from "./ITextButton.props";
import {
  Button,
  LoadingSpinner,
  OverlayButton,
  PrimaryButton,
  SecondaryButton,
} from "./TextButton.styles";

export const BUTTON_TYPE_CLASSES = {
  base: "base",
  inverted: "inverted",
  transparent: "transparent",
  overlay: "overlay",
};

const getButton = (buttonType = BUTTON_TYPE_CLASSES.base) =>
  ({
    [BUTTON_TYPE_CLASSES.transparent]: Button,
    [BUTTON_TYPE_CLASSES.base]: PrimaryButton,
    [BUTTON_TYPE_CLASSES.inverted]: SecondaryButton,
    [BUTTON_TYPE_CLASSES.overlay]: OverlayButton,
  }[buttonType]);

export const TextButton: FC<ITextButtonProps> = ({
  children,
  buttonType,
  isLoading = false,
  ...otherProps
}): ReactElement => {
  const CustomButton = getButton(buttonType);

  return (
    <CustomButton disabled={isLoading} {...otherProps}>
      <span>{isLoading ? <LoadingSpinner /> : children}</span>
    </CustomButton>
  );
};
