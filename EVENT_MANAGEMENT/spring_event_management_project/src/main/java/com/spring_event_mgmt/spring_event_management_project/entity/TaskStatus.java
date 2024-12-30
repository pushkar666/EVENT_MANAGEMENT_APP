// This code snippet defines a Java enum called `TaskStatus` within the package `com.spring_event_mgmt.spring_event_management_project.entity`. The enum `TaskStatus` represents different states or statuses that a task can have, including `PENDING`, `IN_PROGRESS`, `COMPLETED`, and `CANCELLED`. Enums are used in Java to define a fixed set of constants. In this case, `TaskStatus` provides a way to represent and work with different statuses of tasks within the context of event management.
/**
 * @author : PUSHKAR D
 * @version : 1.0
 */

package com.spring_event_mgmt.spring_event_management_project.entity;

public enum TaskStatus {
    PENDING,
    COMPLETED,
    CANCELLED
}
