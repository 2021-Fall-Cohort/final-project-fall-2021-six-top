package com.example.sixtopPOS;

import com.example.sixtopPOS.Repositories.DrinkRepository;
import com.example.sixtopPOS.Repositories.EmployeeRepository;
import com.example.sixtopPOS.Repositories.FoodRepository;
import com.example.sixtopPOS.Repositories.ManagementRepository;
import org.springframework.stereotype.Component;

@Component
public class Populator {

    private EmployeeRepository employeeRepo;
    private FoodRepository foodRepo;
    private ManagementRepository managementRepo;
    private DrinkRepository drinkRepo;

    public Populator(EmployeeRepository employeeRepo, FoodRepository foodRepo, ManagementRepository managementRepo, DrinkRepository drinkRepo) {
        this.employeeRepo = employeeRepo;
        this.foodRepo = foodRepo;
        this.managementRepo = managementRepo;
        this.drinkRepo = drinkRepo;
    }

    @Override
    public void run(String... args) throws Exception {





    }
}
