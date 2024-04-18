import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Card, CardContent, Box } from '@mui/material';

export default function TasksDetails() {
     //מידע שנשלח בשורת הכתובת
  const { nameTasks } = useParams();
  const [task, setTask] = useState({});
  //:מסתכל על מחזור החיים של הקומפוננטה
  //טעינה , עדכון מצב, עזיבת הקומפוננטה
  //נדע על איזה חלק ממחזור החיים אנחנו רוצים להשפיע לפי הסוגריים המרבועות בהוק
  //[] -> טעינה של הקומפוננטה
  //[state1, state2, ...] --> עדכון 
  //return ()=>{} --> עזיבת הקומפוננטה
  useEffect(() => {
    let allTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTask(allTasks.find((item) => item.nameTasks === nameTasks));
  }, [nameTasks]);

  return (
    <Container maxWidth="lg" className="task-details-container">
      <Box my={4}>
        <Card className="task-details-card">
          <CardContent>
            <Typography variant="h4" component="div" className="task-details-title" gutterBottom>
              {task.nameTasks}
            </Typography>
            <Typography variant="body1" className="task-details-info" gutterBottom>
              Category: {task.Category}
            </Typography>
            <Typography variant="body1" className="task-details-info" gutterBottom>
              Details: {task.details}
            </Typography>
            <Typography variant="body1" className="task-details-info" gutterBottom>
              Due Date: {task.dateFinish}
            </Typography>
            <Typography
              variant="body1"
              className={`task-details-info ${task.done ? 'task-details-status-done' : 'task-details-status-pending'}`}
            >
              Status: {task.done ? 'Done' : 'Still not done'}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}
