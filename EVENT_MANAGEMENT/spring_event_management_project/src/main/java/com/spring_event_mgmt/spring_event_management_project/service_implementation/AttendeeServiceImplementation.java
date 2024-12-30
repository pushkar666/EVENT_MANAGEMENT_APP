/**
 * The AttendeeServiceImplementation class provides methods to manage attendees in an event management system.
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

import com.spring_event_mgmt.spring_event_management_project.entity.Attendee;
import com.spring_event_mgmt.spring_event_management_project.globalException.AttendeeCreationException;
import com.spring_event_mgmt.spring_event_management_project.globalException.AttendeeNotFoundException;
import com.spring_event_mgmt.spring_event_management_project.repository.AttendeeRepository;
import com.spring_event_mgmt.spring_event_management_project.service.AttendeeService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class AttendeeServiceImplementation implements AttendeeService {

    @Autowired
    AttendeeRepository attendeeRepository;

    @Override
    @Transactional
    public Attendee addAttendee(Attendee attendee) {
        try {
            return attendeeRepository.save(attendee);
        } catch (DataIntegrityViolationException e) {
            log.error("Failed to create attendee due to data integrity violation", e);
            throw new AttendeeCreationException(
                    "Attendee creation failed. Please check the data for uniqueness constraints.");
        } catch (Exception e) {
            log.error("Unexpected error creating attendee", e);
            throw new RuntimeException("An unexpected error occurred while creating the attendee.");
        }
    }

    @Override
    @Transactional(readOnly = true)
    public List<Attendee> getAttendees() {
        return attendeeRepository.findAll();
    }

    @Override
    public Attendee getAttendeeById(Integer id) {
        Optional<Attendee> optionalAttendee = attendeeRepository.findById(id);
        if (optionalAttendee.isPresent()) {
            return optionalAttendee.get();
        } else {
            throw new AttendeeNotFoundException("Attendee not found with ID: " + id);
        }
    }

    @Override
    public void deleteAttendee(Integer id) {
        try {
            attendeeRepository.deleteById(id);
        } catch (AttendeeNotFoundException e) {
            // Already handled in getAttendeeById
            throw e;
        } catch (Exception e) {
            log.error("Failed to delete attendee with ID: {}", id, e);
            throw new RuntimeException("An unexpected error occurred while deleting the attendee.");
        }
    }

    @Override
    public List<Attendee> getAttendeesByEventId(Integer eventId) {
        return attendeeRepository.findByEventId(eventId);
    }
}
