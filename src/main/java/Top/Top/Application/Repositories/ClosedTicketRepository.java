package Top.Top.Application.Repositories;

import Top.Top.Application.Models.Ticket;
import org.springframework.data.repository.CrudRepository;

public interface ClosedTicketRepository extends CrudRepository<Ticket, Long> {
}
