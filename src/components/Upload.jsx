"use client";
import { useImageContext } from "../context/ImageProvider";
import React, { useRef } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useLoadingContext } from "../context/LoadingProvider";

const Upload = () => {
  const [imgSrc, setImgSrc] = useImageContext();
  const router = useRouter();
  const inputRef = useRef(null);
  const [loading, setLoading] = useLoadingContext();
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setLoading(true);
    // if (file) {
    //   const reader = new FileReader();
    //   reader.onload = () => {
    //     setImgSrc(reader.result);
    //   };
    //   reader.readAsDataURL(file);
    // }
    axios
      .post(
        "/api/remove-background",
        { file },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setImgSrc(res.data.dataURL);
        router.push("/editor");
        setLoading(false);
      });
    // router.push("/editor");
  };
  if (loading) {
    return (
      <div className="bg-black w-screen h-screen flex justify-center items-center">
        <span class="loader"></span>
      </div>
    );
  }
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center bg-black text-white">
      <input
        type="file"
        ref={inputRef}
        onChange={handleImageUpload}
        className="hidden"
      />
      <button
        className="bg-blue-800 rounded-3xl p-3"
        onClick={(e) => inputRef.current.click()}
      >
        Upload File
      </button>
    </div>
  );
};

export default Upload;
