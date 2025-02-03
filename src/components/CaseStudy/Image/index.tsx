import React, { useMemo } from "react";
import { fileToImageURL, generatePdfFromImages, onImageEdit } from "./helper";
import { ImageWrapper } from "../../../ui-kits/ImageWrapper";
import { ICaseStudyImage } from "../../../redux/slices/casestudy/casestudy.type";
import { CustomImage } from "./custom-image";
import "./Style.scss";
import { IconButton } from "../../../ui-kits/IconButton/IconButton.component";
import { DowloadIcon } from "../../../assets/icons/Dowload.icon";
import { isImgLink, isVideoLink } from "../../../utils/script";
import { IF } from "../../../ui-kits/IF";
import Slider from "react-slick";

interface IProps {
  imagesData?: ICaseStudyImage[];
}

export const CaseStudyImage = (props: IProps) => {
  const { imagesData } = props;

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const uploadedImages = useMemo(() => {
    let data: CustomImage[] = [];
    if (imagesData) {
      imagesData.forEach(async (image: ICaseStudyImage) => {
        if (!isVideoLink(image.imageurl)) {
          const imageToImagePromises = await onImageEdit(
            image.imageurl,
            image.gallerytitle
          );
          const fileToImagePromises = await fileToImageURL(
            imageToImagePromises
          );
          data.push(fileToImagePromises);
        }
      });
    }
    return data;
  }, [imagesData]);

  // const cleanUpUploadedImages = React.useCallback(() => {
  //   uploadedImages.forEach((image) => {
  //     URL.revokeObjectURL(image.src);
  //   });
  // }, [uploadedImages]);

  const generatePdfFromImagesOnclick = React.useCallback(() => {
    console.log(uploadedImages);
    generatePdfFromImages(uploadedImages);
    // cleanUpUploadedImages();
  }, [uploadedImages]);

  return (
    <Slider {...settings} className="ProductList__Slider">
      {imagesData?.map((item: ICaseStudyImage) => (
        <div className="CollectionItem__Wrapper" key={item.galleryid}>
          <IF condition={isImgLink(item.imageurl)}>
            <div className="CollectionItem__ImageWrapper">
              <ImageWrapper
                src={item.imageurl}
                alt={item.gallerytitle}
                classes="CollectionItem__Image Image--zoomOut"
              />
            </div>
          </IF>
          <IF condition={isVideoLink(item.imageurl)}>
            <video controls className="CollectionItem__VideoWrapper">
              <source src={item.imageurl} type="video/mp4" />
              <source src={item.imageurl} type="video/ogg" />
              Your browser does not support the video tag.
            </video>
          </IF>
          <IF condition={!isVideoLink(item.imageurl)}>
            <div className="CollectionItem__Content CollectionItem__Content--center Heading u-h5">
              <IconButton
                isSmall
                disabled={imagesData?.length === 0}
                onClick={generatePdfFromImagesOnclick}
              >
                <DowloadIcon />
              </IconButton>
            </div>
          </IF>
        </div>
      ))}
    </Slider>
  );
};
