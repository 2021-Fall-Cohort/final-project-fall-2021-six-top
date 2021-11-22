package Top.Top.Application.Models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class AlcoholicDrink {

    @Id
    @GeneratedValue
    private Long id;

    private String name;
    private Float price;
    private Boolean isAlcoholic;
    private Boolean available;

    public AlcoholicDrink(String name, Float price, Boolean isAlcoholic, Boolean available) {
        this.name = name;
        this.price = price;
        this.isAlcoholic = true;
        this.available = available;
    }

    public AlcoholicDrink() {
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
