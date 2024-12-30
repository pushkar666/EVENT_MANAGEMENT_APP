// This code snippet is defining a Java interface called `EventRepository` that extends the `JpaRepository` interface provided by Spring Data JPA. The `EventRepository` interface is used to interact with the database entity `Event` in the Spring Event Management project. By extending `JpaRepository<Event, Integer>`, the `EventRepository` interface inherits various database operations and query methods for managing `Event` entities, such as saving, deleting, and finding events by ID. This interface acts as a bridge between the application and the database, providing methods to perform CRUD (Create, Read, Update, Delete) operations on the `Event` entity.
/**
 * @author : PUSHKAR D
 * @version : 1.0
 */
package com.spring_event_mgmt.spring_event_management_project.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.spring_event_mgmt.spring_event_management_project.entity.Event;

public interface EventRepository extends JpaRepository<Event, Integer> {

}
