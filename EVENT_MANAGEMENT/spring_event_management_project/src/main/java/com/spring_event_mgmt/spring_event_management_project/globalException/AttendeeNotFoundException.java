/**
 * The `AttendeeNotFoundException` class extends `DataNotFoundException` and represents an exception for when an attendee is not found.
 * @author : PUSHKAR D
 * @version : 1.0
 */
package com.spring_event_mgmt.spring_event_management_project.globalException;

public class AttendeeNotFoundException extends DataNotFoundException {
    public AttendeeNotFoundException(String message) {
        super(message);
    }
}