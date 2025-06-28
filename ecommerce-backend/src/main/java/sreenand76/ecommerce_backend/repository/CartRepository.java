package sreenand76.ecommerce_backend.repository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import sreenand76.ecommerce_backend.entity.CartItem;
import sreenand76.ecommerce_backend.entity.User;

public interface CartRepository extends JpaRepository<CartItem,Long>{
	
	List<CartItem> findAllByUserEmail(String email);

	@Query("SELECT c FROM CartItem c WHERE c.user.email = :email AND c.laptop.id = :laptopId AND c.selectedSpec.ram = :ram AND c.selectedSpec.storage = :storage AND c.selectedSpec.color = :color")
	Optional<CartItem> findByUserEmailAndLaptopIdAndSpecs(String email, Long laptopId, String ram, String storage, String color);

	List<CartItem> findAllByUser(User user);

}