package sreenand76.ecommerce_backend.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

@Entity
public class LaptopSpec {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "laptop_id", nullable = false)
    @JsonBackReference 
    private Laptop laptop;    
    private String specType;  
    private String specValue;
          
	private double priceAdjustment; 
	    
    public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getSpecType() {
		return specType;
	}
	public void setSpecType(String specType) {
		this.specType = specType;
	}
	public String getSpecValue() {
		return specValue;
	}
	public void setSpecValue(String specValue) {
		this.specValue = specValue;
	}
	public double getPriceAdjustment() {
		return priceAdjustment;
	}
	public void setPriceAdjustment(double priceAdjustment) {
		this.priceAdjustment = priceAdjustment;
	}
	public Laptop getLaptop() {
		return laptop;
	}
	public void setLaptop(Laptop laptop) {
		this.laptop = laptop;
	}
	public LaptopSpec() {
		super();
	}
	public LaptopSpec(Laptop laptop, String specType, String specValue, double priceAdjustment) {
        this.laptop = laptop;
        this.specType = specType;
        this.specValue = specValue;
        this.priceAdjustment = priceAdjustment;
    }
	
}