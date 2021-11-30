package Top.Top.Application.Models;

import javax.persistence.*;
import java.util.Arrays;
import java.util.Collection;


@Entity
public class Ticket {

    @Id
    @GeneratedValue
    private Long id;

    private int year;
    private int month;
    private int day;

    @OneToMany(mappedBy = "ticket")
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

    public Collection<Item> getTicketItems() {
        return ticketItems;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public void setMonth(int month) {
        this.month = month;
    }

    public void setDay(int day) {
        this.day = day;
    }

}
