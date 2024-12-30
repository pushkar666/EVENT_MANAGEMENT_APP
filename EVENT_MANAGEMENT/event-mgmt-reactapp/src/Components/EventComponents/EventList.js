/**
 * EventList Component
 * Displays a list of events with options to update, delete, or view event details.
 *
 * Author: PUSHKAR D
 * Email: pushkardwarkanath@gmail.com
 * GitHub: https://github.com/pushkar666
 */

import React, { useState, useEffect } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Stack,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import AlertTitle from '@mui/material/AlertTitle';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import EventService from '../../services/EventService';

const EventList = () => {
    const [events, setEvents] = useState([]); // Stores the list of events
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false); // Controls delete confirmation dialog visibility
    const [eventIdToDelete, setEventIdToDelete] = useState(null); // Stores the ID of the event to delete
    const navigate = useNavigate(); // Hook for navigation

    // Fetch events when the component loads
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await EventService.getAllEvents();
                setEvents(response.data);
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        };
        fetchEvents();
    }, []);

    // Navigate to the event update page
    const handleUpdateClick = (eventId) => {
        navigate(`/events/${eventId}`);
    };

    // Navigate to the event details page
    const handleGoToEventClick = (eventId) => {
        navigate(`/events/${eventId}/view`);
    };

    // Open delete confirmation dialog
    const handleDeleteClick = (eventId) => {
        setOpenDeleteDialog(true);
        setEventIdToDelete(eventId);
    };

    // Confirm deletion of an event
    const handleDeleteConfirm = async () => {
        try {
            await EventService.deleteEvent(eventIdToDelete);
            // Filter out the deleted event
            const updatedEvents = events.filter((event) => event.id !== eventIdToDelete);
            setEvents(updatedEvents);
            setOpenDeleteDialog(false);
        } catch (error) {
            console.error("Error deleting event:", error);
        }
    };

    // Cancel deletion
    const handleDeleteCancel = () => {
        setOpenDeleteDialog(false);
    };

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }}>
                <TableHead>
                    <TableRow>
                        <TableCell align="center">ID</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Location</TableCell>
                        <TableCell align="left">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {events.map((event) => (
                        <TableRow key={event.id}>
                            <TableCell align="center">{event.id}</TableCell>
                            <TableCell>{event.name}</TableCell>
                            <TableCell>{dayjs(event.date).format('DD-MM-YYYY')}</TableCell>
                            <TableCell>{event.location}</TableCell>
                            <TableCell align="right">
                                <Stack direction="row" spacing={1}>
                                    <Button
                                        variant="contained"
                                        color="success"
                                        size="small"
                                        onClick={() => handleUpdateClick(event.id)}
                                    >
                                        Update
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        color="error"
                                        size="small"
                                        startIcon={<DeleteIcon />}
                                        onClick={() => handleDeleteClick(event.id)}
                                    >
                                        Delete
                                    </Button>
                                    <Button
                                        variant="contained"
                                        onClick={() => handleGoToEventClick(event.id)}
                                    >
                                        Go to Event
                                    </Button>
                                </Stack>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {/* Delete Confirmation Dialog */}
            <Dialog open={openDeleteDialog} onClose={handleDeleteCancel}>
                <DialogTitle>
                    <AlertTitle>Confirm Delete</AlertTitle>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this event? This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteCancel}>Cancel</Button>
                    <Button variant="contained" color="error" onClick={handleDeleteConfirm}>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </TableContainer>
    );
};

export default EventList;
