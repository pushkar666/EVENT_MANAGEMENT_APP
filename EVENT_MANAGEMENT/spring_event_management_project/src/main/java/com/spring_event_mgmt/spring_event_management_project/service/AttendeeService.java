// The code snippet provided is a Java interface named `AttendeeService`. This interface defines a contract for classes that implement it to provide functionality related to managing attendees in an event management system. Here's a breakdown of what each method in the interface does:
/**
 * @author : PUSHKAR D
 * @version : 1.0
 */
package com.spring_event_mgmt.spring_event_management_project.service;

import java.util.List;

import com.spring_event_mgmt.spring_event_management_project.entity.Attendee;

public interface AttendeeService {
    public Attendee addAttendee(Attendee attendee);

    public List<Attendee> getAttendees();

    public Attendee getAttendeeById(Integer id);

    public void deleteAttendee(Integer id);

    public List<Attendee> getAttendeesByEventId(Integer eventId);
}
