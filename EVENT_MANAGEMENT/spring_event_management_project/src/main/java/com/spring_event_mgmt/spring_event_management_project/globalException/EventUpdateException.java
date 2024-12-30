/**
 * The EventUpdateException class is a custom RuntimeException used for handling exceptions related to updating events.
 * @author : PUSHKAR D
 * @version : 1.0
 */
package com.spring_event_mgmt.spring_event_management_project.globalException;

public class EventUpdateException extends RuntimeException {
    public EventUpdateException(String message) {
        super(message);
    }
}