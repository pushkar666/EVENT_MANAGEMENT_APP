package com.spring_event_mgmt.spring_event_management_project;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@SpringBootApplication
@EntityScan(basePackages = "com.spring_event_mgmt.spring_event_management_project")
public class SpringEventManagementProjectApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpringEventManagementProjectApplication.class, args);
	}

}
