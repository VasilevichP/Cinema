package com.example.demo.controllers;

import com.example.demo.entities.Hall;
import com.example.demo.models.HallModel;
import com.example.demo.services.HallService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/hall")
@CrossOrigin
public class HallsController {
    @Autowired
    private HallService hallService;

    @GetMapping("halls")
    public List<Hall> getAll() {
        return (List<Hall>) hallService.getAllHalls();
    }

    @PostMapping("add")
    public int add(@RequestBody HallModel hallModel) {
        if (hallService.addHallToDB(hallModel)) return 0;
        return 1;
    }

    @DeleteMapping("delete/{id}")
    public int delete(@PathVariable int id) {
        System.out.println("in delete hall");
        if (!hallService.findHallById(id)) return 1;
        else {
            hallService.deleteHall(id);
            return 0;
        }
    }

    @PutMapping("change_status/{id}")
    public int changeStatus(@PathVariable int id) {
        System.out.println("in change status");
        if (!hallService.findHallById(id)) return 1;
        else {
            hallService.changeStatus(id);
            return 0;
        }
    }
}
