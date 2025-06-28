package sreenand76.ecommerce_backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "cart_items")
public class CartItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private int quantity;
       
    @Column(name = "total_price")
    private double totalPrice;
    
    @ManyToOne
    @JoinColumn(name = "laptop_id", nullable = false)
    private Laptop laptop;
    
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "selected_spec_id")
    private SelectedLaptopSpec selectedSpec;
    
	public Laptop getLaptop() {
		return laptop;
	}

	public void setLaptop(Laptop laptop) {
		this.laptop = laptop;
	}

	

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}
     
	public CartItem() {}

	public SelectedLaptopSpec getSelectedSpec() {
	    return selectedSpec;
	}

	public void setSelectedSpec(SelectedLaptopSpec selectedSpec) {
	    this.selectedSpec = selectedSpec;
	}

	public double getTotalPrice() {
		return totalPrice;
	}

	public void setTotalPrice(double totalPrice) {
		this.totalPrice = totalPrice;
	}

	public CartItem(Long id, User user,  SelectedLaptopSpec selectedSpec, int quantity, double totalPrice) {
		super();
		this.id = id;
		this.user = user;
		this.selectedSpec = selectedSpec;
		this.quantity = quantity;
		this.totalPrice = totalPrice;
	}	 
}
