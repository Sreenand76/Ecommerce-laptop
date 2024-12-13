package sreenand76.ecommerce_backend.service;


import sreenand76.ecommerce_backend.entity.CartItem;
import sreenand76.ecommerce_backend.entity.Order;
import sreenand76.ecommerce_backend.entity.Role;
import sreenand76.ecommerce_backend.entity.User;
import sreenand76.ecommerce_backend.exception.LaptopNotFoundException;
import sreenand76.ecommerce_backend.exception.UserAlreadyExistsException;
import sreenand76.ecommerce_backend.exception.UserNotFoundException;
import sreenand76.ecommerce_backend.repository.CartRepository;
import sreenand76.ecommerce_backend.repository.LaptopRepository;
import sreenand76.ecommerce_backend.repository.OrderRepository;
import sreenand76.ecommerce_backend.repository.RoleRepository;
import sreenand76.ecommerce_backend.repository.UserRepository;
import sreenand76.ecommerce_backend.repository.WishListRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import sreenand76.ecommerce_backend.entity.WishList;



@Service
public class UserService implements IUserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final RoleRepository roleRepository;
    private final WishListRepository wishlistRepository;
    private final CartRepository cartRepository;
    private final OrderRepository orderRepository;
   
    // Constructor for dependency injection
    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, RoleRepository roleRepository,WishListRepository wishlistRepository,CartRepository cartRepository,OrderRepository orderRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.roleRepository = roleRepository;
        this.wishlistRepository=wishlistRepository;
        this.cartRepository=cartRepository;
        this.orderRepository=orderRepository;
    }

    @Override
    public User registerUser(User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new UserAlreadyExistsException(user.getEmail() + " already exists");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        System.out.println(user.getPassword());
        Role userRole = roleRepository.findByName("ROLE_USER")
                .orElseThrow(() -> new RuntimeException("Default role not found"));
        user.setRoles(Collections.singletonList(userRole));
        return userRepository.save(user);
    }

    @Override
    public List<User> getUsers() {
        return userRepository.findAll();
    }

   
    @Override
    public void deleteUser(String email) {
        User theUser = getUser(email);
        if (theUser != null) {
            userRepository.deleteByEmail(email);
        }
    }

    @Override
    public User getUser(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));
    }

	
	
	@Override
	public void updateUserRole(Long userId, String roleName) throws Exception {
        // Fetch the user
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new Exception("User not found with ID: " + userId));

        // Fetch the role
        Role role = roleRepository.findByName(roleName)
                .orElseThrow(() -> new Exception("Role not found with name: " + roleName));

        // Clear existing roles
        user.getRoles().clear();

        // Add the new role
        user.getRoles().add(role);

        // Save the updated user
        userRepository.save(user);
    }

	@Override
	public void addToWishlist(String email, Long laptopId) {
		WishList wishlist = new WishList();
        wishlist.setUserEmail(email);
        wishlist.setLaptopId(laptopId);
        wishlistRepository.save(wishlist);		
	}
	
	public List<WishList> getUserWishlist(String email) {
        return wishlistRepository.findByUserEmail(email);
    }

	@Override
	public void removeFromWishlist(String userEmail, Long laptopId) {
		 int deletedRows = wishlistRepository.deleteByUserEmailAndLaptopId(userEmail, laptopId);
	        if (deletedRows == 0) {
	            throw new RuntimeException("No matching wishlist item found for the given email and laptop ID");
	        }
	}

	@Override
	public CartItem addToCart(String email, Long laptopId, CartItem cartItem) {
		Optional<CartItem> existingItem = cartRepository.findByUserEmailAndLaptopIdAndColorAndRamAndStorage(email,String.valueOf(laptopId),
		        cartItem.getColor(),cartItem.getRam(),cartItem.getStorage());
		    
		    if (existingItem.isPresent()) {
		        // Update quantity if the item already exists with identical specs
		        CartItem item = existingItem.get();
		        item.setQuantity(item.getQuantity() + cartItem.getQuantity());
		        return cartRepository.save(item);
		    }	    
		    cartItem.setUserEmail(email);
		    cartItem.setLaptopId(String.valueOf(laptopId));
		    return cartRepository.save(cartItem);
	}

	@Override
	public List<CartItem> getCartIems(String email) {
		return cartRepository.findAllByUserEmail(email);
	}
    
	@Override
	public void deleteCartItem(String email, Long laptopId, String color, String ram, String storage, int quantity) {
		cartRepository.deleteByUserEmailAndLaptopIdAndColorAndRamAndStorageAndQuantity(email,String.valueOf(laptopId),color,ram,storage,quantity);
	}

	@Override
	public User updateUser(String email, User user) throws ChangeSetPersister.NotFoundException{
		Optional<User> currentUser=userRepository.findByEmail(email);
        if(currentUser.isPresent()) {
        	User updatedUser=currentUser.get();
        	updatedUser.setName(user.getName());
        	updatedUser.setEmail(user.getEmail());
        	updatedUser.setAddress(user.getAddress());
        	updatedUser.setPhone(user.getPhone());
        	return userRepository.save(updatedUser);
        }else {
    	        throw new ChangeSetPersister.NotFoundException();
        }
	}

	@Override
	public Order createNewOrder(String email, Order order) {
		order.setUserEmail(email);
		order.setOrderDate(LocalDate.now());
		return orderRepository.save(order);
	}

	@Override
	public void cancelOrder(Long orderId) {
		orderRepository.deleteByOrderId(orderId);
	}

	@Override
	public List<Order> getUserOrders(String email) {
		return orderRepository.findAllByUserEmail(email);
	}

	@Override
	public List<Order> getAllOrders() {
		return orderRepository.findAll();
	}

	@Override
	public Optional<Order> updateOrder(Long id, String status) {
	    Optional<Order> currentOrder = orderRepository.findById(id);
	    if (currentOrder.isPresent()) {
	        Order updatedOrder = currentOrder.get();
	        updatedOrder.setStatus(status);
	        orderRepository.save(updatedOrder);
	        return Optional.of(updatedOrder);
	    } else {
	        return Optional.empty();
	    }
	}

}
