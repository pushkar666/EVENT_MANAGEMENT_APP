package com.spring_event_mgmt.spring_event_management_project.rest_controller;

import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.spring_event_mgmt.spring_event_management_project.entity.Attendee;
import com.spring_event_mgmt.spring_event_management_project.entity.Event;
// import com.spring_event_mgmt.spring_event_management_project.entity.Event;
import com.spring_event_mgmt.spring_event_management_project.entity.Task;
import com.spring_event_mgmt.spring_event_management_project.globalException.EventNotFoundException;
// import com.spring_event_mgmt.spring_event_management_project.globalException.DataNotFoundException;
import com.spring_event_mgmt.spring_event_management_project.globalException.TaskCreationException;
import com.spring_event_mgmt.spring_event_management_project.globalException.TaskNotFoundException;
import com.spring_event_mgmt.spring_event_management_project.service.AttendeeService;
import com.spring_event_mgmt.spring_event_management_project.service.EventService;
import com.spring_event_mgmt.spring_event_management_project.service.TaskService;

import lombok.extern.slf4j.Slf4j;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Slf4j
@RestController
@CrossOrigin(origins = "http://localhost:3000/")
@RequestMapping("/api/events/{eventId}/attendees/{attendeeId}/tasks")
public class TaskController {

    @Autowired
    TaskService taskService;

    @Autowired
    EventService eventService;

    @Autowired
    AttendeeService attendeeService;

    @GetMapping("")
    public ResponseEntity<List<Task>> getTasksByEventIdAttendeeId(@PathVariable Integer eventId,
            @PathVariable Integer attendeeId) {
        try {
            List<Task> tasks = taskService.getTasksByEventIdAttendeeId(eventId, attendeeId);
            return new ResponseEntity<>(tasks, HttpStatus.OK);
        } catch (TaskNotFoundException e) {
            log.error("Event with ID {} not found: {}", eventId, e.getMessage());
            return new ResponseEntity<>(Collections.emptyList(), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            log.error("Failed to retrieve tasks for event with ID {}: {}", eventId, e.getMessage());
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping(value = "", consumes = "application/json")
    public ResponseEntity<Task> addTask(@PathVariable Integer eventId, @PathVariable Integer attendeeId,
            @RequestBody Task task) {
        try {
            Event event = eventService.getEventById(eventId);
            Attendee attendee = attendeeService.getAttendeeById(attendeeId);
            task.setEvent(event);
            task.setAttendee(attendee);
            Task createdTask = taskService.createTask(task);
            return new ResponseEntity<>(createdTask, HttpStatus.CREATED);
        } catch (EventNotFoundException e) {
            log.error("Event with ID {} not found: {}", eventId, e.getMessage());
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        } catch (TaskNotFoundException e) {
            log.error("Event with ID {} not found: {}", eventId, e.getMessage());
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        } catch (TaskCreationException e) {
            log.error("Failed to create task for event ID {}: {}", eventId, e.getMessage());
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            log.error("Unexpected error while adding task for event ID {}: {}", eventId, e);
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // TASK POST MAPPING{
    // "name": "Task 1",
    // "deadline": "2024-12-25",
    // "status": "PENDING",
    // "event_id": 1
    // }

    // @PatchMapping("/{taskId}")
    // public ResponseEntity<Task> updateTask(@PathVariable Integer eventId,
    // @PathVariable Integer taskId,
    // @RequestBody Task task) {
    // try {
    // Event event = eventService.getEventById(eventId);
    // task.setEvent(event);
    // task.setId(taskId);
    // Task updatedTask = taskService.updateTask(task);
    // return new ResponseEntity<>(updatedTask, HttpStatus.OK);
    // } catch (TaskNotFoundException e) {
    // log.error("Task with ID {} not found: {}", taskId, e.getMessage());
    // return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
    // } catch (Exception e) {
    // log.error("Unexpected error while updating task with ID {} for event ID {}:
    // {}", taskId, eventId,
    // e.getMessage());
    // return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
    // }
    // }

    @PatchMapping("/{taskId}")
    public ResponseEntity<String> updateTask(@PathVariable Integer eventId,
            @PathVariable Integer attendeeId,
            @PathVariable Integer taskId,
            @RequestBody Task task) {
        try {
            log.debug("Received Event ID: {}, Attendee ID: {}", eventId, attendeeId);
            taskService.updateTask(taskId,task);
            return new ResponseEntity<>("TASK UPDATED", HttpStatus.OK);
        } catch (TaskNotFoundException e) {
            log.error("Task with ID {} not found: {}", taskId, e.getMessage());
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            log.error("Unexpected error while updating task with ID {} for event ID {}: ", taskId, eventId, e);
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}