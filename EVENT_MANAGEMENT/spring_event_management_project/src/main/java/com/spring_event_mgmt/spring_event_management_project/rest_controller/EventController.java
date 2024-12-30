package com.spring_event_mgmt.spring_event_management_project.rest_controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.spring_event_mgmt.spring_event_management_project.entity.Event;
import com.spring_event_mgmt.spring_event_management_project.globalException.DataNotFoundException;
import com.spring_event_mgmt.spring_event_management_project.globalException.EventCreationException;
import com.spring_event_mgmt.spring_event_management_project.service.EventService;

import lombok.extern.slf4j.Slf4j;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
// import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
// import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;
// import org.springframework.web.bind.annotation.RequestParam;

@Slf4j
@RestController
@CrossOrigin(origins = "http://localhost:3000/")
@RequestMapping("/api/events")
public class EventController {

    @Autowired
    EventService eventService;

    @GetMapping("")
    public ResponseEntity<List<Event>> getAllEvents() {
        List<Event> eventList = eventService.getAllEvents();
        return new ResponseEntity<>(eventList, HttpStatus.OK);
    }

    @GetMapping("/{eventId}")
    public ResponseEntity<Event> getEventById(@PathVariable Integer eventId) {
        Event event = eventService.getEventById(eventId);
        if (event != null) {
            return ResponseEntity.ok(event);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping(value = "", consumes = "application/json")
    public ResponseEntity<String> addEvents(@RequestBody Event event) {
        try {
            Event createdEvent = eventService.createEvent(event);
            return new ResponseEntity<>("EVENT CREATED WITH ID: " + createdEvent.getId(), HttpStatus.CREATED);
        } catch (EventCreationException e) {
            log.error("Failed to add event: {}", e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (RuntimeException e) {
            log.error("Unexpected error while adding event: {}", e);
            return new ResponseEntity<>("EVENT NOT CREATED", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PatchMapping("/{eventId}")
    public ResponseEntity<String> updateEvent(@PathVariable Integer eventId, @RequestBody Event event) {
        try {
            // event.setId(eventId);
            eventService.updateEvent(eventId, event);
            return new ResponseEntity<>("EVENT UPDATED", HttpStatus.OK);
        } catch (DataNotFoundException e) {
            log.error("Failed to update event with ID {}: {}", eventId, e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (RuntimeException e) {
            log.error("Unexpected error while updating event with ID {}: {}", eventId, e);
            return new ResponseEntity<>("EVENT NOT UPDATED", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{eventId}")
    public ResponseEntity<String> deleteEvent(@PathVariable Integer eventId) {
        try {
            eventService.deleteEvent(eventId);
            return new ResponseEntity<>("Event deleted successfully", HttpStatus.OK);
        } catch (RuntimeException e) {
            log.error("Unexpected error while deleting event with ID {}: {}", eventId, e);
            return new ResponseEntity<>("Deletion failed", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}