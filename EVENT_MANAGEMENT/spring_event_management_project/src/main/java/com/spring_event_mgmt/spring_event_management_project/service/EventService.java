// This code snippet is defining a Java interface named `EventService` within the package `com.spring_event_mgmt.spring_event_management_project.service`. The interface declares several methods that define the contract for managing events in a system. These methods include creating an event, retrieving an event by ID, getting a list of all events, updating an event, and deleting an event. The interface does not provide the implementation details of these methods but rather specifies the method signatures that classes implementing this interface must define.

/**
 * @author : PUSHKAR D
 * @version : 1.0
 */
package com.spring_event_mgmt.spring_event_management_project.service;

import java.util.List;

import com.spring_event_mgmt.spring_event_management_project.entity.Event;

public interface EventService {
    public Event createEvent(Event event);

    public Event getEventById(Integer id);

    public List<Event> getAllEvents();

    public Event updateEvent(Integer id, Event event);

    public void deleteEvent(Integer id);

}
