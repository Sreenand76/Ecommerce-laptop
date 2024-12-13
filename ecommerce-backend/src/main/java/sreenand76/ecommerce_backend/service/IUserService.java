package sreenand76.ecommerce_backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;

import sreenand76.ecommerce_backend.entity.CartItem;
import sreenand76.ecommerce_backend.entity.Order;
import sreenand76.ecommerce_backend.entity.User;
import sreenand76.ecommerce_backend.entity.WishList;


public interface IUserService {
    User registerUser(User user);
    List<User> getUsers();
    void deleteUser(String email);
    User getUser(String email);
	void updateUserRole(Long userId, String roleName) throws Exception;
	void addToWishlist(String email, Long laptopId);
	List<WishList> getUserWishlist(String email);
	void removeFromWishlist(String userEmail, Long laptopId);
	CartItem addToCart(String email, Long laptopId, CartItem cartItem);
	List<CartItem> getCartIems(String email);
	void deleteCartItem(String email, Long laptopId, String color, String ram, String storage, int quantity);
	User updateUser(String email, User user) throws NotFoundException;
	Order createNewOrder(String email, Order order);
	void cancelOrder(Long id);
	List<Order> getUserOrders(String email);
	List<Order> getAllOrders();
	Optional<Order> updateOrder(Long id,String Status);
}
