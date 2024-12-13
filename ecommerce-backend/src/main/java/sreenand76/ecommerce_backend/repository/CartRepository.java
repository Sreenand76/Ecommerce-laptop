package sreenand76.ecommerce_backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import sreenand76.ecommerce_backend.entity.CartItem;

public interface CartRepository extends JpaRepository<CartItem,Long>{
	Optional<CartItem> findByUserEmailAndLaptopIdAndColorAndRamAndStorage(
		    String email, String laptopId, String color, String ram, String storage);

	void deleteByUserEmailAndLaptopIdAndColorAndRamAndStorageAndQuantity(String email, String laptopId, String color,
			String ram, String storage, int quantity);

	List<CartItem> findAllByUserEmail(String email);

}