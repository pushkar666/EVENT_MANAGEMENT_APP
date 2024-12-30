/**
 * The TaskServiceImplementation class provides methods to create, retrieve, and update Task entities using a TaskRepository in a Spring application.
 * @author : PUSHKAR D
 * @version : 1.0
 */
package com.spring_event_mgmt.spring_event_management_project.service_implementation;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.spring_event_mgmt.spring_event_management_project.entity.Attendee;
// import com.spring_event_mgmt.spring_event_management_project.entity.Event;
import com.spring_event_mgmt.spring_event_management_project.entity.Task;
import com.spring_event_mgmt.spring_event_management_project.globalException.TaskCreationException;
import com.spring_event_mgmt.spring_event_management_project.globalException.TaskNotFoundException;
// import com.spring_event_mgmt.spring_event_management_project.repository.EventRepository;
import com.spring_event_mgmt.spring_event_management_project.repository.TaskRepository;
import com.spring_event_mgmt.spring_event_management_project.service.AttendeeService;
import com.spring_event_mgmt.spring_event_management_project.service.EventService;
import com.spring_event_mgmt.spring_event_management_project.service.TaskService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class TaskServiceImplementation implements TaskService {

    @Autowired
    TaskRepository taskRepository;

    @Autowired
    EventService eventService;

    @Autowired
    AttendeeService attendeeService;

    @Override
    @Transactional
    public Task createTask(Task task) {
        try {
            return taskRepository.save(task);
        } catch (DataIntegrityViolationException e) {
            log.error("Failed to create task due to data integrity violation", e);
            throw new TaskCreationException("Task creation failed. Please check the data for uniqueness constraints.");
        } catch (Exception e) {
            log.error("Unexpected error creating task", e);
            throw new RuntimeException("An unexpected error occurred while creating the task.");
        }
    }

    @Override
    public Task updateTask(Integer taskId, Task task) {
        Optional<Task> optionalTask = taskRepository.findById(taskId);
        if (optionalTask.isPresent()) {
            return taskRepository.save(task); // Save and return the updated task
        } else {
            throw new TaskNotFoundException("Task not found with ID: " + task.getId());
        }
    }

    @Override
    @Transactional(readOnly = true)
    public List<Task> getTasksByEventId(Integer eventId) {
        try {
            return taskRepository.findByEventId(eventId);
        } catch (Exception e) {
            log.error("Failed to retrieve tasks by event ID: {}", eventId, e);
            throw new TaskNotFoundException("Tasks not found");
        }
    }

    @Override
    @Transactional(readOnly = true)
    public List<Task> getTasksByAttendeeId(Integer attendeeId) {
        try {
            return taskRepository.findByAttendeeId(attendeeId);
        } catch (Exception e) {
            log.error("Failed to retrieve tasks by attendee ID: {}", attendeeId, e);
            throw new TaskNotFoundException("Tasks not found");
        }
    }

    @Override
    @Transactional(readOnly = true)
    public List<Task> getTasks() {
        try {
            return taskRepository.findAll();
        } catch (Exception e) {
            log.error("Failed to retrieve all tasks");
            throw new TaskNotFoundException("Tasks not found");
        }
    }

    @Override
    public List<Task> getTasksByEventIdAttendeeId(Integer eventId, Integer attendeeId) {
        try {
            List<Attendee> attendees = attendeeService.getAttendeesByEventId(eventId);

            Attendee attendee = attendees.stream()
                    .filter(a -> a.getId().equals(attendeeId))
                    .findFirst()
                    .orElse(null);

            if (attendee == null) {
                return Collections.emptyList();
            }

            return attendee.getAssignedTasks();

        } catch (Exception e) {
            log.error("Error retrieving tasks for event ID {} and attendee ID {}", eventId, attendeeId, e);
            throw new RuntimeException("Failed to retrieve tasks.", e);
        }
    }

}
