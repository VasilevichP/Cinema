package com.example.demo.controllers;

import com.example.demo.entities.Hall;
import com.example.demo.entities.Movie;
import com.example.demo.entities.Session;
import com.example.demo.services.HallService;
import com.example.demo.services.MovieService;
import com.example.demo.services.SessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/schedule")
@CrossOrigin
public class ScheduleController {
    @Autowired
    private MovieService movieService;
    @Autowired
    private HallService hallService;
    @Autowired
    private SessionService sessionService;

    @GetMapping("/show")
    public Map<String, Object> show() throws Exception {
        Map<String, Object> data = new HashMap<>();
        ArrayList<LocalDate> dates = new ArrayList<>();
        sessionService.markAsShown();
        for (int i = 0; i < 7; i++) {
            LocalDate date = LocalDate.now().plusDays(i);
            dates.add(date);
        }
        ArrayList<Hall> halls = hallService.findNotBlockedHalls();
        Iterable<Movie> movies = movieService.getNotExpired(LocalDate.now());
        List<Map<String, Object>> sess_list = new ArrayList<>();
        List<Session> sessions = (List<Session>) sessionService.getAllSessions();
        for (Session s : sessions) {
            Map<String, Object> map = new HashMap<>();
            map.put("session", s);
            String title = movieService.getMovie(s.getMovie()).getName();
            map.put("movie_name", title);
            LocalTime start = s.getStart_time();
            LocalTime end = s.getEnd_time();
            int length = start.getHour() * 60 + start.getMinute() - 480;
            map.put("start_time",start.toString());
            map.put("end_time",end.toString());
            map.put("left", length);
            length = end.getHour() * 60 + end.getMinute() - 480;
            map.put("right", length);
            sess_list.add(map);
        }
        data.put("dates", dates);
        data.put("sch_dates", dates);
        data.put("halls", halls);
        data.put("movies", movies);
        data.put("sessions", sess_list);
        data.put("sch_halls", halls);
        return data;
    }

    @PostMapping("/filter")
    public Map<String, Object> filter(@RequestParam int hall, @RequestParam String date) throws Exception {
        Map<String, Object> data = new HashMap<>();
        ArrayList<LocalDate> dates = new ArrayList<>();
        List<Map<String, Object>> sess_list = new ArrayList<>();
        List<Session> sessions = (List<Session>) sessionService.getAllSessions();
        if (date != null && !date.isEmpty()) {
            LocalDate ch_date = LocalDate.parse(date);
            dates.add(ch_date);
            sessions = sessionService.filterByDay(sessions, ch_date);
        } else
            for (int i = 0; i < 7; i++) {
                LocalDate dat = LocalDate.now().plusDays(i);
                dates.add(dat);
            }
        ArrayList<Hall> halls = new ArrayList<>();
        if (hall != 0) {
            if (hallService.findHallById(hall)) {
                halls.add(hallService.getHall((long) hall));
                sessions = sessionService.filterByHall(sessions, (long) hall);
            }
        } else halls = hallService.findNotBlockedHalls();
        for (Session s : sessions) {
            Map<String, Object> map = new HashMap<>();
            map.put("session", s);
            String title = movieService.getMovie(s.getMovie()).getName();
            map.put("movie_name", title);
            LocalTime start = s.getStart_time();
            LocalTime end = s.getEnd_time();
            map.put("start_time",start.toString());
            map.put("end_time",end.toString());
            int left = start.getHour() * 60 + start.getMinute() - 480;
            map.put("left", left);
            int right = end.getHour() * 60 + end.getMinute() - 480;
            map.put("right", right);
            sess_list.add(map);
        }
        data.put("sch_dates", dates);
        data.put("sch_halls", halls);
        data.put("sessions", sess_list);
        return data;
    }

    @PostMapping("/choose_movie")
    public Map<String, Object> chooseMovie(@RequestParam int id) throws Exception {
        Map<String, Object> data = new HashMap<>();
        ArrayList<Hall> halls = hallService.findNotBlockedHalls();
        ArrayList<Hall> ch_halls = new ArrayList<>();
        Movie mov = movieService.getMovie((long) id);
        int permission = mov.getPermission();
        for (Hall h : halls) {
            if (h.getPermission() == permission)
                ch_halls.add(h);
        }
        data.put("movie", mov);
        data.put("movie_halls", ch_halls);
        return data;
    }

