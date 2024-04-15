"use client";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

import { useChat } from "../hooks/useChat";

const Dropzone = ({ className }) => {
  const { setAcceptingFiles } = useChat();
  
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
