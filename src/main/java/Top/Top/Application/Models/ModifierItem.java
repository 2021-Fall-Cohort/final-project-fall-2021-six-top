package Top.Top.Application.Models;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

@Entity
public class ModifierItem {
    @Id
    @GeneratedValue
    private Long id;

    private String label;
    private boolean selected;

    @ManyToOne
    @JsonIgnore
    private ModifierCategory modifier;

    public ModifierItem(String label, boolean selected) {
        this.label = label;
        this.selected = selected;
    }

    public ModifierItem() {
    }

    public String getLabel() {
        return label;
    }

    public ModifierCategory getModifier() {
        return modifier;
    }

    public boolean isSelected() {
        return selected;
    }

    public void setModifier(ModifierCategory modifier) {
        this.modifier = modifier;
    }
}
