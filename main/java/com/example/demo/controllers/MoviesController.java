package com.example.demo.controllers;

import com.example.demo.entities.Movie;
import com.example.demo.models.MovieModel;
import com.example.demo.services.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

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
        MovieModel movie = movieService.getMovie(title);
        if(movie.getId()==null) return 1;
        if(movie.getMovieLength()==0) return 2;
        if(movieService.findById(movie.getId())) return 3;
        return movie;
    }
    @PostMapping("/add")
    public int addMovie(@RequestBody MovieModel movie){
        Movie mov = MovieModel.fromModel(movie);
        String gs = movie.getGenres();
        if (movieService.addMovieToDB(mov)){
            long id = movie.getId();
            String[] genres = gs.split(", ");
            for (String s:genres){
                System.out.println(s);
                movieService.addGenreToDB(id,s.trim());
            }
            return 0;
        }
        return 1;
    }
    @GetMapping("/movies")
    public Map<String,Object> getMovies(){
        ArrayList<String> distGenres = movieService.getDistinctGens();
        List<Movie> movies = (List<Movie>) movieService.getAllMovies();
        List<Map<String,Object>> movie_list = new ArrayList<>();
         for (Movie m : movies) {
             String genres = movieService.findGenres(m.getId());
             Map<String,Object> movie_map = new HashMap<>();
             movie_map.put("movie",m);
             movie_map.put("genres",genres);
             movie_list.add(movie_map);
        }
        Map<String, Object> response = new HashMap<>();
        response.put("dist_genres",distGenres);
        response.put("movies",movie_list);
        return response;
    }
    @PostMapping("/sort")
    public Map<String,Object> sortMovies(@RequestParam String genre, @RequestParam int sort, @RequestParam String search){
        List<Movie> movies = (List<Movie>) movieService.getAllMovies();
        if(genre!=null && !genre.isEmpty()) movies = movieService.filter(movies,genre);
        if(search!=null && !search.isEmpty()) movies = movieService.search(movies,search);
        if(sort!=0) movies = movieService.sort(movies,sort);
        Map<String,Object> response = new HashMap<>();
        ArrayList<String> distGenres = movieService.getDistinctGens();
        List<Map<String,Object>> movie_list = new ArrayList<>();
        for (Movie m : movies) {
            String genres = movieService.findGenres(m.getId());
            Map<String,Object> movie_map = new HashMap<>();
            movie_map.put("movie",m);
            movie_map.put("genres",genres);
            movie_list.add(movie_map);
        }
        response.put("dist_genres",distGenres);
        response.put("movies",movie_list);
        return response;
    }
}
