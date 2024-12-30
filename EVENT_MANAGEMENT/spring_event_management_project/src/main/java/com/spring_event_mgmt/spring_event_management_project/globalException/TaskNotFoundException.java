/**
 * The TaskNotFoundException class extends DataNotFoundException and represents an exception for when a task is not found.
 * @author : PUSHKAR D
 * @version : 1.0
 */
package com.spring_event_mgmt.spring_event_management_project.globalException;

public class TaskNotFoundException extends DataNotFoundException {
    public TaskNotFoundException(String message) {
        super(message);
    }
}