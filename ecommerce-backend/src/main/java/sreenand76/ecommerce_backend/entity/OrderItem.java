package sreenand76.ecommerce_backend.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.*;

@Entity
public class OrderItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
	@ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "order_id", nullable = false)
	@JsonBackReference
    private Order order;
	
	@ManyToOne
    @JoinColumn(name = "laptop_id", nullable = false)
    private Laptop laptop;

	@OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "selected_spec_id")
    private SelectedLaptopSpec selectedSpec;

	public OrderItem() {
		super();
	}

	private int quantity;
    
    @Column(name = "total_price")
    private double totalPrice;
    

    public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Order getOrder() {
		return order;
	}

	public void setOrder(Order order) {
		this.order = order;
	}

	public SelectedLaptopSpec getLaptopSpec() {
		return selectedSpec;
	}

	public void setLaptopSpec(SelectedLaptopSpec selectedSpec) {
		this.selectedSpec = selectedSpec;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	public double getTotalPrice() {
		return totalPrice;
	}

	public void setTotalPrice(double totalPrice) {
		this.totalPrice = totalPrice;
	}
      
	public Laptop getLaptop() {
		return laptop;
	}

	public void setLaptop(Laptop laptop) {
		this.laptop = laptop;
	}

	public SelectedLaptopSpec getSelectedSpec() {
		return selectedSpec;
	}

	public void setSelectedSpec(SelectedLaptopSpec selectedSpec) {
		this.selectedSpec = selectedSpec;
	}
	
	public OrderItem(Long id, Order order, SelectedLaptopSpec selectedSpec, int quantity, double totalPrice) {
		super();
		this.id = id;
		this.order = order;
		this.selectedSpec = selectedSpec;
		this.quantity = quantity;
		this.totalPrice = totalPrice;
	}
}