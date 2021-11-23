package Top.Top.Application.Controllers;
import Top.Top.Application.Models.Ticket;
import Top.Top.Application.Repositories.ClosedTicketRepository;
import Top.Top.Application.Repositories.TicketRepository;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/Tickets")
public class TicketController {

    private TicketRepository ticketRepo;
    private ClosedTicketRepository closedTicketRepo;

    public TicketController(TicketRepository ticketRepo, ClosedTicketRepository closedTicketRepo) {
        this.ticketRepo = ticketRepo;
        this.closedTicketRepo = closedTicketRepo;
    }

    @GetMapping("/OpenTickets")
    public Iterable<Ticket> retrieveAllOpenTickets() { return ticketRepo.findAll(); }

    @GetMapping("/{id}")
    public Ticket retrieveSingleTicket(@PathVariable Long id) {
        return ticketRepo.findById(id).get();
    }

    @PostMapping("/newTicket")                                  ///// Questionable //////
    public Optional<Ticket> startNewTicket() {
        Ticket newTicket = new Ticket();
        ticketRepo.save(newTicket);
        Long tempId = newTicket.getId();
        return ticketRepo.findById(tempId);
    }

    @DeleteMapping("/{id}/CloseTicket")
    public String closeTicket(@PathVariable Long id) {
        Ticket tempTicket = ticketRepo.findById(id).get();
        closedTicketRepo.save(tempTicket);
        ticketRepo.delete(tempTicket);
        return "redirect:/html/Floor.html";                                     /// get redirect working ///
    }



}
