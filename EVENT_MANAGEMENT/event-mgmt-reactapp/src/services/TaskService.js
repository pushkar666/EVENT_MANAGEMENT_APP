import axios from 'axios';

const API_URL = 'http://localhost:8080/api/events'; // Replace with your actual API base URL

const TaskService = {
    /**
     * Create a new task for a specific event and attendee.
     * @param {number} eventId - The ID of the event.
     * @param {number} attendeeId - The ID of the attendee.
     * @param {object} task - The task data to be created.
     * @returns {Promise} Axios Promise with the response.
     */
    createTask: async (eventId, attendeeId, task) => {
        try {
            const response = await axios.post(`${API_URL}/${eventId}/attendees/${attendeeId}/tasks`, task);
            return response;
        } catch (error) {
            console.error('Error creating task:', error);
            throw error;
        }
    },

    /**
     * Get tasks for a specific event and attendee.
     * @param {number} eventId - The ID of the event.
     * @param {number} attendeeId - The ID of the attendee.
     * @returns {Promise} Axios Promise with the response containing the tasks.
     */
    getTasksByEventIdAndAttendeeId: async (eventId, attendeeId) => {
        try {
            const response = await axios.get(`${API_URL}/${eventId}/attendees/${attendeeId}/tasks`);
            return response;
        } catch (error) {
            console.error('Error fetching tasks:', error);
            throw error;
        }
    },

    /**
     * Update the status of a task.
     * @param {number} eventId - The ID of the event.
     * @param {number} attendeeId - The ID of the attendee.
     * @param {number} taskId - The ID of the task to be updated.
     * @param {object} task - The updated task object.
     * @returns {Promise} Axios Promise with the response.
     */
    updateTaskStatus: async (eventId, attendeeId, taskId, task) => {
        try {
            const response = await axios.patch(`${API_URL}/${eventId}/attendees/${attendeeId}/tasks/${taskId}`, task);
            return response;
        } catch (error) {
            console.error('Error updating task status:', error);
            throw error;
        }
    },
};

export default TaskService;
