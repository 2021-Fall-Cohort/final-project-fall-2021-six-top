package Top.Top.Application.Models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public abstract class Item {
    @Id
    @GeneratedValue
    private Long id;

    private String name;
    private Float price;

    public Item(String name, Float price) {
        this.name = name;
        this.price = price;
    }

    protected Item() {
    }

    public String getName() {
        return name;
    }

    public Float getPrice() {
        return price;
    }
}
