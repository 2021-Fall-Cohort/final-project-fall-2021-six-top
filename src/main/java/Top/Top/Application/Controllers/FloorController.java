package Top.Top.Application.Controllers;

import Top.Top.Application.Models.*;
import Top.Top.Application.Repositories.*;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

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

    @DeleteMapping("/deleteSingleEntree/{id}")
    public void deleteSingleEntree(@PathVariable Long id) {
        Entree singleTempEntree = entreeRepo.findById(id).get();
        Ticket singleTicket = ticketRepo.findById(singleTempEntree.getTicket().getId()).get();
        singleTicket.removeFromTicket(singleTempEntree);
        ticketRepo.save(singleTicket);
        entreeRepo.deleteById(id);
    }

    @DeleteMapping("/deleteSingleAppetizer/{id}")
    public void deleteSingleAppetizer(@PathVariable Long id) {
        appetizerRepo.deleteById(id);
    }

    @DeleteMapping("/deleteSingleAlcoholicDrink/{id}")
    public void deleteSingleAlcoholicDrink(@PathVariable Long id) {
        alcoholicDrinkRepo.deleteById(id);
    }

    @DeleteMapping("/deleteSingleNonAlcoholicDrink/{id}")
    public void deleteSingleNonAlcoholicDrink(@PathVariable Long id) {
        nonAlcoholicDrinkRepo.deleteById(id);
    }

    @DeleteMapping("/deleteSingleSide/{id}")
    public void deleteSingleSide(@PathVariable Long id) {
        sideRepo.deleteById(id);
    }

    @DeleteMapping("/deleteSingleDessert/{id}")
    public void deleteSingleDessert(@PathVariable Long id) {
        dessertRepo.deleteById(id);
    }

    @GetMapping("/AlcoholicDrinks")
    public Iterable<AlcoholicDrink> retrieveAllAlcoholicDrinks() {
        ArrayList<AlcoholicDrink> shownDrinks = new ArrayList<AlcoholicDrink>();
        for(AlcoholicDrink current: alcoholicDrinkRepo.findAll()) {
            if(current.isShowOnMenu()) {
                shownDrinks.add(current);
            }
        }
        return shownDrinks;
    }

    @GetMapping("/Appetizers")
    public Iterable<Appetizer> retrieveAllAppetizers() {
        ArrayList<Appetizer> shownAppetizer = new ArrayList<>();
        for(Appetizer current: appetizerRepo.findAll()) {
            if(current.isShowOnMenu()) {
                shownAppetizer.add(current);
            }
        }
        return shownAppetizer;
    }

    @GetMapping("/Desserts")
    public Iterable<Dessert> retrieveAllDesserts() {
        ArrayList<Dessert> shownDessert = new ArrayList<>();
        for(Dessert current: dessertRepo.findAll()) {
            if(current.isShowOnMenu()) {
                shownDessert.add(current);
            }
        }
        return shownDessert;
    }

    ////    EMPLOYEE ACCESS WOULD GO HERE   ////

    @GetMapping("/Entrees")
    public Iterable<Entree> retrieveAllEntrees() {
        ArrayList<Entree> shownEntree = new ArrayList<Entree>();
        for(Entree current: entreeRepo.findAll()) {
            if(current.isShowOnMenu()) {
                shownEntree.add(current);
            }
        }
        return shownEntree;
    }

    @GetMapping("/NonAlcoholicDrinks")
    public Iterable<NonAlcoholicDrink> retrieveAllNonAlcoholicDrinks() {
        ArrayList<NonAlcoholicDrink> shownNonAlcoholicDrink = new ArrayList<>();
        for(NonAlcoholicDrink current: nonAlcoholicDrinkRepo.findAll()) {
            if(current.isShowOnMenu()) {
                shownNonAlcoholicDrink.add(current);
            }
        }

        return shownNonAlcoholicDrink;
    }

    @GetMapping("/Sides")
    public Iterable<Side> retrieveAllSides() {
        ArrayList<Side> shownSide = new ArrayList<>();
        for(Side current: sideRepo.findAll()) {
            if(current.isShowOnMenu()) {
                shownSide.add(current);
            }
        }
        return shownSide;
    }

    /////   Ticket Controls     /////

    @GetMapping("/Tickets")
    public Iterable<Ticket> retrieveAllTickets() { return ticketRepo.findAll(); }
}
