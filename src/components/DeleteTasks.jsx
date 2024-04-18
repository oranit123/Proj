import React from "react";
import { Container, Typography, Grid, Card, CardContent, Button, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export default function DeleteTasks({ taskName, onDelete }) {
  function handleDelete() {
    onDelete(taskName);
  }

  return (
    <IconButton color="primary" onClick={handleDelete}>
      <DeleteIcon />
    </IconButton>
  );
}
