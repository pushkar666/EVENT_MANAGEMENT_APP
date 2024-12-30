import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Paper, Grid } from '@mui/material';
import TaskService from '../../services/TaskService';
import TaskForm from './TaskForm';
import TaskStatusUpdate from './TaskStatusUpdate';
import dayjs from 'dayjs';


const TaskList = () => {
    const { eventId, attendeeId } = useParams();
    const [tasks, setTasks] = useState([]);

    const fetchTasks = async () => {
        try {
            const response = await TaskService.getTasksByEventIdAndAttendeeId(eventId, attendeeId);
            setTasks(response.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    const handleTaskCreated = (newTask) => {
        setTasks((prevTasks) => [...prevTasks, newTask]);
    };

    const handleStatusUpdated = (taskId, newStatus) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) => (task.id === taskId ? { ...task, status: newStatus } : task))
        );
    };

    useEffect(() => {
        fetchTasks();
    }, [eventId, attendeeId]);

    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h4" sx={{ mb: 3 }}>
                Task List
            </Typography>
            <Paper sx={{ p: 3, mb: 4 }}>
                <TaskForm eventId={eventId} attendeeId={attendeeId} onTaskCreated={handleTaskCreated} />
            </Paper>
            <Grid container spacing={2}>
                {tasks.map((task) => (
                    <Grid item xs={12} key={task.id}>
                        <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Box>
                                <Typography variant="h6">{task.name}</Typography>
                                <Typography variant="body2">Deadline: {dayjs(task.deadline).format('DD-MM-YYYY')}</Typography>
                            </Box>
                            <TaskStatusUpdate
                                eventId={eventId}
                                attendeeId={attendeeId}
                                task={task}
                                onStatusUpdated={handleStatusUpdated}
                            />
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default TaskList;
