"use client";
import { useCallback, useState } from "react";

import { useDropzone } from "react-dropzone";

import { useChatContext } from "../hooks/useChatAi";
const Dropzone = ({ className }) => {
  const { setAcceptingFiles } = useChatContext();
  const [files, setFiles] = useState(null);

  const onFileUpload = async () => {
    console.log('Uploading file:', files);
    const formData = new FormData();
    formData.append("file", files);
    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log('File successfully uploaded');
      } else {
        console.error('Upload failed');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const onDrop = useCallback((acceptedFiles) => {
    setFiles(acceptedFiles);
    onFileUpload();
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
