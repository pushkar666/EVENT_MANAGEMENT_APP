/**
 * The EventNotFoundException class extends DataNotFoundException and represents an exception for when an event is not found.
 * @author : PUSHKAR D
 * @version : 1.0
 */
package com.spring_event_mgmt.spring_event_management_project.globalException;

public class EventNotFoundException extends DataNotFoundException{
    public EventNotFoundException(String message) {
        super(message);
    }
}
