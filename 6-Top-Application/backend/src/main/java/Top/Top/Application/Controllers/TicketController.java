package Top.Top.Application.Controllers;
import Top.Top.Application.Models.*;
import Top.Top.Application.Repositories.*;
import org.springframework.web.bind.annotation.*;

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

    public TicketController(TicketRepository ticketRepo, ClosedTicketRepository closedTicketRepo, EntreeRepository entreeRepo) {
        this.ticketRepo = ticketRepo;
        this.closedTicketRepo = closedTicketRepo;
        this.entreeRepo = entreeRepo;
    }

    @GetMapping("/OpenTickets")
    public Iterable<Ticket> retrieveAllOpenTickets() { return ticketRepo.findAll(); }

    @GetMapping("/{id}")
    public Ticket retrieveSingleTicket(@PathVariable Long id) {
        return ticketRepo.findById(id).get();
    }

    @PostMapping("/newTicket")                                  ///// Questionable //////
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


    @DeleteMapping("/{id}/CloseTicket")
    public void closeTicket(@PathVariable Long id) {
        Ticket tempTicket = ticketRepo.findById(id).get();
        closedTicketRepo.save(tempTicket);
        ticketRepo.delete(tempTicket);
    }

    @PatchMapping("/{id}/addItem/entree")
    public Ticket addEntreeToTicket(@PathVariable Long id, @RequestBody Entree inEntree) {
        Ticket tempTicket = ticketRepo.findById(id).get();
        inEntree.addTicket(tempTicket);
        entreeRepo.save(inEntree);   /// remember that json from front end is NOT saved!!!!!
        ticketRepo.save(tempTicket);
        return tempTicket;
    }

    @PatchMapping("/{id}/addItem/appetizer")
    public Ticket addAppetizerToTicket(@PathVariable Long id, @RequestBody Appetizer inAppetizer) {
        Ticket tempTicket = ticketRepo.findById(id).get();
        inAppetizer.addTicket(tempTicket);
//        appetizerRepo.save(inAppetizer);   /// remember that json from front end is NOT saved!!!!!
        ticketRepo.save(tempTicket);
        return tempTicket;
    }

    @PatchMapping("/{id}/addItem/dessert")
    public Ticket addDessertToTicket(@PathVariable Long id, @RequestBody Dessert inDessert) {
        Ticket tempTicket = ticketRepo.findById(id).get();
        inDessert.addTicket(tempTicket);
        dessertRepo.save(inDessert);   /// remember that json from front end is NOT saved!!!!!
        ticketRepo.save(tempTicket);
        return tempTicket;
    }

    @PatchMapping("/{id}/addItem/side")
    public Ticket addSideToTicket(@PathVariable Long id, @RequestBody Side inSide) {
        Ticket tempTicket = ticketRepo.findById(id).get();
        inSide.addTicket(tempTicket);
//        sideRepo.save(inSide);   /// remember that json from front end is NOT saved!!!!!
        ticketRepo.save(tempTicket);
        return tempTicket;
    }

    @PatchMapping("/{id}/addItem/alcoholicDrink")
    public Ticket addAlcoholicDrinkToTicket(@PathVariable Long id, @RequestBody AlcoholicDrink inAlcoholicDrink) {
        Ticket tempTicket = ticketRepo.findById(id).get();
        inAlcoholicDrink.addTicket(tempTicket);
        alcoholicDrinkRepo.save(inAlcoholicDrink);   /// remember that json from front end is NOT saved!!!!!
        ticketRepo.save(tempTicket);
        return tempTicket;
    }

    @PatchMapping("/{id}/addItem/nonAlcoholicDrink")
    public Ticket addNonAlcoholicDrinkToTicket(@PathVariable Long id, @RequestBody NonAlcoholicDrink inNonAlcoholicDrink) {
        Ticket tempTicket = ticketRepo.findById(id).get();
        inNonAlcoholicDrink.addTicket(tempTicket);
//        nonAlcoholicDrinkRepo.save(inNonAlcoholicDrink);   /// remember that json from front end is NOT saved!!!!!
        ticketRepo.save(tempTicket);
        return tempTicket;
    }
}
