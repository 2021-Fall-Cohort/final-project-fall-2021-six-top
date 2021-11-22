package Top.Top.Application.Models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class NonAlcoholicDrink {

    @Id
    @GeneratedValue
    private Long id;

    private String name;
    private Float price;
    private Boolean isAlcoholic;
    private Boolean available;

    public NonAlcoholicDrink(String name, Float price, Boolean isAlcoholic, Boolean available) {
        this.name = name;
        this.price = price;
        this.isAlcoholic = false;
        this.available = available;
    }

    public NonAlcoholicDrink() {
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public Float getPrice() {
        return price;
    }

    public Boolean getIsAlcoholic() {
        return isAlcoholic;
    }
}
