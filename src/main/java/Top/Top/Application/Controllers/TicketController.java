package Top.Top.Application.Controllers;
import Top.Top.Application.Models.*;
import Top.Top.Application.Repositories.*;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Optional;

@RestController
@RequestMapping("/Tickets")
public class TicketController {

    private TicketRepository ticketRepo;
    private ClosedTicketRepository closedTicketRepo;
    private EntreeRepository entreeRepo;
    private AlcoholicDrinkRepository alcoholicDrinkRepo;
    private AppetizerRepository appetizerRepo;
    private DessertRepository dessertRepo;
    private NonAlcoholicDrinkRepository nonAlcoholicDrinkRepo;
    private SideRepository sideRepo;
    private KitchenRepository kitchenRepo;


    public TicketController(TicketRepository ticketRepo, ClosedTicketRepository closedTicketRepo, EntreeRepository entreeRepo, AlcoholicDrinkRepository alcoholicDrinkRepo, AppetizerRepository appetizerRepo, DessertRepository dessertRepo, NonAlcoholicDrinkRepository nonAlcoholicDrinkRepo, SideRepository sideRepo, KitchenRepository kitchenRepo) {
        this.ticketRepo = ticketRepo;
        this.closedTicketRepo = closedTicketRepo;
        this.entreeRepo = entreeRepo;
        this.alcoholicDrinkRepo = alcoholicDrinkRepo;
        this.appetizerRepo = appetizerRepo;
        this.dessertRepo = dessertRepo;
        this.nonAlcoholicDrinkRepo = nonAlcoholicDrinkRepo;
        this.sideRepo = sideRepo;
        this.kitchenRepo = kitchenRepo;
    }

    @GetMapping("/OpenTickets")
    public Iterable<Ticket> retrieveAllOpenTickets() {
        ArrayList<Ticket> openTickets = new ArrayList<>();
        for(Ticket current: ticketRepo.findAll()) {
            if (!current.isClosed()) {
                openTickets.add(current);
            }
        }
        return openTickets;
    }

    @GetMapping("/{id}")
    public Ticket retrieveSingleTicket(@PathVariable Long id) {
        return ticketRepo.findById(id).get();
    }

    @PostMapping("/newTicket")
    public Optional<Ticket> startNewTicket(@RequestBody Ticket ticket){
        Ticket newTicket = new Ticket();
        ticketRepo.save(newTicket);
        Long tempId = newTicket.getId();
        return ticketRepo.findById(tempId);
    }

    @PatchMapping("/saveTicket/{id}")
    public void saveTicket(@PathVariable Long id) {
        ticketRepo.save(ticketRepo.findById(id).get());
    }

    @DeleteMapping("/{id}/removeTicketItem/{itemId}")                                      ///broken
    public void removeTicketItem(@PathVariable Long id, @PathVariable Long itemtId) {
        Ticket tempTicket = ticketRepo.findById(id).get();
        tempTicket.removeFromTicket(entreeRepo.findById(itemtId).get()); /// entree only in this case testing
        entreeRepo.deleteById(itemtId);
        ticketRepo.save(tempTicket);
    }

    @DeleteMapping("/{id}/CloseTicket")
    public void closeTicket(@PathVariable Long id) {
        Ticket tempTicket = ticketRepo.findById(id).get();
        closedTicketRepo.save(tempTicket);
        ticketRepo.delete(tempTicket);
    }

    @PatchMapping("/{id}/addItem/entree")
    public Entree addEntreeToTicket(@PathVariable Long id, @RequestBody Entree inEntree) {
        Ticket tempTicket = ticketRepo.findById(id).get();
        inEntree.addTicket(tempTicket);
        entreeRepo.save(inEntree);   /// remember that json from front end is NOT saved!!!!!
        Long tId = inEntree.getId();
        ticketRepo.save(tempTicket);
        return entreeRepo.findById(tId).get();
    }

