package sreenand76.ecommerce_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import sreenand76.ecommerce_backend.entity.CartItem;
import sreenand76.ecommerce_backend.entity.Laptop;
import sreenand76.ecommerce_backend.entity.Order;
import sreenand76.ecommerce_backend.entity.User;
import sreenand76.ecommerce_backend.entity.WishList;
import sreenand76.ecommerce_backend.service.IUserService;
import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/users")
public class UserController {

    private final IUserService userService;

    @Autowired
    public UserController(IUserService userService) {
        this.userService = userService;
    }

    @GetMapping("/all")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<List<User>> getUsers() {
    	List<User> users=userService.getUsers();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/{email}")
    @PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> getUserByEmail(@PathVariable("email") String email) {
        try {
            User theUser = userService.getUser(email);
            return ResponseEntity.ok(theUser);
        } catch (UsernameNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error fetching user");
        }
    }
    @PutMapping("/update/{email}")
    public ResponseEntity<User> updateLaptop(
            @PathVariable String email,@Valid @RequestBody User user) throws ChangeSetPersister.NotFoundException {
        User upaatedUser = userService.updateUser(email,user);
        return ResponseEntity.ok(upaatedUser);
    }
    
    @Transactional
    @DeleteMapping("/delete/{userId}")
    @PreAuthorize("hasRole('ROLE_ADMIN') or (hasRole('ROLE_USER') and #email == principal.username)")
    public ResponseEntity<String> deleteUser(@PathVariable("userId") String email) {
        try {
            userService.deleteUser(email);
            return ResponseEntity.ok("User deleted successfully");
        } catch (UsernameNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting user: " + e.getMessage());
        }
    }

    @PutMapping("/{userId}/roles/{roleName}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<String> updateUserRole(@PathVariable Long userId, @PathVariable String roleName) {
        try {
            userService.updateUserRole(userId, roleName);
            return ResponseEntity.ok("Role updated successfully!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
    
    @PostMapping("wishlist/{email}/{laptopId}")
    public ResponseEntity<String> addToWishList(@PathVariable String email, @PathVariable Long laptopId){
    	 userService.addToWishlist(email, laptopId);
         return ResponseEntity.ok("Laptop added to wishlist");
    }
    
    @GetMapping("/wishlist/{email}")
    public ResponseEntity<List<WishList>> getUserWishlist(@PathVariable String email) {
        List<WishList> wishlist = userService.getUserWishlist(email);
        return ResponseEntity.ok(wishlist);
    }
    
    @Transactional
    @DeleteMapping("/wishlist/remove/{userEmail}/{laptopId}")
    public ResponseEntity<String> removeFromWishlist(@PathVariable String userEmail, @PathVariable Long laptopId) {
        userService.removeFromWishlist(userEmail, laptopId);
        return ResponseEntity.ok("Item removed from wishlist");
    }
    
    @PostMapping("cart/add/{email}/{laptopId}")
    public ResponseEntity<CartItem> addtoUserCart(@PathVariable String email,@PathVariable Long laptopId,@RequestBody CartItem cartItem){
    	CartItem savedItem=userService.addToCart(email,laptopId,cartItem);
    	return ResponseEntity.ok(savedItem);
    }
    
    @GetMapping("cart/{email}")
    public ResponseEntity<List<CartItem>> getUserCartItems(@PathVariable String email){
       List<CartItem> cartItems=userService.getCartIems(email);
       return ResponseEntity.ok(cartItems);
    } 
    
    @Transactional
    @DeleteMapping("/cart/remove/{email}/{laptopId}")
    public ResponseEntity<String> deleteCartItem(@PathVariable String email,@PathVariable Long laptopId ,
    		@RequestParam String color,
            @RequestParam String ram,
            @RequestParam String storage,
            @RequestParam int quantity){
    	userService.deleteCartItem(email,laptopId,color,ram,storage,quantity);
    	return ResponseEntity.ok("Item removed from Cart");
    }
    
    @PostMapping("add/order/{email}")
    public ResponseEntity<Order> addNewOrder(@PathVariable String email,@RequestBody Order order){
    	Order newOrder=userService.createNewOrder(email,order);
    	return ResponseEntity.ok(newOrder);
    }
    
    @Transactional
    @DeleteMapping("cancel/order/{orderId}")
    public ResponseEntity<String> cancelOrder(@PathVariable Long orderId){
    	userService.cancelOrder(orderId);
    	return ResponseEntity.ok("Order canceled");
    }
    
    @GetMapping("orders/{email}")
    public ResponseEntity<List<Order>> getUserOrders(@PathVariable String email){
       List<Order> orders=userService.getUserOrders(email);
       return ResponseEntity.ok(orders);
    } 
    
    @GetMapping("orders/all")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<List<Order>> getAllOrders(){
        List<Order> allOrders=userService.getAllOrders();
        return ResponseEntity.ok(allOrders);
     } 
    
    @PutMapping("orders/{id}/{status}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<Optional<Order>> upadteOrders(@PathVariable Long id,@PathVariable String status){
        Optional<Order> updatedOrder=userService.updateOrder(id,status);
        return ResponseEntity.ok(updatedOrder);
     }
    
}
