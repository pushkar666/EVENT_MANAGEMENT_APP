import React from 'react';
import { MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import TaskService from '../../services/TaskService';

const TaskStatusUpdate = ({ eventId, attendeeId, task, onStatusUpdated }) => {
    const handleStatusChange = async (event) => {
        const newStatus = event.target.value;
        const updatedTask = { ...task, status: newStatus };
        try {
            await TaskService.updateTaskStatus(eventId, attendeeId, task.id, updatedTask);
            onStatusUpdated(task.id, newStatus);
        } catch (error) {
            console.error('Error updating task status:', error);
        }
    };

    return (
        <FormControl>
            <InputLabel>Status</InputLabel>
            <Select
                value={task.status}
                onChange={handleStatusChange}
                label="Status"
                sx={{ minWidth: 120 }}
            >
                <MenuItem value="PENDING">PENDING</MenuItem>
                <MenuItem value="COMPLETED">COMPLETED</MenuItem>
                <MenuItem value="CANCELLED">CANCELLED</MenuItem>
            </Select>
        </FormControl>
    );
};

export default TaskStatusUpdate;