    @PatchMapping("/{id}/addItem/appetizer")
    public Appetizer addAppetizerToTicket(@PathVariable Long id, @RequestBody Appetizer inAppetizer) {
        Ticket tempTicket = ticketRepo.findById(id).get();
        inAppetizer.addTicket(tempTicket);
        appetizerRepo.save(inAppetizer);
        Long tId = inAppetizer.getId();
        ticketRepo.save(tempTicket);
        return appetizerRepo.findById(tId).get();
    }

    @PatchMapping("/{id}/addItem/dessert")
    public Dessert addDessertToTicket(@PathVariable Long id, @RequestBody Dessert inDessert) {
        Ticket tempTicket = ticketRepo.findById(id).get();
        inDessert.addTicket(tempTicket);
        dessertRepo.save(inDessert);                                   /// remember that json from front end is NOT saved!!!!!
        Long tId = inDessert.getId();
        ticketRepo.save(tempTicket);
        return dessertRepo.findById(tId).get();
    }

    @PatchMapping("/{id}/addItem/side")
    public Side addSideToTicket(@PathVariable Long id, @RequestBody Side inSide) {
        Ticket tempTicket = ticketRepo.findById(id).get();
        inSide.addTicket(tempTicket);
        sideRepo.save(inSide);   /// remember that json from front end is NOT saved!!!!!
        Long tId = inSide.getId();
        ticketRepo.save(tempTicket);
        return sideRepo.findById(tId).get();
    }

    @PatchMapping("/{id}/addItem/alcoholicDrink")
    public AlcoholicDrink addAlcoholicDrinkToTicket(@PathVariable Long id, @RequestBody AlcoholicDrink inAlcoholicDrink) {
        Ticket tempTicket = ticketRepo.findById(id).get();
        inAlcoholicDrink.addTicket(tempTicket);
        alcoholicDrinkRepo.save(inAlcoholicDrink);   /// remember that json from front end is NOT saved!!!!!
        Long tId = inAlcoholicDrink.getId();
        ticketRepo.save(tempTicket);
        return alcoholicDrinkRepo.findById(tId).get();
    }

    @PatchMapping("/{id}/addItem/nonAlcoholicDrink")
    public NonAlcoholicDrink addNonAlcoholicDrinkToTicket(@PathVariable Long id, @RequestBody NonAlcoholicDrink inNonAlcoholicDrink) {
        Ticket tempTicket = ticketRepo.findById(id).get();
        inNonAlcoholicDrink.addTicket(tempTicket);
        nonAlcoholicDrinkRepo.save(inNonAlcoholicDrink);   /// remember that json from front end is NOT saved!!!!!
        Long tId = inNonAlcoholicDrink.getId();
        ticketRepo.save(tempTicket);
        return nonAlcoholicDrinkRepo.findById(tId).get();
    }

    @GetMapping("/{id}/getTicketItems")
    public Collection<Item> getTicketItems(@PathVariable Long id) {
        Ticket tempTicket = ticketRepo.findById(id).get();
        return tempTicket.getTicketItems();
    }

    @GetMapping("/{id}/saveToKitchen")
    public void saveToKitchen(@PathVariable Long id) {
       Ticket tempTicket = ticketRepo.findById(id).get();
       kitchenRepo.save(tempTicket);
    }

    @GetMapping("/retireveAllKitchenTickets")
    public Iterable<Ticket> retireveAllKitchenTickets() {
        ArrayList<Ticket> openTickets = new ArrayList<>();
        for(Ticket current: kitchenRepo.findAll()) {
            if (!current.isClosed()) {
                openTickets.add(current);
            }
        }
        return openTickets;
    }

    @DeleteMapping("/{id}/finishTicket")
    public  Iterable<Ticket> finishTicket(@PathVariable Long id) {
        kitchenRepo.findById(id).get().closeTicket();
        return retireveAllKitchenTickets();
    }
}
