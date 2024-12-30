/**
 * The AttendeeCreationException class extends RuntimeException and is used for handling exceptions related to attendee creation in a Spring event management project.
 * @author : PUSHKAR D
 * @version : 1.0
 */
package com.spring_event_mgmt.spring_event_management_project.globalException;

public class AttendeeCreationException extends RuntimeException {
    public AttendeeCreationException(String message) {
        super(message);
    }
}