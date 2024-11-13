package com.example.demo.controllers;

import com.example.demo.entities.Movie;
import com.example.demo.models.MovieModel;
import com.example.demo.services.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static com.example.demo.services.MovieService.movieGenres;

@RestController
@RequestMapping("/movie")
@CrossOrigin
public class MoviesController {
    @Autowired
    private MovieService movieService;

    @PostMapping("/get_movie_info")
    public Object getMovieInfo(@RequestBody String title){
        System.out.println(title);
        Movie movie = movieService.getMovie(title);
        if(movie.getId()==null) return 1;
        if(movie.getMovieLength()==0) return 2;
        if(movieService.findById(movie.getId())) return 3;
        String genres = "";
        StringBuilder stringBuilder = new StringBuilder(genres);
        for (String s : movieGenres) {stringBuilder.append(s + ", ");}
        genres = stringBuilder.toString();
        genres = genres.substring(0, genres.lastIndexOf(','));
        MovieModel movieModel = new MovieModel(movie,genres);
        return movieModel;
    }
}
