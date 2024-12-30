import React, { useState } from 'react';
import { Box, Button, TextField, Grid } from '@mui/material';
import TaskService from '../../services/TaskService';

const TaskForm = ({ eventId, attendeeId, onTaskCreated }) => {
    const [taskName, setTaskName] = useState('');
    const [taskDeadline, setTaskDeadline] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const newTask = { name: taskName, deadline: taskDeadline, status: 'PENDING' };
        try {
            const response = await TaskService.createTask(eventId, attendeeId, newTask);
            onTaskCreated(response.data);
            setTaskName('');
            setTaskDeadline('');
        } catch (error) {
            console.error('Error creating task:', error);
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        label="Task Name"
                        value={taskName}
                        onChange={(e) => setTaskName(e.target.value)}
                        required
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        type="date"
                        label="Deadline"
                        value={taskDeadline}
                        onChange={(e) => setTaskDeadline(e.target.value)}
                        InputLabelProps={{ shrink: true }}
                        required
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" type="submit">
                        Add Task
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default TaskForm;
