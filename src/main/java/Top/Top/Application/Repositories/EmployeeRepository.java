package Top.Top.Application.Repositories;

import Top.Top.Application.Models.Employee;
import org.springframework.data.repository.CrudRepository;

public interface EmployeeRepository extends CrudRepository<Employee, Long > {
}
