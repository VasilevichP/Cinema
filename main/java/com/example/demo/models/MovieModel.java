package com.example.demo.models;

import com.example.demo.entities.Movie;

import java.time.LocalDate;
import java.util.ArrayList;

public class MovieModel {
    private Long id;
    private String name;
    private int permission;
    private String poster;
    private int movieLength;
    private int ageRating;
    private int rent;
    private String genres;


    public MovieModel(){};

    public MovieModel(Long id, String name, String poster, int movieLength, int ageRating, String genres) {
        this.id = id;
        this.name = name;
        this.poster = poster;
        this.movieLength = movieLength;
        this.ageRating = ageRating;
        this.genres = genres;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getPermission() {
        return permission;
    }

    public void setPermission(int permission) {
        this.permission = permission;
    }

    public String getPoster() {
        return poster;
    }

    public void setPoster(String poster) {
        this.poster = poster;
    }

    public int getMovieLength() {
        return movieLength;
    }

    public void setMovieLength(int movieLength) {
        this.movieLength = movieLength;
    }

    public int getAgeRating() {
        return ageRating;
    }

    public void setAgeRating(int ageRating) {
        this.ageRating = ageRating;
    }

    public int getRent() {
        return rent;
    }

    public void setRent(int rent) {
        this.rent = rent;
    }

    public String getGenres() {
        return genres;
    }

    public void setGenres(String genres) {
        this.genres = genres;
    }
    public static Movie fromModel(MovieModel movieModel){
        Movie movie = new Movie();
        movie.setId(movieModel.getId());
        movie.setName(movieModel.getName());
        movie.setPermission(movieModel.getPermission());
        movie.setPoster(movieModel.getPoster());
        movie.setMovieLength(movieModel.getMovieLength());
        movie.setAgeRating(movieModel.getAgeRating());
        LocalDate localDate = LocalDate.now().plusDays(movieModel.getRent());
        movie.setDate_of_return(localDate);
        return movie;
    }

}
