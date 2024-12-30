// This code snippet is defining a Java interface called `AttendeeRepository` that extends the `JpaRepository` interface provided by Spring Data JPA.
/**
 * @author : PUSHKAR D
 * @version : 1.0
 */
package com.spring_event_mgmt.spring_event_management_project.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.spring_event_mgmt.spring_event_management_project.entity.Attendee;

public interface AttendeeRepository extends JpaRepository<Attendee, Integer> {

    List<Attendee> findByEventId(Integer eventId);

}
