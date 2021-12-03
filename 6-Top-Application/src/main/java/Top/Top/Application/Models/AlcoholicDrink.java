package Top.Top.Application.Models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class AlcoholicDrink extends Item{

    @Id
    @GeneratedValue
    private Long id;

    private Boolean isAlcoholic;
    private Boolean available;

    public AlcoholicDrink(String name, Float price, Boolean isAlcoholic, Boolean available) {
        super(name, price);
        this.isAlcoholic = true;
        this.available = available;
    }

    public AlcoholicDrink() {
    }

    public Long getId() {
        return id;
    }

    public Boolean getIsAlcoholic() {
        return isAlcoholic;
    }
}
