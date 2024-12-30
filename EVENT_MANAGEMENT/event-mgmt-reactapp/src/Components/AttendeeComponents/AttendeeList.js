/**
 * Component: AttendeeList
 * Description: 
 * This component fetches and displays a list of attendees for a specific event.
 * It provides functionalities to add, delete, and navigate to tasks of attendees.
 * 
 * Features:
 * - Fetch attendees from the server.
 * - Navigate to "Add Attendee" page.
 * - Delete an attendee with confirmation dialog.
 * - Display a snackbar for feedback messages.
 * - Navigate to tasks of a specific attendee.
 * 
 * Author: PUSHKAR D
 * Email: pushkardwarkanath@gmail.com
 * GitHub: https://github.com/pushkar666
 */

import React, { useState, useEffect } from "react";
import {
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar,
    Button,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Snackbar,
    CircularProgress,
} from "@mui/material";
import RemoveCircleOutlineSharpIcon from "@mui/icons-material/RemoveCircleOutlineSharp";
import AttendeeService from "../../services/AttendeeService";
import { useNavigate } from 'react-router-dom';

const AttendeeList = ({ eventId }) => {
    const [attendees, setAttendees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [selectedAttendeeId, setSelectedAttendeeId] = useState(null);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAttendees = async () => {
            try {
                const response = await AttendeeService.getAllAttendees(eventId);
                setAttendees(response.data);
            } catch (error) {
                console.error("Error fetching attendees:", error);
                setSnackbarMessage("Error fetching attendees!");
                setOpenSnackbar(true);
            } finally {
                setLoading(false);
            }
        };

        fetchAttendees();
    }, [eventId]);

    const handleAddAttendee = () => {
        // Navigate to an "Add Attendee" page
        navigate(`/events/${eventId}/add-attendees`);
    };

    const handleDeleteAttendee = (attendeeId) => {
        setSelectedAttendeeId(attendeeId);
        setOpenDeleteDialog(true);
    };

    const handleDeleteConfirm = async () => {
        setOpenDeleteDialog(false);

        try {
            await AttendeeService.deleteAttendee(eventId, selectedAttendeeId);
            setAttendees((prevAttendees) =>
                prevAttendees.filter((attendee) => attendee.id !== selectedAttendeeId)
            );
            setSnackbarMessage("Attendee deleted successfully!");
            setOpenSnackbar(true);
        } catch (error) {
            console.error("Error deleting attendee:", error);
            setSnackbarMessage("Error deleting attendee!");
            setOpenSnackbar(true);
        }
    };

    const handleDeleteCancel = () => {
        setOpenDeleteDialog(false);
    };

    const handleSnackbarClose = () => {
        setOpenSnackbar(false);
    };

    const handleNavigateToTasks = (attendeeId) => {
        // Navigate to TaskList for the specific attendee
        navigate(`/events/${eventId}/attendees/${attendeeId}/tasks`);
    };

    if (loading) {
        return <CircularProgress sx={{ display: "block", margin: "0 auto", mt: 3 }} />;
    }

    return (
        <div>
            <Button
                variant="contained"
                color="primary"
                onClick={handleAddAttendee}
                sx={{ mt: 3, mb: 2 }}
            >
                Add Attendee
            </Button>
            <List>
                {attendees.map((attendee) => (
                    <ListItem
                        key={attendee.id}
                        secondaryAction={
                            <IconButton onClick={() => handleDeleteAttendee(attendee.id)}>
                                <RemoveCircleOutlineSharpIcon color="error" />
                            </IconButton>
                        }
                    >
                        <ListItemAvatar>
                            <Avatar
                                sx={{ bgcolor: "primary.main" }}
                                onClick={() => handleNavigateToTasks(attendee.id)}  // Make Avatar clickable
                            >
                                {attendee.name[0].toUpperCase()}
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={attendee.name}
                            secondary={attendee.email}
                            onClick={() => handleNavigateToTasks(attendee.id)}  // Make Text clickable
                            sx={{ cursor: "pointer" }}  // Adding a pointer cursor to indicate it's clickable
                        />
                    </ListItem>
                ))}
            </List>
            <Dialog open={openDeleteDialog} onClose={handleDeleteCancel}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this attendee?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteCancel}>Cancel</Button>
                    <Button
                        variant="contained"
                        color="error"
                        onClick={handleDeleteConfirm}
                    >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
                message={snackbarMessage}
            />
        </div>
    );
};

export default AttendeeList;
