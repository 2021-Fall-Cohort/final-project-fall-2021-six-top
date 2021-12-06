package Top.Top.Application.Repositories;

import Top.Top.Application.Models.Ticket;
import org.springframework.data.repository.CrudRepository;

public interface KitchenRepository extends CrudRepository<Ticket, Long> {
}
