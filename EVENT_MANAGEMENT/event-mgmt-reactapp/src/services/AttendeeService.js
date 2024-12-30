import axios from 'axios';

// Base API URL (don't hardcode eventId here)
const API_URL = 'http://localhost:8080/api/events';

/**
 * AttendeeService provides methods to interact with attendees of events managed by an API.
 */
const AttendeeService = {
    /**
     * Creates a new attendee for a specific event.
     * @param {object} newAttendee The data of the attendee to be created.
     * @param {string} eventId The ID of the event the attendee is associated with.
     * @returns {Promise<any>} A promise that resolves to the response object from the API after creating the attendee.
     * @throws {Error} Re-throws any errors that occur during the API call.
     */
    createAttendee: async (newAttendee, eventId) => {
        try {
            const response = await axios.post(
                `${API_URL}/${eventId}/attendees`, // Correct dynamic URL with eventId
                newAttendee
            );
            return response;
        } catch (error) {
            console.error('Error adding attendee:', error);
            throw error; // Re-throw the error so the caller can handle it
        }
    },

    /**
     * Fetches all attendees for a specific event.
     * @param {string} eventId The ID of the event to get attendees for.
     * @returns {Promise<any>} A promise that resolves to the response object from the API containing the list of attendees.
     * @throws {Error} Re-throws any errors that occur during the API call.
     */
    getAllAttendees: async (eventId) => {
        try {
            const response = await axios.get(`${API_URL}/${eventId}/attendees`);
            return response;
        } catch (error) {
            console.error('Error fetching attendees:', error);
            throw error;
        }
    },

    /**
     * Gets a specific attendee by ID for a given event.
     * @param {string} eventId The ID of the event the attendee is associated with.
     * @param {string} attendeeId The ID of the attendee to fetch.
     * @returns {Promise<any>} A promise that resolves to the response object from the API containing the attendee data.
     * @throws {Error} Re-throws any errors that occur during the API call.
     */
    getAttendeeById: async (eventId, attendeeId) => {
        try {
            const response = await axios.get(`${API_URL}/${eventId}/attendees/${attendeeId}`);
            return response;
        } catch (error) {
            console.error('Error fetching attendee:', error);
            throw error;
        }
    },

    /**
     * Deletes an attendee by ID for a given event.
     * @param {string} eventId The ID of the event the attendee is associated with.
     * @param {string} attendeeId The ID of the attendee to delete.
     * @returns {Promise<any>} A promise that resolves to the response object from the API after deleting the attendee.
     * @throws {Error} Re-throws any errors that occur during the API call.
     */
    deleteAttendee: async (eventId, attendeeId) => {
        try {
            const response = await axios.delete(`${API_URL}/${eventId}/attendees/${attendeeId}`);
            return response;
        } catch (error) {
            console.error('Error deleting attendee:', error);
            throw error;
        }
    },
};

export default AttendeeService;