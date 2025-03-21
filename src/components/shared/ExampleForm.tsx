'use client';

import React, { useState } from 'react';
import { z } from 'zod';
import { Controller } from 'react-hook-form';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useFormResolver } from '@/hooks/useFormResolver';
import FileDropzone from '@/components/shared/FileDropzone';
import { toastPromise, toastSuccess } from '@/utils/toast';

// Define your form schema
const formSchema = z.object({
  title: z.string().min(2, 'Name is too short'),
  email: z.string().email('Invalid email'),
  file: z.any().refine((file) => file instanceof File, 'A valid file is required'),
});

// Create the component
const MyForm = () => {
  const { control, handleSubmit, formState, resetForm, setValue } = useFormResolver(formSchema);

  const [preview, setPreview] = useState<string | null>(null);

  const handleFileAccepted = (file: File) => {
    setValue('file', file);
    setPreview(URL.createObjectURL(file));
  };

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    toastSuccess('Submitted:' + data);
    resetForm();
    setPreview(null);
  };

  const handleClick = async () => {
    const promise = new Promise((resolve) => setTimeout(resolve, 2000));
    await toastPromise(promise, {
      loading: 'Saving...',
      success: 'Saved successfully!',
      error: 'Failed to save!',
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="title"
        control={control}
        render={({ field }) => (
          <TextField
            label="Title"
            fullWidth
            margin="normal"
            {...field}
            error={!!formState.errors.title}
            helperText={formState.errors.title?.message}
          />
        )}
      />

      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            {...field}
            error={!!formState.errors.email}
            helperText={formState.errors.email?.message}
          />
        )}
      />

      <Box mt={2}>
        <FileDropzone onFileAccepted={handleFileAccepted} previewUrl={preview} />
        {formState.errors.file && (
          <Typography color="error" variant="body2" mt={1}>
            {formState.errors.file.message as string}
          </Typography>
        )}
      </Box>

      <Box mt={3}>
        <Button type="submit" variant="contained" color="primary">
          Upload
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => {
            resetForm();
            setPreview(null);
          }}
          style={{ marginLeft: '1rem' }}
        >
          Reset
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => {
            handleClick();
          }}
          style={{ marginLeft: '1rem' }}
        >
          Promise
        </Button>
      </Box>
    </form>
  );
};

export default MyForm;
