import { FC, useState } from "react";

export interface IProps {
  src: string;
  alt: string;
  classes: string;
  showLoader?: boolean;
}

export const ImageWrapper: FC<IProps> = (props: IProps) => {
  const { src, alt, classes, showLoader = true } = props;
  const [loader, setLoader] = useState("Image--lazyLoading");
  const onImageLoaded = () => {
    setLoader("Image--lazyLoaded");
  };

  return (
    <>
      <img
        src={src}
        alt={alt}
        onLoad={onImageLoaded}
        className={`${classes} ${loader}`}
      />
      {showLoader && <span className="Image__Loader"></span>}
    </>
  );
};