    @PostMapping("/add")
    public int add(@RequestParam int movie_id, @RequestParam int hall, @RequestParam String str_date, @RequestParam String str_time) throws Exception {
        Movie mov = movieService.getMovie((long) movie_id);
        int length = mov.getMovieLength() + 20;
        LocalDate date = LocalDate.parse(str_date);
        LocalTime start_time = LocalTime.parse(str_time);
        if (start_time.isBefore(LocalTime.of(8, 0))) return 1;
        LocalTime end_time = start_time.plusMinutes(length);
        if (end_time.isAfter(LocalTime.of(0, 0)) && end_time.isBefore(LocalTime.of(8, 0))) return 2;
        List<Session> sessions = sessionService.filterByDayHall(date, (long) hall);
        for (Session s : sessions) {
            if (((start_time.isBefore(s.getEnd_time())||(start_time.equals(s.getEnd_time()))) && start_time.isAfter(s.getStart_time())) || (end_time.isBefore(s.getEnd_time()) && end_time.isAfter(s.getStart_time()))) {
                System.out.println("накладка");
                return 3;
            }
        }
        Session session = new Session((long) movie_id, (long) hall, date, length, start_time, end_time);
        sessionService.addSession(session);
        return 0;
    }

    @PostMapping("/choose_session")
    public Map<String, Object> chooseSession(@RequestParam int id) throws Exception {
        Map<String, Object> data = new HashMap<>();
        ArrayList<Hall> halls = hallService.findNotBlockedHalls();
        ArrayList<Hall> ch_halls = new ArrayList<>();
        Session s = sessionService.getSessionById((long) id);
        Movie mov = movieService.getMovie(s.getMovie());
        String name = mov.getName();
        int permission = mov.getPermission();
        for (Hall h : halls) {
            if (h.getPermission() == permission)
                ch_halls.add(h);
        }
        String st_time = s.getStart_time().toString();
        String e_time = s.getEnd_time().toString();
        data.put("start_time",st_time);
        data.put("end_time",e_time);
        data.put("movie_name", name);
        data.put("movie_halls", ch_halls);
        data.put("session", s);
        return data;
    }

    @PutMapping("/change")
    public int change(@RequestParam int session_id, @RequestParam int hall, @RequestParam String str_date, @RequestParam String str_time) throws Exception {
        System.out.println("in change");
        System.out.println("id: "+session_id);
        System.out.println("hall: "+hall);
        System.out.println("str_date: "+str_date);
        System.out.println("time: "+str_time);
        Session session = sessionService.getSessionById((long) session_id);
        int length = session.getLength();
        LocalDate date = LocalDate.parse(str_date);
        LocalTime start_time = LocalTime.parse(str_time);
        System.out.println(str_time);
        if (start_time.isBefore(LocalTime.of(8, 0))) return 1;
        LocalTime end_time = start_time.plusMinutes(length);
        if (end_time.isAfter(LocalTime.of(0, 0)) && end_time.isBefore(LocalTime.of(8, 0))) return 2;
        List<Session> sessions = sessionService.filterByDayHall(date, (long) hall);
        for (Session s : sessions) {
            if ((!s.getId().equals(session.getId())) &&((start_time.isBefore(s.getEnd_time()) && start_time.isAfter(s.getStart_time())) || (end_time.isBefore(s.getEnd_time()) && end_time.isAfter(s.getStart_time())))) {
                return 3;
            }
        }
        session.setHall((long) hall);session.setDate(date);
        session.setStart_time(start_time);session.setEnd_time(end_time);
        System.out.println(session.getStart_time());
        sessionService.addSession(session);
        return 0;
    }
    @DeleteMapping("/delete/{id}")
    public int delete(@PathVariable int id){
        if(sessionService.deleteSession((long) id)) {
            return 0;
        }
        return 1;
    }
}
