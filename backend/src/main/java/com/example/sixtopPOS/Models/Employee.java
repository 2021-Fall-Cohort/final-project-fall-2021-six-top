package com.example.sixtopPOS.Models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Employee {

    @Id
    @GeneratedValue
    private Long id;

    private String name;
    private String JobTitle;

    public Employee(String name, String jobTitle) {
        this.name = name;
        JobTitle = jobTitle;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getJobTitle() {
        return JobTitle;
    }
}
