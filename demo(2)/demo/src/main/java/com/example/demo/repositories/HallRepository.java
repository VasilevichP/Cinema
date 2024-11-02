package com.example.demo.repositories;

import com.example.demo.entities.Hall;
import org.springframework.data.repository.CrudRepository;

public interface HallRepository extends CrudRepository<Hall,Long> {
    Iterable<Hall> findHallByStatus(boolean stat);
}