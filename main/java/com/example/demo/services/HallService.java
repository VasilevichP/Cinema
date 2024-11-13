package com.example.demo.services;

import com.example.demo.entities.Hall;
import com.example.demo.models.HallModel;
import com.example.demo.repositories.HallRepository;
import com.example.demo.repositories.SessionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;
@Service
public class HallService {
    private final HallRepository hallRepository;
    private final SessionRepository sessionRepository;

    @Autowired
    public HallService(HallRepository hallRepository, SessionRepository sessionRepository) {
        this.hallRepository = hallRepository;
        this.sessionRepository = sessionRepository;
    }

    public Iterable<Hall> getAllHalls() {
        Iterable<Hall> halls = hallRepository.findAll();
        return halls;
    }

    public Hall getHall(Long id) throws Exception {
        Optional<Hall> optHall = hallRepository.findById(id);
        return optHall.get();
    }
    public boolean findHallByLogin(long id) {
        Optional<Hall> optHall = hallRepository.findById(id);
        if (optHall.isEmpty()) return false;
        else return true;
    }
    public boolean addHallToDB(HallModel hallModel) {
        try {
            Hall hall = HallModel.fromModel(hallModel);
            hallRepository.save(hall);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public ArrayList<Hall> findNotBlockedHalls() {
        return (ArrayList<Hall>) hallRepository.findHallByStatus(true);
    }

}
