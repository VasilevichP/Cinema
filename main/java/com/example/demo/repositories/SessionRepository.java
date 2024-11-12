package com.example.demo.repositories;

import com.example.demo.entities.Session;
import org.springframework.data.repository.CrudRepository;

import java.time.LocalDate;

public interface SessionRepository extends CrudRepository<Session,Long> {
    Iterable<Session> findAllByMovie(long movie);
    Iterable<Session> findAllByHall(long hall);
    Iterable<Session> findAllByDate(LocalDate date);
    Iterable<Session> findAllByStatus(int stat);
}
