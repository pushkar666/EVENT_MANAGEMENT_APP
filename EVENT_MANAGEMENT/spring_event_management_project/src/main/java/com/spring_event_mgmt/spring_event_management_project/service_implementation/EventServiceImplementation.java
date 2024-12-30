/**
 * The EventServiceImplementation class provides methods to create, retrieve, update, and delete events using an EventRepository in a Spring application.
 * @author : PUSHKAR D
 * @version : 1.0
 */
package com.spring_event_mgmt.spring_event_management_project.service_implementation;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.spring_event_mgmt.spring_event_management_project.entity.Event;
import com.spring_event_mgmt.spring_event_management_project.globalException.DataNotFoundException;
import com.spring_event_mgmt.spring_event_management_project.globalException.EventCreationException;
import com.spring_event_mgmt.spring_event_management_project.repository.EventRepository;
import com.spring_event_mgmt.spring_event_management_project.service.EventService;


import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class EventServiceImplementation implements EventService {

    @Autowired
    EventRepository eventRepository;

    @Override
    @Transactional
    public Event createEvent(Event event) {
        try {
            return eventRepository.save(event);
        } catch (DataIntegrityViolationException e) {
            log.error("Failed to create event due to data integrity violation", e);
            throw new EventCreationException("Event creation failed. Please check the data for uniqueness constraints.");
        } catch (Exception e) {
            log.error("Unexpected error creating event", e);
            throw new RuntimeException("An unexpected error occurred while creating the event.");
        }
    }

    @Override
    @Transactional(readOnly = true)
    public Event getEventById(Integer id) {
        Optional<Event> optionalEvent = eventRepository.findById(id);
        if (optionalEvent.isPresent()) {
            return optionalEvent.get();
        } else {
            throw new DataNotFoundException("No event found with ID: " + id);
        }
    }

    @Override
    @Transactional(readOnly = true)
    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    @Override
    public Event updateEvent(Integer id, Event event) {
        Optional<Event> optionalEvent = eventRepository.findById(id);
        if (optionalEvent.isPresent()) {
            return eventRepository.save(event);
        } else {
            throw new DataNotFoundException("Event not found for update with ID: " + id);
        }
    }

    @Override
    public void deleteEvent(Integer id) {
        try {
            eventRepository.deleteById(id);
        } catch (DataNotFoundException e) {
            // Already handled in getEventById
            throw e;
        } catch (Exception e) {
            log.error("Failed to delete event with ID: {}", id, e);
            throw new RuntimeException("An unexpected error occurred while deleting the event.");
        }
    }
}
