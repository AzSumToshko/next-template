import React from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';

type FileDropzoneProps = {
  // eslint-disable-next-line no-unused-vars
  onFileAccepted: (file: File) => void;
  previewUrl?: string | null;
};

const FileDropzone: React.FC<FileDropzoneProps> = ({ onFileAccepted, previewUrl }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': [],
    },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        onFileAccepted(file);
      }
    },
  });

  return (
    <Box
      {...getRootProps()}
      sx={{
        border: '2px dashed #aaa',
        borderRadius: '8px',
        padding: '1.5rem',
        textAlign: 'center',
        cursor: 'pointer',
        backgroundColor: isDragActive ? '#f0f0f0' : 'inherit',
        transition: 'background-color 0.2s ease',
      }}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <Typography variant="body1">Drop the file here ...</Typography>
      ) : (
        <Typography variant="body1">Drag & drop an image, or click to select</Typography>
      )}
      {previewUrl && (
        <Image
          width={150}
          height={150}
          src={previewUrl}
          alt="Preview"
          style={{ width: '150px', marginTop: '1rem', borderRadius: '6px' }}
        />
      )}
    </Box>
  );
};

export default FileDropzone;
