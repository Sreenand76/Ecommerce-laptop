package sreenand76.ecommerce_backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import sreenand76.ecommerce_backend.entity.Order;
import sreenand76.ecommerce_backend.entity.User;

public interface OrderRepository  extends JpaRepository<Order, Long>{

	List<Order> findAllByUserEmail(String email);

	void deleteByOrderId(Long orderId);

	List<Order> findAllByUser(User user);

}
