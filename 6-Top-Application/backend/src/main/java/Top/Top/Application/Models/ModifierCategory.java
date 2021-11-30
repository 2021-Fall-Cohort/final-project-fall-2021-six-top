package Top.Top.Application.Models;

import javax.persistence.*;
import java.util.Arrays;
import java.util.Collection;

@Entity
public class ModifierCategory {
    @Id
    @GeneratedValue
    private Long id;

    private String categoryLabel;

    @OneToMany(mappedBy = "modifier")
    private Collection <ModifierItem> modifiers;

    public ModifierCategory(String categoryLabel, ModifierItem... modifiers) {
        this.categoryLabel = categoryLabel;
        this.modifiers = Arrays.asList(modifiers);
    }
    public ModifierCategory() {
    }

    public String getCategoryLabel() {
        return categoryLabel;
    }

    public Collection<ModifierItem> getModifiers() {
        return modifiers;
    }



    public void addModifierItem(ModifierItem modifierItem) {
        modifiers.add(modifierItem);
    }
}
