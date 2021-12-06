package Top.Top.Application;
import Top.Top.Application.Models.*;
import Top.Top.Application.Repositories.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class Populator implements CommandLineRunner {

    private AlcoholicDrinkRepository alcoholicDrinkRepo;
    private AppetizerRepository appetizerRepo;
    private DessertRepository dessertRepo;
    private EmployeeRepository employeeRepo;
    private EntreeRepository entreeRepo;
    private NonAlcoholicDrinkRepository nonAlcoholicDrinkRepo;
    private SideRepository sideRepo;
    private TicketRepository ticketRepo;
    private CompanyProfileRepository companyProfileRepo;
    private ModifierCategoryRepository modifierCategoryRepo;
    private ModifiersRepository modifiersRepo;

    public Populator(AlcoholicDrinkRepository alcoholicDrinkRepo, AppetizerRepository appetizerRepo, DessertRepository dessertRepo, EmployeeRepository employeeRepo, EntreeRepository entreeRepo, NonAlcoholicDrinkRepository nonAlcoholicDrinkRepo, SideRepository sideRepo, TicketRepository ticketRepo, CompanyProfileRepository companyProfileRepo, ModifierCategoryRepository modifierCategoryRepo, ModifiersRepository modifiersRepo) {
        this.alcoholicDrinkRepo = alcoholicDrinkRepo;
        this.appetizerRepo = appetizerRepo;
        this.dessertRepo = dessertRepo;
        this.employeeRepo = employeeRepo;
        this.entreeRepo = entreeRepo;
        this.nonAlcoholicDrinkRepo = nonAlcoholicDrinkRepo;
        this.sideRepo = sideRepo;
        this.ticketRepo = ticketRepo;
        this.companyProfileRepo = companyProfileRepo;
        this.modifierCategoryRepo = modifierCategoryRepo;
        this.modifiersRepo = modifiersRepo;
    }

    @Override
    public void run(String... args)throws Exception {

        ////    initial co. profile     ////
        CompanyProfile administrator = new CompanyProfile("Brew’d Awakening", "1609 Bad Route rd, Beach front city, fl 37099", 0.06f);
        companyProfileRepo.save(administrator);

        ModifierItem mayo = new ModifierItem ("mayo", false);
        ModifierItem ketchup =  new ModifierItem("Ketchup", true);
        ModifierItem mustard =  new ModifierItem("Mustard", true);
        ModifierItem lettuce =  new ModifierItem("Lettuce", true);

        modifiersRepo.save(mayo);
        modifiersRepo.save(ketchup);

        ModifierCategory burgerMods = new ModifierCategory("Burgers", mayo, ketchup);
        modifierCategoryRepo.save(burgerMods);
        mayo.setModifier(burgerMods);
        modifiersRepo.save(mayo);
        ketchup.setModifier(burgerMods);
        modifiersRepo.save(ketchup);


        /////////////////////////////////////
        ////    Alcoholic Drink Section ////
        AlcoholicDrink budweiser = new AlcoholicDrink("Budweiser", 2.99F, true, true, true);
        alcoholicDrinkRepo.save(budweiser);

        AlcoholicDrink budLight = new AlcoholicDrink("Bud Light", 2.99f, true, true,true);
        alcoholicDrinkRepo.save(budLight);

        AlcoholicDrink modelo = new AlcoholicDrink("Modelo", 3.99f, true,true,true);
        alcoholicDrinkRepo.save(modelo);

        /////////////////////////////////
        ////    NonAlcoholic Drink Section   ////
        NonAlcoholicDrink coke = new NonAlcoholicDrink("Coke", 2.99F, false, true,true);
        nonAlcoholicDrinkRepo.save(coke);

        NonAlcoholicDrink sprite = new NonAlcoholicDrink("Sprite", 2.99f, false, true,true);
        nonAlcoholicDrinkRepo.save(sprite);

        NonAlcoholicDrink canadaDry = new NonAlcoholicDrink("Canada Dry", 3.99f, false,true,true);
        nonAlcoholicDrinkRepo.save(canadaDry);
        /////////////////////////////////


        ////    Appetizer Section   ////
        Appetizer cheeseSticks = new Appetizer("Mozzarella Sticks", 4.99f, "7 breaded and fried mozzarella cheese sticks, served with ranch or marinara sauce", true,true);
        appetizerRepo.save(cheeseSticks);

        Appetizer bonelessWings = new Appetizer("Boneless Wings", 5.99f, "boneless Buffalo Wings", true,true);
        appetizerRepo.save(bonelessWings);

        /////////////////////////////
        ////    Dessert Section ////
        Dessert vanillaIceCream = new Dessert("Vanilla IceCream", 3.00f, "Two Scoops Of Vanilla Bean", true, true);
        dessertRepo.save(vanillaIceCream);

        Dessert applePie = new Dessert("Apple Pie", 6.00f, "One piece of made in house Apple pie", true, true);
        dessertRepo.save(applePie);

        /////////////////////////////
        ////    Entree Section  ////
        Entree cheeseBurger = new Entree("Cheese Burger", 08.99F, "Classic american cheese burger served with lettuce, tomato, pickle, onion, mayo, and a side of fries", true, burgerMods,true);
        entreeRepo.save(cheeseBurger);

        Entree phillyCheeseSteak = new Entree("Philly Cheese Steak", 11.50f, "Steak, onions, and bell peppers grilled and topped with cheese. served on a hoagie roll", true, burgerMods, true);
        entreeRepo.save(phillyCheeseSteak);

        /////////////////////////////
        ////    Sides Section   ////
        Side fries = new Side("French Fries", 2.50f, "Fried potatoes", true, true);
        sideRepo.save(fries);

        Side mashedPotatoes = new Side("Mashed Potatoes", 3.00f, "Made from scratch mashed potatoes with cream and butter", true, true);
        sideRepo.save(mashedPotatoes);

        /////////////////////////////////
        ////    Employee Section    ////
        Employee janetMalarkey = new Employee("Janet", "Malarkey", "Server");
        employeeRepo.save(janetMalarkey);

        Employee justinCrampin = new Employee("Justin", "Crampin", "Server");
        employeeRepo.save(justinCrampin);

        Employee karaVans = new Employee("Kara", "Vans", "Server");
        employeeRepo.save(karaVans);

        Employee leeVatip = new Employee("Lee", "Vatip", "Server");
        employeeRepo.save(leeVatip);

        Employee armandHammer = new Employee("Armand", "Hammer", "Server");
        employeeRepo.save(armandHammer);

        Employee alDente = new Employee("Al", "Dente", "Cook");
        employeeRepo.save(alDente);

        Employee eatonWright = new Employee("Eaton", "Wright", "Cook");
        employeeRepo.save(eatonWright);

        Employee moNerong = new Employee("Mo", "Nerong", "Manager");
        employeeRepo.save(moNerong);

        /// test Ticket
//        Ticket testTicket = new Ticket(phillyCheeseSteak, mashedPotatoes, modelo);  ///
//        ticketRepo.save(testTicket);


    }
}
