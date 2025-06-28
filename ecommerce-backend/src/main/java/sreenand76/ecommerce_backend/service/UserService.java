package sreenand76.ecommerce_backend.service;

import sreenand76.ecommerce_backend.entity.CartItem;
import sreenand76.ecommerce_backend.entity.Laptop;
import sreenand76.ecommerce_backend.entity.LaptopSpec;
import sreenand76.ecommerce_backend.entity.Order;
import sreenand76.ecommerce_backend.entity.OrderItem;
import sreenand76.ecommerce_backend.entity.Role;
import sreenand76.ecommerce_backend.entity.SelectedLaptopSpec;
import sreenand76.ecommerce_backend.entity.User;
import sreenand76.ecommerce_backend.exception.UserAlreadyExistsException;
import sreenand76.ecommerce_backend.repository.CartRepository;
import sreenand76.ecommerce_backend.repository.LaptopRepository;
import sreenand76.ecommerce_backend.repository.LaptopSpecRepository;
import sreenand76.ecommerce_backend.repository.OrderRepository;
import sreenand76.ecommerce_backend.repository.RoleRepository;
import sreenand76.ecommerce_backend.repository.SelectedLaptopSpecRepository;
import sreenand76.ecommerce_backend.repository.UserRepository;
import sreenand76.ecommerce_backend.repository.WishListRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;

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
    private final LaptopRepository laptopRepository;
    private final SelectedLaptopSpecRepository selectedSpecRepository;
   
    // Constructor for dependency injection
    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder,RoleRepository roleRepository,WishListRepository wishlistRepository,CartRepository cartRepository,
    		OrderRepository orderRepository,LaptopRepository laptopRepository,SelectedLaptopSpecRepository selectedSpecRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.roleRepository = roleRepository;
        this.wishlistRepository = wishlistRepository;
        this.cartRepository = cartRepository;
        this.orderRepository = orderRepository;
        this.laptopRepository = laptopRepository;
        this.selectedSpecRepository= selectedSpecRepository;
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
	    Laptop laptop = laptopRepository.findById(laptopId)
	            .orElseThrow(() -> new RuntimeException("Laptop not found"));

		WishList wishlist = new WishList();
        wishlist.setUserEmail(email);
        wishlist.setLaptop(laptop);
        wishlistRepository.save(wishlist);		
	}
	
	public List<WishList> getUserWishlist(String email) {
        return wishlistRepository.findByUserEmail(email);
    }
    
	@Transactional
	@Override
	public void removeFromWishlist(String userEmail, Long laptopId) {
		 Laptop laptop = laptopRepository.findById(laptopId)
		            .orElseThrow(() -> new RuntimeException("Laptop not found"));
		 int deletedRows = wishlistRepository.deleteByUserEmailAndLaptop(userEmail, laptop);
	        if (deletedRows == 0) {
	            throw new RuntimeException("No matching wishlist item found for the given email and laptop ID");
	        }
	}
    @Transactional
	@Override
	public CartItem addToCart(String email, Long laptopId, SelectedLaptopSpec selectedSpec, int quantity) {
	    if (selectedSpec == null) {
	        throw new IllegalArgumentException("Selected spec must not be null");
	    }

	    Optional<CartItem> existingItem = cartRepository.findByUserEmailAndLaptopIdAndSpecs(
	        email, laptopId,
	        selectedSpec.getRam(),
	        selectedSpec.getStorage(),
	        selectedSpec.getColor()
	    );

	    if (existingItem.isPresent()) {
	        CartItem item = existingItem.get();
	        item.setQuantity(item.getQuantity() + quantity);
	        item.setTotalPrice(selectedSpec.getFinalPrice() * item.getQuantity());
	        return cartRepository.save(item);
	    }

	    Laptop laptop = laptopRepository.findById(laptopId).orElseThrow();
	    double expectedPrice = laptop.getBasePrice();

	      // Add RAM price adjustment
	      expectedPrice += laptop.getSpecs().stream()
	        .filter(spec -> spec.getSpecType().equals("RAM") && spec.getSpecValue().equals(selectedSpec.getRam()))
	        .mapToDouble(LaptopSpec::getPriceAdjustment)
	        .findFirst().orElse(0.0);

	      // Add ROM price adjustment
	      expectedPrice += laptop.getSpecs().stream()
	        .filter(spec -> spec.getSpecType().equals("ROM") && spec.getSpecValue().equals(selectedSpec.getStorage()))
	        .mapToDouble(LaptopSpec::getPriceAdjustment)
	        .findFirst().orElse(0.0);

	    // Then multiply by quantity
	    double totalExpectedPrice = expectedPrice * quantity;

	    // Compare with frontend price
	    if (Math.abs(totalExpectedPrice - (selectedSpec.getFinalPrice() * quantity)) > 0.01) {
	     throw new RuntimeException("Price mismatch. Tampering suspected.");
	   }

	    // Reuse existing spec if available, else use the incoming one
	    SelectedLaptopSpec specToUse = selectedSpecRepository
	        .findCustomSpec(
	            laptopId,
	            selectedSpec.getRam(),
	            selectedSpec.getStorage(),
	            selectedSpec.getColor(),
	            "cart"
	        )
	        .orElseGet(() -> {
	            selectedSpec.setLaptop(laptop);
	            return selectedSpec;
	        });
	    specToUse.setUsedIn("cart");
	   User user = userRepository.findByEmail(email)
	            .orElseThrow(() -> new RuntimeException("User not found for email: " + email));
	    CartItem newItem = new CartItem();
	    newItem.setUser(user);
	    newItem.setLaptop(laptop);
	    newItem.setSelectedSpec(specToUse);
	    newItem.setQuantity(quantity);
	    newItem.setTotalPrice(selectedSpec.getFinalPrice() * quantity);

	    return cartRepository.save(newItem);
	}

	@Override
	public List<CartItem> getCartIems(String email) {
		User user = userRepository.findByEmail(email)
	            .orElseThrow(() -> new RuntimeException("User not found for email: " + email));

	    return cartRepository.findAllByUser(user);
	}
    @Transactional
	@Override
	public void deleteCartItem(Long id) {
		cartRepository.deleteById(id);
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
    
	@Transactional
	@Override
	public Order createNewOrder(String email, Long laptopId, Order order) {
		 User user = userRepository.findByEmail(email)
		            .orElseThrow(() -> new RuntimeException("User not found for email: " + email));
	
		 order.setUser(user);  
		 order.setOrderDate(LocalDate.now());

	    // Assuming one item for now
	    OrderItem item = order.getOrderItems().get(0);

	    if (laptopId == null) {
	        throw new IllegalArgumentException("Laptop ID is missing in order item");
	    }

	    Laptop laptop = laptopRepository.findById(laptopId)
	            .orElseThrow(() -> new RuntimeException("Laptop not found for ID: " + laptopId));
	    item.setLaptop(laptop);

	    // Clone the selected spec instead of referencing existing
	    SelectedLaptopSpec incomingSpec = item.getSelectedSpec();
	    SelectedLaptopSpec clonedSpec = new SelectedLaptopSpec();
	    clonedSpec.setLaptop(laptop);
	    clonedSpec.setColor(incomingSpec.getColor());
	    clonedSpec.setRam(incomingSpec.getRam());
	    clonedSpec.setStorage(incomingSpec.getStorage());
	    clonedSpec.setFinalPrice(incomingSpec.getFinalPrice());
	    clonedSpec.setUsedIn("order");
	    item.setSelectedSpec(clonedSpec);
	    item.setOrder(order);
	   
	    return orderRepository.save(order); 
	}
    
	@Transactional
	@Override
	public void cancelOrder(Long orderId) {
		orderRepository.deleteByOrderId(orderId);
	}

	@Override
	public List<Order> getUserOrders(String email) {
		User user = userRepository.findByEmail(email)
	            .orElseThrow(() -> new RuntimeException("User not found for email: " + email));

	    return orderRepository.findAllByUser(user);
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
