"use client";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

import { useAppContext } from "../context/AppContext";

const Dropzone = ({ className }) => {
  const { setAcceptingFiles } = useAppContext();
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps({
        className: className,
      })}
    >
      <input {...getInputProps()} />
      {setAcceptingFiles(isDragActive)}
    </div>
  );
};

export default Dropzone;
