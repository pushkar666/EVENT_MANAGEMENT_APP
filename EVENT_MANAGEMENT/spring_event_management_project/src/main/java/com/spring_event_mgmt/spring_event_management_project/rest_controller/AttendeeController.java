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
import com.spring_event_mgmt.spring_event_management_project.globalException.AttendeeCreationException;
import com.spring_event_mgmt.spring_event_management_project.globalException.AttendeeNotFoundException;
import com.spring_event_mgmt.spring_event_management_project.globalException.EventNotFoundException;
// import com.spring_event_mgmt.spring_event_management_project.repository.AttendeeRepository;
import com.spring_event_mgmt.spring_event_management_project.service.AttendeeService;
import com.spring_event_mgmt.spring_event_management_project.service.EventService;

import lombok.extern.slf4j.Slf4j;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
// import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
// import org.springframework.web.bind.annotation.RequestParam;

@Slf4j
@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/events/{eventId}/attendees")
public class AttendeeController {

    @Autowired
    AttendeeService attendeeService;

    @Autowired
    EventService eventService;

    @GetMapping("")
    public ResponseEntity<List<Attendee>> getAllAttendees(@PathVariable Integer eventId) {
        try {
            List<Attendee> attendees = attendeeService.getAttendeesByEventId(eventId);
            return new ResponseEntity<>(attendees, HttpStatus.OK);
        } catch (AttendeeNotFoundException e) {
            log.error("No attendees found", e);
            return new ResponseEntity<>(Collections.emptyList(), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            log.error("Unexpected error while retrieving attendees", e);
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{attendeeId}")
    public ResponseEntity<Attendee> getAttendeeById(@PathVariable Integer attendeeId) {
        Attendee attendee = attendeeService.getAttendeeById(attendeeId);
        if (attendee != null) {
            return ResponseEntity.ok(attendee);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping(value = "")
    public ResponseEntity<Attendee> addAttendee(@PathVariable Integer eventId, @RequestBody Attendee attendee) {
        try {
            Event event = eventService.getEventById(eventId);
            if (event == null) {
                throw new EventNotFoundException("Event with ID " + eventId + " not found");
            }
            attendee.setEvent(event);
            Attendee createdAttendee = attendeeService.addAttendee(attendee);
            return new ResponseEntity<>(createdAttendee, HttpStatus.CREATED);
        } catch (AttendeeCreationException e) {
            log.error("Failed to create attendee: {}", e.getMessage());
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            log.error("Unexpected error while adding attendee", e);
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{attendeeId}")
    public ResponseEntity<String> deleteAttendee(@PathVariable Integer eventId, @PathVariable Integer attendeeId) {
        try {
            attendeeService.deleteAttendee(attendeeId);
            return new ResponseEntity<>("Attendee deleted successfully", HttpStatus.OK);
        } catch (AttendeeNotFoundException e) {
            log.error("Attendee with ID {} not found", attendeeId);
            return new ResponseEntity<>("Attendee not found", HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            log.error("Unexpected error while deleting attendee with ID {}", attendeeId, e);
            return new ResponseEntity<>("Deletion failed", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}