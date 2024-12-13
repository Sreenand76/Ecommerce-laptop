package sreenand76.ecommerce_backend.entity;

import jakarta.persistence.*;


@Entity
public class LaptopSpec {
   
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String specType;  // e.g., RAM, ROM
    private String specValue; // e.g., 8GB, 512GB
    private double priceAdjustment; // Price adjustment for that spec (if any)
	
    
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
   
}