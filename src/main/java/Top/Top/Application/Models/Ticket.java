package Top.Top.Application.Models;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;


@Entity
public class Ticket {

    @Id
    @GeneratedValue
    private Long id;

    private String name;
    private int year;
    private int month;
    private int day;
    private boolean isClosed = false;
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

    public void removeFromTicket(Item item) {
        ticketItems.remove(item); /// remove item
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

    public void setName(String name) {
        this.name = name;
    }

    public boolean isClosed() {
        return isClosed;
    }

    public void closeTicket() {
        isClosed = true;
    }
}
