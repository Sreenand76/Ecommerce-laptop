package sreenand76.ecommerce_backend.entity;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.*;

@Entity
public class Laptop {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String brand;
    private double basePrice;  
    private String description;
    private String imageUrl;   

	// Static specs
    private String processor;     
    private String graphicsCard;  
    private String batteryLife;   
    private String os;            
    private String displaySize;   
    private String displayDetails; 

    @OneToMany(mappedBy = "laptop", cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    @JsonManagedReference
    private List<LaptopSpec> specs;
    
    @OneToMany(mappedBy = "laptop", cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    private List<LaptopColor> availableColors = new ArrayList<>();

    public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getBrand() {
		return brand;
	}

	public void setBrand(String brand) {
		this.brand = brand;
	}

	public double getBasePrice() {
		return basePrice;
	}

	public void setBasePrice(double basePrice) {
		this.basePrice = basePrice;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getImageUrl() {
		return imageUrl;
	}

	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}

	public List<LaptopColor> getAvailableColours() {
		return availableColors;
	}

	public void setAvailableColours(List<LaptopColor> availableColours) {
		this.availableColors = availableColours;
	}

	public String getProcessor() {
		return processor;
	}

	public void setProcessor(String processor) {
		this.processor = processor;
	}

	public String getGraphicsCard() {
		return graphicsCard;
	}

	public void setGraphicsCard(String graphicsCard) {
		this.graphicsCard = graphicsCard;
	}

	public String getBatteryLife() {
		return batteryLife;
	}

	public void setBatteryLife(String batteryLife) {
		this.batteryLife = batteryLife;
	}

	public String getOs() {
		return os;
	}

	public void setOs(String os) {
		this.os = os;
	}

	public String getDisplaySize() {
		return displaySize;
	}

	public void setDisplaySize(String displaySize) {
		this.displaySize = displaySize;
	}

	public String getDisplayDetails() {
		return displayDetails;
	}

	public void setDisplayDetails(String displayDetails) {
		this.displayDetails = displayDetails;
	}

	public List<LaptopSpec> getSpecs() {
		return specs;
	}

	public void setSpecs(List<LaptopSpec> specs) {
		this.specs = specs;
	}

	public Laptop() {}

	public Laptop(String name, String brand, double basePrice, String description, String imageUrl,
			List<LaptopColor> availableColours, String processor, String graphicsCard, String batteryLife, String os,
			String displaySize, String displayDetails, List<LaptopSpec> specs) {
		super();
		this.name = name;
		this.brand = brand;
		this.basePrice = basePrice;
		this.description = description;
		this.imageUrl = imageUrl;
		this.availableColors = availableColours;
		this.processor = processor;
		this.graphicsCard = graphicsCard;
		this.batteryLife = batteryLife;
		this.os = os;
		this.displaySize = displaySize;
		this.displayDetails = displayDetails;
		this.specs = specs;
	}
	    
}

