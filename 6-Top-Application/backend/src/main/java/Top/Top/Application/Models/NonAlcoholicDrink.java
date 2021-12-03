package Top.Top.Application.Models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class NonAlcoholicDrink extends Item{

    @Id
    @GeneratedValue
    private Long id;

    private Boolean isAlcoholic;
    private Boolean available;

    public NonAlcoholicDrink(String name, Float price, Boolean isAlcoholic, Boolean available, boolean showOnMenu) {
        super(name, price, showOnMenu);
        this.isAlcoholic = false;
        this.available = available;
    }

    public NonAlcoholicDrink() {
    }

    public Long getId() {
        return id;
    }

    public Boolean getIsAlcoholic() {
        return isAlcoholic;
    }
}
