import { cloneElement, useEffect, useRef, useContext } from "react";
import axios from "axios";
import "./UploadWidget.css";

const UploadWidget = ({ image, setImage, children }) => {
  //   const { user, setUser } = useContext(UserContext);
  let url = "";

  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "realestatedashboard",
        uploadPreset: "default_upload",
        sources: ["local", "camera", "url"],
      },
      async function (error, result) {
        if (!error && result && result.event == "success") {
          url = result.info.url;
          console.log(result.info.url, "This is the info", url);
          setImage(url);
        } else {
          setImage(result.info.url);
        }
      }
    );
  }, []);
  //   console.log(image, "Thats the image");
  //   if (children) {
  //     return cloneElement(children, { onClick: () => widgetRef.current.open() });
  //   } else {
  return (
    <img
      onClick={() => widgetRef.current.open()}
      id="upload-img"
      src="https://i.ibb.co/1sHhGxn/upload-img.png"
      alt="upload-img"
    />
  );
};

export default UploadWidget;
