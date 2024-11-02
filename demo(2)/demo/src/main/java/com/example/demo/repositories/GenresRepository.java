package com.example.demo.repositories;

import com.example.demo.entities.GenId;
import com.example.demo.entities.Genres;
import org.springframework.data.repository.CrudRepository;

import java.util.ArrayList;

public interface GenresRepository extends CrudRepository<Genres, GenId> {
    ArrayList<Genres> findByMovie(long id);
}
