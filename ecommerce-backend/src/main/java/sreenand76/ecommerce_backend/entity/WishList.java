package sreenand76.ecommerce_backend.entity;

import java.util.Optional;

import jakarta.persistence.*;

@Entity
public class WishList {
	  @Id
	  @GeneratedValue(strategy = GenerationType.IDENTITY)
	  private Long id;

	  @Column(name = "user_email", nullable = false)
	  private String userEmail;

	    @Column(name = "laptop_id", nullable = false)
	    private Long laptopId;

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

		public Long getLaptopId() {
			return laptopId;
		}

		public void setLaptopId(Long laptopId) {
			this.laptopId = laptopId;
		}
      
}
