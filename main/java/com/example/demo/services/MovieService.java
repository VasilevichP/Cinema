package com.example.demo.services;

import com.example.demo.entities.Genres;
import com.example.demo.entities.Movie;
import com.example.demo.entities.Session;
import com.example.demo.models.MovieModel;
import com.example.demo.repositories.GenresRepository;
import com.example.demo.repositories.MovieRepository;
import com.example.demo.repositories.SessionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.net.SocketException;
import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import java.util.stream.StreamSupport;
import static com.example.demo.CinemaApplication.context;

@Service
public class MovieService {
    public static ArrayList<String> movieGenres;
    private final MovieRepository movieRepository;
    private final GenresRepository genresRepository;
    private final SessionRepository sessionRepository;

    @Autowired
    public MovieService(MovieRepository movieRepository, GenresRepository genresRepository, SessionRepository sessionRepository) {
        this.movieRepository = movieRepository;
        this.genresRepository = genresRepository;
        this.sessionRepository = sessionRepository;
    }

    public MovieModel getMovie(String title) {
        movieGenres = new ArrayList<>();
        ApiService apiService = context.getBean(ApiService.class);
        MovieModel movie;
        try {
            movie = apiService.getMovie(title);
        } catch (SocketException e) {
            movie = null;
        }
        return movie;
    }

    public boolean findById(Long id) {
        Optional<Movie> optMov = movieRepository.findById(id);
        if (optMov.isEmpty()) return false;
        else return true;
    }

    public void deleteMovie(Long id) {
        try {
            movieRepository.deleteById(id);
            deleteSessionByMovie(id);
        } catch (Exception e) {
        }
    }
    public void deleteExpired(LocalDate localDate){
        Iterable<Movie> allMovies = movieRepository.findAll();
        for (Movie movie : allMovies)
            if (!movie.getDate_of_return().isBefore(localDate)) {
                deleteSessionByMovie(movie.getId());
                movieRepository.delete(movie);
            }
    }
    public void deleteSessionByMovie(long id) {
        Iterable<Session> sessions = sessionRepository.findAllByMovie(id);
        for (Session s : sessions) if (s.getStatus() == 0) sessionRepository.deleteById(s.getId());
    }

    public Iterable<Movie> getAllMovies() {
        Iterable<Movie> movies = movieRepository.findAll();
        return movies;
    }

    public Movie getMovie(Long id) throws Exception {
        Optional<Movie> optMovie = movieRepository.findById(id);
        return optMovie.get();
    }

    public boolean addMovieToDB(Movie movie) {
        try {
            movieRepository.save(movie);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public String findGenres(long id) {
        String genres = "";
        ArrayList<Genres> genre = genresRepository.findByMovie(id);
        StringBuilder stringBuilder = new StringBuilder(genres);
        for (Genres s : genre) {
            stringBuilder.append(s.getGenre() + ", ");
        }
        genres = stringBuilder.toString();
        genres = genres.substring(0, genres.lastIndexOf(','));
        return genres;
    }

    public ArrayList<String> findArrGenres(long id) {
        ArrayList<Genres> genre = genresRepository.findByMovie(id);
        ArrayList<String> gens = new ArrayList<>();
        for (Genres g : genre) gens.add(g.getGenre());
        return gens;
    }

    public void addGenreToDB(long movie, String genre) {
        Genres gen = new Genres(movie, genre);
        genresRepository.save(gen);
    }

    public ArrayList<String> getDistinctGens() {
        Iterable<Genres> genres = genresRepository.findAll();
        ArrayList<String> gens = new ArrayList<>();
        Set<String> set = new HashSet<>();
        for (Genres g : genres) {
            String genre = g.getGenre();
            set.add(genre.substring(0,1).toUpperCase()+genre.substring(1));
        }
        gens.addAll(set);
        return gens;
    }

    public List<Movie> search(List<Movie> allMovies, String search) {
        List<Movie> searched = new ArrayList<Movie>();
        for (Movie m : allMovies) {
            if (m.getName().toLowerCase().contains(search.toLowerCase().strip())) {
                searched.add(m);
            }
        }
        return searched;
    }

    public Iterable<Movie> getNotExpired(LocalDate localDate) {
        Iterable<Movie> allMovies = movieRepository.findAll();
        ArrayList<Movie> movies = new ArrayList<>();
        for (Movie movie : allMovies) if (!movie.getDate_of_return().isBefore(localDate)) movies.add(movie);
        return movies;
    }


    public List<Movie> sort(List<Movie> allMovies, int sort) {
        ArrayList<Movie> movies = (ArrayList<Movie>) StreamSupport.stream(allMovies.spliterator(), false)
                .collect(Collectors.toList());
        Stream<Movie> movs = movies.stream();
        switch (sort) {
            case 1:
                allMovies = movs.sorted(Comparator.comparing(Movie::getDate_of_return).reversed()).collect(Collectors.toList());
                break;
            case 2:
                allMovies = movs.sorted(Comparator.comparing(Movie::getDate_of_return)).collect(Collectors.toList());
                break;
            default:
                break;
        }
        return allMovies;
    }

    public List<Movie> filter(List<Movie> allMovies, String filt) {
        ArrayList<Movie> movies = (ArrayList<Movie>) StreamSupport.stream(allMovies.spliterator(), false)
                .collect(Collectors.toList());
        ArrayList<Movie> deleted = new ArrayList<>();
        for (Movie m : allMovies) {
            if (!(findArrGenres(m.getId())).contains(filt.toLowerCase())) {
                deleted.add(m);
            }
        }
        movies.removeAll(deleted);
        return movies;
    }

}
