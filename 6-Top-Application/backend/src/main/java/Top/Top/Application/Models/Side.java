package Top.Top.Application.Models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Side extends Item{

    @Id
    @GeneratedValue
    private Long id;
    private String description;
    private Boolean available;

    public Side(String name, Float price, String description, Boolean available) {
        super(name, price);
        this.description = description;
        this.available = available;
    }
    public Side() {
    }

    public Long getId() {
        return id;
    }

    public String getDescription() {
        return description;
    }

    public Boolean getAvailable() {
        return available;
    }
}
