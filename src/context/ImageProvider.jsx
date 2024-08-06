"use client";
import React, { useState, createContext, useContext } from "react";

const ImageContext = createContext(null);

export const ImageProvider = ({ children }) => {
  const [imgSrc, setImgSrc] = useState(null);
  return (
    <ImageContext.Provider value={[imgSrc, setImgSrc]}>
      {children}
    </ImageContext.Provider>
  );
};

export const useImageContext = () => useContext(ImageContext);
