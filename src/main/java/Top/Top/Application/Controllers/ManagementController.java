package Top.Top.Application.Controllers;

import Top.Top.Application.Models.*;
import Top.Top.Application.Repositories.*;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/Management")
public class ManagementController {

    private EmployeeRepository employeeRepo;
    private CompanyProfileRepository companyProfileRepo;
    private EntreeRepository entreeRepo;
    private AlcoholicDrinkRepository alcoholicDrinkRepo;
    private AppetizerRepository appetizerRepo;
    private DessertRepository dessertRepo;
    private NonAlcoholicDrinkRepository nonAlcoholicDrinkRepo;
    private SideRepository sideRepo;

    public ManagementController(EmployeeRepository employeeRepo, CompanyProfileRepository companyProfileRepo, EntreeRepository entreeRepo, NonAlcoholicDrinkRepository nonAlcoholicDrinkRepo, SideRepository sideRepo, AlcoholicDrinkRepository alcoholicDrinkRepo, AppetizerRepository appetizerRepo, DessertRepository dessertRepo) {
        this.employeeRepo = employeeRepo;
        this.companyProfileRepo = companyProfileRepo;
        this.entreeRepo = entreeRepo;
        this.alcoholicDrinkRepo = alcoholicDrinkRepo;
        this.appetizerRepo = appetizerRepo;
        this.dessertRepo = dessertRepo;
        this.nonAlcoholicDrinkRepo = nonAlcoholicDrinkRepo;
        this.sideRepo = sideRepo;
    }

    @GetMapping("/retrieveAllEmployees")
    public Iterable<Employee> retrieveAllEmployees() { return employeeRepo.findAll(); }

    @GetMapping("/retrieveCompanyProfile/{id}")
    public CompanyProfile retrieveCompanyProfile(@PathVariable Long id) {
        return companyProfileRepo.findById(id).get();
    }

    @PatchMapping("/changeTaxRate/{id}")
    public CompanyProfile changeTaxRate(@PathVariable Long id,  @RequestBody String newTaxRateString) {
        CompanyProfile companyProfile = companyProfileRepo.findById(id).get();
        companyProfile.changeTaxRate(newTaxRateString);
        companyProfileRepo.save(companyProfile);
        return companyProfileRepo.findById(id).get();
    }

    @PostMapping("/addNewEmployee")
    public Iterable<Employee> addNewEmployee(@RequestBody Employee newEmployee) {
        employeeRepo.save(newEmployee);
        return employeeRepo.findAll();
    }

    @PostMapping("/addCreateNewEntree")
    public void addCreateNewEntree(@RequestBody Entree newEntree) {
        entreeRepo.save(newEntree);
    }

    @PostMapping("/addCreateNewSide")
    public void addCreateNewSide(@RequestBody Side newSide) {
        sideRepo.save(newSide);
    }

    @PostMapping("/addCreateNewAppetizer")
    public void addCreateNewAppetizer(@RequestBody Appetizer newAppetizer) {
        appetizerRepo.save(newAppetizer);
    }

    @PostMapping("/addCreateNewDessert")
    public void addCreateNewDessert(@RequestBody Dessert newDessert) {
        dessertRepo.save(newDessert);
    }

    @PostMapping("/addCreateNewNonAlcoholicDrink")
    public void addCreateNewNonAlcoholicDrink(@RequestBody NonAlcoholicDrink newNonAlcoholicDrink) {
        nonAlcoholicDrinkRepo.save(newNonAlcoholicDrink);
    }

    @PostMapping("/addCreateNewAlcoholicDrink")
    public void addCreateNewAlcoholicDrink(@RequestBody AlcoholicDrink newAlcoholicDrink) {
        alcoholicDrinkRepo.save(newAlcoholicDrink);
    }
}
