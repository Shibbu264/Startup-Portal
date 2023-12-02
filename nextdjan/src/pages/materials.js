import React from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';

export default function Bot() {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: async (acceptedFiles) => {
      const formData = new FormData();
      formData.append('file', acceptedFiles[0]);
      alert(`${acceptedFiles[0].name} uploaded !`)
      try {
        // Assuming your API endpoint is "/api/upload"
        const response = await axios.post("/api/upload", formData);
        console.log(response.data); // Handle the response as needed
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    },
    multiple: false,
    accept: {
      'application/pdf': ['.pdf'],
    },
  });

  return (
    <>
     <h1 className='text-center text-red-500 text-3xl my-4'>
        Hello, this is a great learner bot!
      </h1>
      <div
        {...getRootProps()}
        className={` w-96 rounded-lg mt-12 h-96 block mx-auto ${isDragActive ? 'active bg-blue-300' : 'bg-blue-500'}`}
      >
        <input type='file' {...getInputProps()} />
        <p className='flex justify-center text-2xl self-center py-[40%] '>Drag your Book here!</p>
      </div>

<button className='my-4 bg-green-500 rounded-lg block text-2xl mx-auto px-2 py-1 '>Ask!</button>
     
    </>
  );
}
