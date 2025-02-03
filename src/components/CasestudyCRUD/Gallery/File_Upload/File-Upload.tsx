import React from "react";
import "./Style.scss";

interface IProps {
  changeHandler: (pic: any) => void;
}

const FileUpload: React.FC<IProps> = (props: IProps): JSX.Element => {
  const { changeHandler } = props;

  const [selectedFile, setSelectedFile] = React.useState<any>();

  // const [uploadedImages, setUploadedImages] = React.useState<CustomImage>();

  const handleImageUpload = async (event: any) => {
    const fileList = event.target.files[0];
    console.log(fileList);
    setSelectedFile(fileList);
    changeHandler(fileList);
    // const fileToImagePromises = await fileToImageURL(fileList);
    // setUploadedImages(fileToImagePromises);
  };

  return (
    <React.Fragment>
      <div className="images-container">
        {selectedFile ? selectedFile.name : <p>Upload Files...</p>}
        {/* {uploadedImages ? (
          <img src={uploadedImages.src} alt="gs" className="uploaded-image" />
        ) : (
          <p>Upload some images...</p>
        )} */}
      </div>

      <div className="file-container">
        <label htmlFor="file-input">
          <span className="button">UPLOAD</span>
          <input
            id="file-input"
            type="file"
            accept="audio/*,video/*,image/*"
            onChange={handleImageUpload}
            style={{ display: "none" }}
            multiple={false}
          />
        </label>
      </div>
    </React.Fragment>
  );
};

export default FileUpload;
