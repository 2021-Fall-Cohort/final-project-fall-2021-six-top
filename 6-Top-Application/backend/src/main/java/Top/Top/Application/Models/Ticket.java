package Top.Top.Application.Models;

import javax.persistence.*;
import java.util.Arrays;
import java.util.Collection;


@Entity
public class Ticket {

    @Id
    @GeneratedValue
    private Long id;

    @ElementCollection
    private Collection<Item> ticketItems;

    public Ticket(Item... ticketItems) {
        this.ticketItems =  Arrays.asList(ticketItems);
    }

    public Ticket() {
    }

    public Long getId() {
        return id;
    }

    public void addToTicket(Item item) {
        ticketItems.add(item);
    }


}
