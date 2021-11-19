package com.example.sixtopPOS.Models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Ingredients {

    @Id
    @GeneratedValue
    private Long id;

    private String name;
    private float availableStock;
    private String units;

    public Ingredients(String name, float availableStock, String units) {
        this.name = name;
        this.availableStock = availableStock;
        this.units = units;
    }

    public String getName() {
        return name;
    }

    public float getAvailableStock() {
        return availableStock;
    }

    public String getUnits() {
        return units;
    }
}
