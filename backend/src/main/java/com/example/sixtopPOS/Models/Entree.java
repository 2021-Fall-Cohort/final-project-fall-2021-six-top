package com.example.sixtopPOS.Models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.util.Collection;

@Entity
public class Entree {

    @Id
    @GeneratedValue
    private Long id;

    private String name;
    private float price;
    private String description;
    private String image;

    private Collection<Ingredients> ingredients;

    public Entree(String name, float price, String description, String image, Collection<Ingredients> ingredients) {
        this.name = name;
        this.price = price;
        this.description = description;
        this.image = image;
        this.ingredients = ingredients;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public float getPrice() {
        return price;
    }

    public String getDescription() {
        return description;
    }

    public String getImage() {
        return image;
    }

    public Collection<Ingredients> getIngredients() {
        return ingredients;
    }
}
