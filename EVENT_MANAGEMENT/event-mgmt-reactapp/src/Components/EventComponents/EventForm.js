/**
 * EventForm Component
 * This component is used for adding a new event with attributes like name, description, location, and date.
 *
 * Author: PUSHKAR D
 * Email: pushkardwarkanath@gmail.com
 * GitHub: https://github.com/pushkar666
 */

import React, { useState } from 'react';
import { Button, TextField, Typography, Box } from '@mui/material';
import EventService from '../../services/EventService';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useNavigate } from 'react-router-dom';

const EventForm = () => {
    // State variables for managing form fields
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [date, setDate] = useState(null);

    const navigate = useNavigate(); // Navigation hook

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent default form behavior

        try {
            // Construct the event object
            const newEvent = {
                name,
                description,
                location,
                date: date ? date.toISOString() : null,
            };

            // Make API call to create event
            const response = await EventService.createEvent(newEvent);

            if (response.status === 201) {
                alert('Event created successfully!');
                // Reset form fields
                setName('');
                setDescription('');
                setLocation('');
                setDate(null);
                // Navigate to the homepage
                navigate('/');
            }
        } catch (error) {
            console.error('Error creating event:', error);
            alert('Error creating event. Please try again.');
        }
    };

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
            bgcolor="#f9f9f9"
            padding={3}
        >
            <Box
                component="form"
                onSubmit={handleSubmit}
                bgcolor="#fff"
                padding={4}
                borderRadius={2}
                boxShadow={3}
                width={{ xs: '90%', sm: '70%', md: '50%' }}
            >
                <Typography variant="h5" component="h2" textAlign="center" gutterBottom>
                    ADD EVENT
                </Typography>
                {/* Name Input */}
                <TextField
                    label="Name"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                {/* Description Input */}
                <TextField
                    label="Description"
                    variant="outlined"
                    multiline
                    rows={4}
                    fullWidth
                    margin="normal"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                {/* Location Input */}
                <TextField
                    label="Location"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                />
                {/* Date Picker */}
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']} sx={{ marginTop: 2 }}>
                        <DatePicker
                            label="Date"
                            value={date}
                            onChange={(newValue) => {
                                setDate(newValue);
                            }}
                        />
                    </DemoContainer>
                </LocalizationProvider>
                {/* Submit Button */}
                <Box textAlign="center" marginTop={3}>
                    <Button variant="contained" color="primary" type="submit">
                        Add Event
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default EventForm;
