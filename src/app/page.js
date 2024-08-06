import React from "react";
import Upload from "../components/Upload";
import { LoadingProvider } from "../context/LoadingProvider";

const page = () => {
  return (
    <LoadingProvider>
      <Upload />
    </LoadingProvider>
  );
};

export default page;
