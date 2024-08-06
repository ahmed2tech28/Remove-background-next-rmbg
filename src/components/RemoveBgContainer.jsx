"use client";
import React, { useEffect } from "react";
import { UIEvent, PhotoEditorSDKUI } from "photoeditorsdk";
import { useImageContext } from "../context/ImageProvider";

const RemoveBgContainer = () => {
  const [imgSrc, setImgSrc] = useImageContext();
  useEffect(() => {
    const initEditor = async () => {
      const editor = await PhotoEditorSDKUI.init({
        container: "#editor",
        image: imgSrc, // Image url or Image path relative to assets folder
        // Please replace this with your license: https://img.ly/dashboard
        license: "",
      });
      console.log("PhotoEditorSDK for Web is ready!");
      editor.on(UIEvent.EXPORT, (imageSrc) => {
        console.log("Exported ", imageSrc);
      });
    };

    initEditor();
  }, []);

  return <div id="editor" style={{ width: "100vw", height: "100vh" }} />;
};

export default RemoveBgContainer;
