package Top.Top.Application.Controllers;
import Top.Top.Application.Models.Entree;
import Top.Top.Application.Models.Item;
import Top.Top.Application.Models.Ticket;
import Top.Top.Application.Repositories.ClosedTicketRepository;
import Top.Top.Application.Repositories.EntreeRepository;
import Top.Top.Application.Repositories.TicketRepository;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/Tickets")
public class TicketController {

    private TicketRepository ticketRepo;
    private ClosedTicketRepository closedTicketRepo;

    private EntreeRepository entreeRepo;

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
    public Optional<Ticket> startNewTicket(@RequestBody Ticket ticket) {
        Ticket newTicket = new Ticket();
        ticketRepo.save(newTicket);
        Long tempId = newTicket.getId();
        return ticketRepo.findById(tempId);
    }

    @DeleteMapping("/{id}/CloseTicket")
    public void closeTicket(@PathVariable Long id) {
        Ticket tempTicket = ticketRepo.findById(id).get();
        closedTicketRepo.save(tempTicket);
        ticketRepo.delete(tempTicket);
    }

    @PatchMapping("/{id}/addItem")
    public Ticket addItemToTicket(@PathVariable Long id, @RequestBody Entree inEntree) {
        Ticket tempTicket = ticketRepo.findById(id).get();
        inEntree.addTicket(tempTicket);
//        entreeRepo.save(inEntree);   /// remember that json from front end is NOT saved!!!!!
        ticketRepo.save(tempTicket);

        return tempTicket;
    }
}
