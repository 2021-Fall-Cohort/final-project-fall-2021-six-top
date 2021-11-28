package Top.Top.Application.Controllers;

import Top.Top.Application.Models.CompanyProfile;
import Top.Top.Application.Models.Employee;
import Top.Top.Application.Repositories.CompanyProfileRepository;
import Top.Top.Application.Repositories.EmployeeRepository;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/Management")
public class ManagementController {

    private EmployeeRepository employeeRepo;
    private CompanyProfileRepository companyProfileRepo;

    public ManagementController(EmployeeRepository employeeRepo, CompanyProfileRepository companyProfileRepo) {

        this.employeeRepo = employeeRepo;
        this.companyProfileRepo = companyProfileRepo;
    }

    @GetMapping("/retrieveAllEmployees")
    public Iterable<Employee> retrieveAllEmployees() { return employeeRepo.findAll(); }

    @GetMapping("/retrieveCompanyProfile/{id}")
    public CompanyProfile retrieveCompanyProfile(@PathVariable Long id) {
        return companyProfileRepo.findById(id).get();
    }

    @PatchMapping("/changeTaxRate/{id}")
    public CompanyProfile changeTaxRate(@PathVariable Long id, @RequestBody CompanyProfile profileToEdit, String newTaxRateString) {
        if(newTaxRateString != null) {
            CompanyProfile currentProfile = companyProfileRepo.findById(id).get();
            currentProfile.changeTaxRate(newTaxRateString);
            companyProfileRepo.save(currentProfile);
        }
        return companyProfileRepo.findById(id).get();
    }

    @PostMapping("/addNewEmployee")
    public Iterable<Employee> addNewEmployee(@RequestBody Employee newEmployee) {
        employeeRepo.save(newEmployee);
        return employeeRepo.findAll();
    }
}
