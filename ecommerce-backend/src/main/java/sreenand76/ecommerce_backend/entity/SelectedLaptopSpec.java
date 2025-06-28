package sreenand76.ecommerce_backend.entity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
public class SelectedLaptopSpec {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @JsonIgnore
    @ManyToOne(optional = false)
    @JoinColumn(name = "laptop_id", nullable = false)
    private Laptop laptop;

    @Column(nullable = false)
    private String ram; 

    @Column(nullable = false)
    private String storage; 

    @Column(nullable = false)
    private String color;
    
    @Column(name = "used_in")
    private String usedIn;
    
	@Column(name = "final_price", nullable = false)
    private double finalPrice;

    public void setId(Long id) {
		this.id = id;
	}

	// Constructors
    public SelectedLaptopSpec() {
    }

    public SelectedLaptopSpec(Laptop laptop, String ram, String storage, String color, double finalPrice) {
        this.laptop = laptop;
        this.ram = ram;
        this.storage = storage;
        this.color = color;
        this.finalPrice = finalPrice;
    }

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public Laptop getLaptop() {
        return laptop;
    }

    public void setLaptop(Laptop laptop) {
        this.laptop = laptop;
    }

    public String getRam() {
        return ram;
    }

    public void setRam(String ram) {
        this.ram = ram;
    }

    public String getStorage() {
        return storage;
    }

    public void setStorage(String storage) {
        this.storage = storage;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

	public double getFinalPrice() {
        return finalPrice;
    }

    public void setFinalPrice(double finalPrice) {
        this.finalPrice = finalPrice;
    }
    
    public String getUsedIn() {
		return usedIn;
	}

	public void setUsedIn(String usedIn) {
		this.usedIn = usedIn;
	}
	
    public SelectedLaptopSpec(Long id, Laptop laptop, String ram, String storage, String color, double finalPrice) {
		super();
		this.id = id;
		this.laptop = laptop;
		this.ram = ram;
		this.storage = storage;
		this.color = color;
		this.finalPrice = finalPrice;
	}

}
