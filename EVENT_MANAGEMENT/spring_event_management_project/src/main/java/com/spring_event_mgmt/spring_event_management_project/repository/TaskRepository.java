// This code snippet is defining a Java interface called `TaskRepository` that extends the `JpaRepository` interface provided by Spring Data JPA.
/**
 * @author : PUSHKAR D
 * @version : 1.0
 */
package com.spring_event_mgmt.spring_event_management_project.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.spring_event_mgmt.spring_event_management_project.entity.Task;

public interface TaskRepository extends JpaRepository<Task, Integer> {

    List<Task> findByEventId(Integer eventId);

    List<Task> findByAttendeeId(Integer attendeeId);

}
