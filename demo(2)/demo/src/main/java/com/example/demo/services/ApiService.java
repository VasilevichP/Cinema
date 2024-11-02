package com.example.demo.services;

import com.example.demo.entities.Movie;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;

import java.net.SocketException;
import java.util.ArrayList;

@Component
public class ApiService {
    private final WebClient client;
    private final String API_ADDRESS = "https://api.kinopoisk.dev/v1.4";
    private final String API_KEY = "WMF5G7N-ZJJM0RW-N7JQSSJ-1YVBVWN";
    public ApiService(WebClient.Builder builder){
        this.client = builder.baseUrl(API_ADDRESS).build();
    }

    public Movie getMovie(String title) throws SocketException {
        String mes = this.client.get().uri("/movie/search?page=1&limit=1&query=" + title).accept(MediaType.APPLICATION_JSON)
                .header("X-API-KEY", API_KEY)
                .exchange().block().bodyToMono(String.class).block();
        System.out.println(mes);
        if (mes.indexOf("]") == mes.indexOf("[") + 1) {
            return new Movie();
        }

        try {
            String poster = mes.substring(mes.indexOf("\"poster\":{\"url\":\"") + "\"poster\":{\"url\":\"".length());
            poster = poster.substring(0, poster.indexOf("\",\""));
            String name = mes.substring(mes.indexOf("\"name\":\"") + "\"name\":\"".length());
            name = name.substring(0, name.indexOf("\",\""));
            String id = mes.substring(mes.indexOf("\"id\":") + "\"id\":".length());
            id = id.substring(0, id.indexOf(","));
            String age = mes.substring(mes.indexOf(",\"ageRating\":") + ",\"ageRating\":".length());
            age = age.substring(0, age.indexOf(","));
            String len = mes.substring(mes.indexOf("\"movieLength\":") + "\"movieLength\":".length());
            len = len.substring(0, len.indexOf(","));
            String genres = mes.substring(mes.indexOf("\"genres\":") + "\"genres\":".length());
            genres = genres.substring(0, genres.indexOf("]") + 1);
            if (age == null || age.equals("null") || age.equals("")) {
                age = age.replaceAll("null", "12");
            }
            System.out.println(len);
            if (len == null) {
                return new Movie();
            }
            ArrayList<String> gen = new ArrayList<>();
            String sub;
            String genre;
            while (true) {
                sub = genres.substring(0, genres.indexOf("}") + 1);
                genres = genres.substring(sub.length());
                genre = sub.substring(sub.indexOf(":") + 2, sub.lastIndexOf("}") - 1);
                gen.add(genre);
                if (genres.indexOf("]") == 0) break;
            }
            MovieService.movieGenres.addAll(gen);
            Movie mov = new Movie(Long.parseLong(id), name, Integer.parseInt(len), Integer.parseInt(age), poster);
            return mov;
        } catch (Exception e) {
            return new Movie();
        }
    }
}
