package Top.Top.Application.Models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import java.util.Collection;

@Entity
public class Entree extends Item{

    @Id
    @GeneratedValue
    private Long id;

    private String description;
    private Boolean available;

    @OneToOne
    private ModifierCategory modifiers;

    public Entree(String name, Float price, String description, Boolean available, ModifierCategory modifiers, boolean showOnMenu) {
        super(name, price, showOnMenu);
        this.description = description;
        this.available = available;
        this.modifiers = modifiers;

    }

    public Entree() {

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

    public ModifierCategory getModifiers() {
        return modifiers;
    }
}
