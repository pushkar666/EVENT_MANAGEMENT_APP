/**
 * The `EventDataNotFoundException` class is a custom exception in Java that represents a not found error for event data.
 * @author : PUSHKAR D
 * @version : 1.0
 */
package com.spring_event_mgmt.spring_event_management_project.globalException;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;
import lombok.extern.slf4j.Slf4j;

@ResponseStatus(HttpStatus.NOT_FOUND)
@Slf4j
public class DataNotFoundException extends RuntimeException {

    public DataNotFoundException() {
        super();
    }

    public DataNotFoundException(String message) {
        super(message);
        log.error("DataNotFoundException: {}", message); 
    }
}
