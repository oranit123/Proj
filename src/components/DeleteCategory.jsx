import React from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

export default function DeleteCategory({ categoryName, onDelete }) {
  function handleDelete() {
    onDelete(categoryName);
  }

  return (
    <IconButton onClick={handleDelete} color="secondary">
      <DeleteIcon />
    </IconButton>
  );
}
