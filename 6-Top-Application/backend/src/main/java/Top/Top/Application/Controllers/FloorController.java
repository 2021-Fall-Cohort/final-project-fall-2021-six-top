package Top.Top.Application.Controllers;

import Top.Top.Application.Models.*;
import Top.Top.Application.Repositories.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/Floor")

public class FloorController {

    private AlcoholicDrinkRepository alcoholicDrinkRepo;
    private AppetizerRepository appetizerRepo;
    private DessertRepository dessertRepo;
    private EmployeeRepository employeeRepo;
    private EntreeRepository entreeRepo;
    private NonAlcoholicDrinkRepository nonAlcoholicDrinkRepo;
    private SideRepository sideRepo;
    private TicketRepository ticketRepo;

    public FloorController(AlcoholicDrinkRepository alcoholicDrinkRepo, AppetizerRepository appetizerRepo, DessertRepository dessertRepo, EmployeeRepository employeeRepo, EntreeRepository entreeRepo, NonAlcoholicDrinkRepository nonAlcoholicDrinkRepo, SideRepository sideRepo, TicketRepository ticketRepo) {
        this.alcoholicDrinkRepo = alcoholicDrinkRepo;
        this.appetizerRepo = appetizerRepo;
        this.dessertRepo = dessertRepo;
        this.employeeRepo = employeeRepo;
        this.entreeRepo = entreeRepo;
        this.nonAlcoholicDrinkRepo = nonAlcoholicDrinkRepo;
        this.sideRepo = sideRepo;
        this.ticketRepo = ticketRepo;
    }

    @GetMapping("/AlcoholicDrinks")
    public Iterable<AlcoholicDrink> retrieveAllAlcoholicDrinks() { return alcoholicDrinkRepo.findAll(); }

    @GetMapping("/Appetizers")
    public Iterable<Appetizer> retrieveAllAppetizers() { return appetizerRepo.findAll(); }

    @GetMapping("/Desserts")
    public Iterable<Dessert> retrieveAllDesserts() { return dessertRepo.findAll(); }

    ////    EMPLOYEE ACCESS WOULD GO HERE   ////

    @GetMapping("/Entrees")
    public Iterable<Entree> retrieveAllEntrees() { return entreeRepo.findAll(); }

    @GetMapping("/NonAlcoholicDrinks")
    public Iterable<NonAlcoholicDrink> retrieveAllNonAlcoholicDrinks() { return nonAlcoholicDrinkRepo.findAll(); }

    @GetMapping("/Sides")
    public Iterable<Side> retrieveAllSides() { return sideRepo.findAll(); }

    /////   Ticket Controls     /////

    @GetMapping("/Tickets")
    public Iterable<Ticket> retrieveAllTickets() { return ticketRepo.findAll(); }
}
