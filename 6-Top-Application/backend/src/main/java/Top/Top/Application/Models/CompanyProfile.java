package Top.Top.Application.Models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.util.Objects;

@Entity
public class CompanyProfile {

    @Id
    @GeneratedValue
    private Long id;

    private String companyName;
    private String companyAddress;

    private Float taxRate;

    public CompanyProfile(String companyName, String companyAddress, Float taxRate) {
        this.companyName = companyName;
        this.companyAddress = companyAddress;
        this.taxRate = taxRate;
    }

    public CompanyProfile() {
    }

    public Long getId() {
        return id;
    }

    public String getCompanyName() {
        return companyName;
    }

    public String getCompanyAddress() {
        return companyAddress;
    }

    public Float getTaxRate() {
        return taxRate;
    }

    public void changeTaxRate(String newTaxRateString) {
        this.taxRate = Float.parseFloat(newTaxRateString);
    }


}
