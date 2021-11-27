package Top.Top.Application.Controllers;

import Top.Top.Application.Models.Employee;
import Top.Top.Application.Repositories.EmployeeRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/Management")
public class ManagementController {

    private EmployeeRepository employeeRepo;

    public ManagementController(EmployeeRepository employeeRepo) {
        this.employeeRepo = employeeRepo;
    }

    @GetMapping("/retrieveAllEmployees")
    public Iterable<Employee> retrieveAllEmployees() { return employeeRepo.findAll(); }
}
