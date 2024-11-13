package com.example.demo.models;

import com.example.demo.entities.Hall;

public class HallModel {
    private int permission;
    private int places;

    public HallModel(int permission, int places) {
        this.permission = permission;
        this.places = places;
    }
    public static Hall fromModel(HallModel model){
        Hall hall = new Hall();
        hall.setPermission(model.permission);
        hall.setPlaces(model.places);
        hall.setStatus(true);
        return hall;
    }
}
