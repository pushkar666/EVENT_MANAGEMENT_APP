// This code snippet is defining a Java interface named `TaskService` within the package `com.spring_event_mgmt.spring_event_management_project.service`. The interface declares three methods:
/**
 * @author : PUSHKAR D
 * @version : 1.0
 */
package com.spring_event_mgmt.spring_event_management_project.service;

import java.util.List;

import com.spring_event_mgmt.spring_event_management_project.entity.Task;

public interface TaskService {
    public Task createTask(Task task);

    public List<Task> getTasks();

    public Task updateTask(Integer taskId, Task task);

    public List<Task> getTasksByEventId(Integer eventId);

    public List<Task> getTasksByAttendeeId(Integer attendeeId);

    public List<Task> getTasksByEventIdAttendeeId(Integer eventId, Integer attendeeId);

}