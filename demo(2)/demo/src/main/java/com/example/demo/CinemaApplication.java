package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;

@SpringBootApplication
public class CinemaApplication {
	public static ConfigurableApplicationContext context;

	public static void main(String[] args) {
		SpringApplication.run(CinemaApplication.class, args);
	}

}
