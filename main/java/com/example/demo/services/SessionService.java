package com.example.demo.services;

import com.example.demo.entities.Session;
import com.example.demo.repositories.MovieRepository;
import com.example.demo.repositories.SessionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileOutputStream;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.function.Function;
import java.util.function.Predicate;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import java.util.stream.StreamSupport;

@Service
public class SessionService {
    private final SessionRepository sessionRepository;
    private final MovieRepository movieRepository;

    @Autowired
    public SessionService(SessionRepository sessionRepository, MovieRepository movieRepository) {
        this.sessionRepository = sessionRepository;
        this.movieRepository = movieRepository;
    }


    public Iterable<Session> getAllSessionsByStatus(int stat) {
        Iterable<Session> sessions = sessionRepository.findAllByStatus(stat);
        return sessions;
    }

    public Iterable<Session> getAllSessions() {
        return sessionRepository.findAll();
    }
    public boolean addSession(Session session) {
        try {
            sessionRepository.save(session);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public Session getSessionById(Long id) {
        Optional<Session> optSession = sessionRepository.findById(id);
        return optSession.get();
    }

    public boolean saveChanges(Session session) {
        try {
            sessionRepository.save(session);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public boolean deleteSession(Long id) {
        try {
            sessionRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public void markAsShown(LocalDate date) {
        Iterable<Session> sessions = sessionRepository.findAll();
        for (Session s : sessions)
            if (s.getDate().isBefore(date)) {
                s.setStatus(1);
                sessionRepository.save(s);
            }
    }

    public List<Session> filterByDay(List<Session> allSessions, LocalDate day) {
        Stream<Session> sess = allSessions.stream();
        allSessions = sess.filter(s -> s.getDate().isEqual(day)).collect(Collectors.toList());
        return allSessions;
    }

    public List<Session> filterByHall(List<Session> allSessions, Long hall) {
        Stream<Session> sess = allSessions.stream();
        allSessions = sess.filter(s -> s.getHall().equals(hall)).collect(Collectors.toList());
        System.out.println("fh: " + allSessions);
        return allSessions;
    }
    public List<Session> filterByDayHall(LocalDate day,Long hall) {
        List<Session> sessions = StreamSupport.stream(sessionRepository.findAll().spliterator(), false)
                .collect(Collectors.toList());
        Stream<Session> sess = sessions.stream();
        sessions = sess.filter(s -> (s.getDate().isEqual(day) && s.getHall().equals(hall))).collect(Collectors.toList());
        return sessions;
    }

    public static <T> Predicate<T> distinctByKey(Function<? super T, ?> keyExtractor) {
        Set<Object> seen = ConcurrentHashMap.newKeySet();
        return t -> seen.add(keyExtractor.apply(t));
    }

}
