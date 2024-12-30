import axios from 'axios';

const API_URL = 'http://localhost:8080/api/events'; // Replace with your actual API base URL

/**
 * EventService provides methods to interact with an event management API.
 */
const EventService = {
    /**
     * Fetches all events from the API.
     * @returns {Promise<any>} A promise that resolves to an array of events.
     */
    getAllEvents: () => {
        return axios.get(API_URL);
    },

    /**
     * Creates a new event using the provided event data.
     * @param {object} event The event data to be created.
     * @returns {Promise<any>} A promise that resolves to the created event object.
     */
    createEvent: (event) => {
        return axios.post(API_URL, event);
    },

    /**
     * Fetches an event by its ID.
     * @param {string} eventId The ID of the event to be fetched.
     * @returns {Promise<any>} A promise that resolves to the event object with the provided ID.
     */
    getEventById: (eventId) => {
        return axios.get(`${API_URL}/${eventId}`);
    },

    /**
     * Updates an existing event using the provided event ID and data.
     * @param {string} eventId The ID of the event to be updated.
     * @param {object} eventData The data to be used for updating the event.
     * @returns {Promise<any>} A promise that resolves to the updated event object.
     */
    updateEvent: (eventId, eventData) => {
        return axios.patch(`${API_URL}/${eventId}`, eventData);
    },

    /**
     * Deletes an event by its ID.
     * @param {string} eventId The ID of the event to be deleted.
     * @returns {Promise<any>} A promise that resolves after the event is deleted.
     */
    deleteEvent: (eventId) => {
        return axios.delete(`${API_URL}/${eventId}`);
    }
};

export default EventService;