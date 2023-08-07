import { cloneElement, useEffect, useRef, useContext, useState } from "react";
import axios from "axios";
import "./UploadWidget.css";

const UploadWidget = ({setImage, children }) => {
  const cloud = useRef();
  const widget = useRef();
  useEffect(() => {
    cloud.current = window.cloudinary;
    widget.current = cloud.current.createUploadWidget(
      {
        cloudName: "realestatedashboard",
        uploadPreset: "default_upload",
        sources: ["local", "camera", "url"],
      },
      function (err, results) {
        if (!err && results && results.event == "success") {
          setImage(results.info.url);
        }
      }
    );
  }, []);

  return (
    <img
      onClick={() => widget.current.open()}
      id="upload-img"
      src="https://i.ibb.co/1sHhGxn/upload-img.png"
      alt="upload-img"
    />
  );
};

export default UploadWidget;
