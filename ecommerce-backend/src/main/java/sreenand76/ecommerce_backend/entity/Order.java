package sreenand76.ecommerce_backend.entity;

import java.time.LocalDate;
import jakarta.persistence.*;

@Entity
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderId;

    @Column(name = "user_email", nullable = false)
    private String userEmail;

    @Column(name = "laptop_id", nullable = false)
    private String laptopId; 

    private String color; 
    private String ram; 
    private String storage; 

    @Column(name = "order_date")
    private LocalDate orderDate; 

    private int quantity; 

    @Column(name = "total_price")
    private Long totalPrice; 

    private String status; 

    @Column(name = "shipping_address")
    private String shippingAddress; 

    private Long phno;
    
    public Long getPhno() {
		return phno;
	}

	public void setPhno(Long phno) {
		this.phno = phno;
	}

	public Long getId() {
        return orderId;
    }

    public void setId(Long id) {
        this.orderId = id;
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

    public LocalDate getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(LocalDate orderDate) {
        this.orderDate = orderDate;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Long getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(Long totalPrice) {
        this.totalPrice = totalPrice;
    }

    public String getShippingAddress() {
        return shippingAddress;
    }

    public void setShippingAddress(String shippingAddress) {
        this.shippingAddress = shippingAddress;
    }
    public Order() {}
    
    public Order(String shippingAddress,Long phno) {
    	this.shippingAddress=shippingAddress;
    	this.phno=phno;
    }

	public Order(Long orderId,String userEmail, String laptopId, String color, String ram, String storage, 
			int quantity, Long totalPrice, String status, String shippingAddress, Long phno) {
		this.orderId=orderId;
		this.userEmail = userEmail;
		this.laptopId = laptopId;
		this.color = color;
		this.ram = ram;
		this.storage = storage;
		this.quantity = quantity;
		this.totalPrice = totalPrice;
		this.status = status;
		this.shippingAddress = shippingAddress;
		this.phno = phno;
	}
    
}


