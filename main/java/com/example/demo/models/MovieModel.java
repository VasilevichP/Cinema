package com.example.demo.models;

import com.example.demo.entities.Movie;

import java.util.ArrayList;

public class MovieModel {
    private Movie movie;
    private String genres;

    public Movie getMovie() {
        return movie;
    }

    public void setMovie(Movie movie) {
        this.movie = movie;
    }

    public String getGenres() {
        return genres;
    }

    public void setGenres(String genres) {
        this.genres = genres;
    }

    public MovieModel(Movie movie, String genres) {
        this.movie = movie;
        this.genres = genres;
    }

}
