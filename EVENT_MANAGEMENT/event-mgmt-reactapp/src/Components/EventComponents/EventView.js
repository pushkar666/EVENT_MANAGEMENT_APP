import React, { useState, useEffect } from "react";
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Box,
    CircularProgress,
} from "@mui/material";
import EventService from "../../services/EventService";
import dayjs from "dayjs";
import { useParams } from "react-router-dom";
import AttendeeList from "../AttendeeComponents/AttendeeList";

const EventView = () => {
    const { eventId } = useParams();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const response = await EventService.getEventById(eventId);
                setEvent(response.data);
            } catch (error) {
                console.error("Error fetching event details:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchEvent();
    }, [eventId]);

    if (loading) {
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="100vh"
            >
                <CircularProgress />
            </Box>
        );
    }

    if (!event) {
        return (
            <Typography variant="h5" textAlign="center" marginTop={5}>
                Event not found.
            </Typography>
        );
    }

    return (
        <Card sx={{ maxWidth: 600, mx: "auto", mt: 5, boxShadow: 3 }}>
            {event.imageUrl && (
                <CardMedia
                    component="img"
                    height="200"
                    image={event.imageUrl}
                    alt={event.name}
                />
            )}
            <CardContent>
                <Typography variant="h5" component="h2" gutterBottom>
                    {event.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                    Date: {dayjs(event.date).format("DD-MM-YYYY")}
                </Typography>
                <Typography variant="body1" paragraph>
                    {event.description}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Location: {event.location}
                </Typography>
                <AttendeeList eventId={eventId} />
            </CardContent>
        </Card>
    );
};

export default EventView;
