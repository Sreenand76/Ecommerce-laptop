package sreenand76.ecommerce_backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "cart_items")
public class CartItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
  
    @Column(name = "user_email", nullable = false)
    private String userEmail;
   
    @Column(name = "laptop_id", nullable = false)
    private String laptopId;  // Main laptop reference

    private String color;  // e.g., Black, Silver, etc.
    private String ram;    // e.g., 8GB, 16GB, etc.
    private String storage; // e.g., 512GB SSD, etc.
    private int quantity;  // Quantity of this laptop variant in the cart
    
	@Column(name = "total_price")
    private Long totalPrice; 
    
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getUserEmail() {
		return userEmail;
	}

	public void setUserEmail(String userEmail) {
		this.userEmail = userEmail;
	}

	public String getLaptopId() {
		return laptopId;
	}

	public void setLaptopId(String laptopId) {
		this.laptopId = laptopId;
	}

	public String getColor() {
		return color;
	}

	public void setColor(String color) {
		this.color = color;
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

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}
     
	public Long getTotalPrice() {
		return totalPrice;
	}

	public void setTotalPrice(Long totalPrice) {
		this.totalPrice = totalPrice;
	}
	public CartItem() {}

	public CartItem(String color, String ram, String storage, int quantity,Long totalPrice) {
		super();
		this.color = color;
		this.ram = ram;
		this.storage = storage;
		this.quantity = quantity;
		this.totalPrice=totalPrice;
	}    
}
