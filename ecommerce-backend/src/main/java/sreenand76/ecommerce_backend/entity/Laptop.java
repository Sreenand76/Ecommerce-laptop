package sreenand76.ecommerce_backend.entity;

import java.util.List;

import jakarta.persistence.*;

@Entity
public class Laptop {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String brand;
    private double basePrice;  // Base price before any dynamic spec adjustments
    private String description;
    private String imageUrl;   // For product images
    private List<String> availableColours;
    
	// Static specs
    private String processor;     // e.g., i7, i5
    private String graphicsCard;  // e.g., NVIDIA GTX, Intel UHD
    private String batteryLife;   // e.g., 10 hours
    private String os;            // e.g., Windows 10, Linux
    private String displaySize;   // e.g., 15.6 inches
    private String displayDetails; // e.g., Full HD, 4K

    // Available dynamic specs (RAM and ROM)
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<LaptopSpec> specs;

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

	public List<String> getAvailableColours() {
		return availableColours;
	}

	public void setAvailableColours(List<String> availableColours) {
		this.availableColours = availableColours;
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
			List<String> availableColours, String processor, String graphicsCard, String batteryLife, String os,
			String displaySize, String displayDetails, List<LaptopSpec> specs) {
		super();
		this.name = name;
		this.brand = brand;
		this.basePrice = basePrice;
		this.description = description;
		this.imageUrl = imageUrl;
		this.availableColours = availableColours;
		this.processor = processor;
		this.graphicsCard = graphicsCard;
		this.batteryLife = batteryLife;
		this.os = os;
		this.displaySize = displaySize;
		this.displayDetails = displayDetails;
		this.specs = specs;
	}
	    
}

