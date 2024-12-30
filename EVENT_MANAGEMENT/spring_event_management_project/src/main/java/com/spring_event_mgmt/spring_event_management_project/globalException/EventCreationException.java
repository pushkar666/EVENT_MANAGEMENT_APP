/**
 * The class EventCreationException extends RuntimeException and is used for handling exceptions related to event creation.
 * @author : PUSHKAR D
 * @version : 1.0
 */
package com.spring_event_mgmt.spring_event_management_project.globalException;

public class EventCreationException extends RuntimeException {
    public EventCreationException(String message) {
        super(message);
    }
}