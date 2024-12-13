package sreenand76.ecommerce_backend.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import sreenand76.ecommerce_backend.entity.Laptop;
import sreenand76.ecommerce_backend.service.ILaptopService;

@RestController
@RequestMapping("/laptops")
public class LaptopController {

    private final ILaptopService laptopService;

    public LaptopController(ILaptopService laptopService) {
        this.laptopService = laptopService;
    }

    @PostMapping("/add/laptop")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<List<Laptop>> addLaptops(@RequestBody List<Laptop> laptops) {
        List<Laptop> createdLaptops = laptopService.addLaptops(laptops);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdLaptops);
    }
    @GetMapping("/all")
    public ResponseEntity<List<Laptop>> getAllLaptops(){
    	List<Laptop> laptops=laptopService.getAllLaptops();
    	return ResponseEntity.ok(laptops);
    }
    @GetMapping("/{id}")
    public ResponseEntity<Optional<Laptop>> getLaptopById(@PathVariable Long id){
    	Optional<Laptop> laptop=laptopService.getLaptopById(id);
    	return ResponseEntity.ok(laptop);
    }
    @GetMapping("/AllBrands")
    public ResponseEntity<List<String>> getAllBrands(){
    	List<String>brands=laptopService.getAllBrands();
    	return ResponseEntity.ok(brands);
    }
    
    @GetMapping("/featured")
    public List<Laptop> getFeaturedLaptops() {
        return laptopService.featuredLaptops();
    }

    @PutMapping("/update/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<Laptop> updateLaptop(
            @PathVariable Long id, @RequestBody Laptop laptop) throws ChangeSetPersister.NotFoundException {
        Laptop updatedLaptop = laptopService.updateLaptop(id,laptop);
        return ResponseEntity.ok(updatedLaptop);
    }
    
    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<Void> deleteLaptop(@PathVariable Long id){
        laptopService.deleteQuestion(id);
        return ResponseEntity.noContent().build();
    }
}
