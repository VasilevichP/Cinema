package com.example.demo.entities;


import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Movie {


    @jakarta.persistence.Id
    @Id
    private Long id;
    private String name;
    private int permission;
    private String poster;
    private int movieLength;
    private int ageRating;
    private LocalDate date_of_return;
    public Movie(Long id, String name, int movieLength, int ageRating, String poster) {
        this.name = name;
        this.id = id;
        this.movieLength = movieLength;
        this.ageRating = ageRating;
        this.poster = poster;
    }
}
