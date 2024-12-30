import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import EventService from '../../services/EventService';
import { Button, TextField, Typography, Box } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';

const EventUpdate = () => {
    const { eventId } = useParams();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [date, setDate] = useState(null); // Initialize with null

    const navigate = useNavigate();

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const response = await EventService.getEventById(eventId);
                setName(response.data.name);
                setDescription(response.data.description);
                setLocation(response.data.location);
                // Convert date to dayjs object
                setDate(dayjs(response.data.date));
            } catch (error) {
                console.error("Error fetching event details:", error);
            }
        };
        fetchEvent();
    }, [eventId]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const updatedEvent = {
                id: eventId, // Ensure this is correct
                name,
                description,
                location,
                date: date ? date.toISOString() : null,
            };
            const response = await EventService.updateEvent(eventId, updatedEvent);
            if (response.status === 200) {
                alert('Event updated successfully!');
                navigate('/'); // Redirect after successful update
            }
        } catch (error) {
            console.error("Error updating event:", error);
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
                <TextField
                    label="Name"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
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
                <TextField
                    label="Location"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                />
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
                <Box textAlign="center" marginTop={3}>
                    <Button variant="contained" color="primary" type="submit">
                        Add Event
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default EventUpdate;