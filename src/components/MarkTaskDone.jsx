import React from "react";
import { IconButton } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export default function MarkTaskDone({ taskName, onToggleDone }) {
    function handleToggleDone() {
       onToggleDone(taskName);
    }
   
    return (
      <IconButton color="primary" onClick={handleToggleDone}>
        <CheckCircleIcon />
      </IconButton>
    );
}
