import React, { useState } from 'react';
import { Button, TextField, Typography, Snackbar } from '@mui/material';
import AttendeeService from '../../services/AttendeeService';
import { useNavigate, useParams } from 'react-router-dom';

/**
 * Author: PUSHKAR D
 * Email: pushkardwarkanath@gmail.com
 * GitHub: https://github.com/pushkar666
 *
 * @component AttendeeForm
 * 
 * This component renders a form to create a new attendee for a specific event.
 */
const AttendeeForm = () => {
    const { eventId } = useParams(); // Ensure eventId is extracted correctly from URL
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const navigate = useNavigate();

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();

        // Validate form input
        if (!name || !email) {
            setSnackbarMessage('Please enter both name and email.');
            setOpenSnackbar(true);
            return;
        }

        try {
            // Prepare attendee data
            const newAttendee = { name, email };

            // Call the service to create a new attendee
            const response = await AttendeeService.createAttendee(newAttendee, eventId);

            if (response.status === 201) {
                // Clear form on success
                setName('');
                setEmail('');
                setSnackbarMessage('Attendee added successfully!');
                setOpenSnackbar(true);

                // Redirect to the event view page after a short delay
                setTimeout(() => {
                    navigate(`/events/${eventId}/view`);
                }, 2000);
            } else {
                setSnackbarMessage('Failed to add attendee. Please try again.');
                setOpenSnackbar(true);
            }
        } catch (error) {
            console.error('Error adding attendee:', error);
            setSnackbarMessage('Failed to add attendee. Please try again.');
            setOpenSnackbar(true);
        }
    };

    // Handle Snackbar close
    const handleSnackbarClose = () => {
        setOpenSnackbar(false);
    };

    return (
        <div>
            <Typography variant="h5" component="h2">
                Add Attendee
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Name"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Button variant="contained" color="primary" type="submit">
                    Add Attendee
                </Button>
            </form>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                message={snackbarMessage}
            />
        </div>
    );
};

export default AttendeeForm;