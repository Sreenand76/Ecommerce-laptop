package sreenand76.ecommerce_backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;
import sreenand76.ecommerce_backend.entity.Laptop;
import sreenand76.ecommerce_backend.repository.LaptopRepository;

@Service
public class LaptopService implements ILaptopService {

    private final LaptopRepository laptopRepository;
  
    public LaptopService(LaptopRepository laptopRepository) {
        this.laptopRepository = laptopRepository;
    }

    @Override
    public List<Laptop> addLaptops(List<Laptop> laptops) {
      
        return laptopRepository.saveAll(laptops);
    }

	public List<Laptop> getAllLaptops() {
		return laptopRepository.findAll();
	}

	@Override
	public void deleteQuestion(Long id) {
		laptopRepository.deleteById(id);		
	}

	@Override
	public Optional<Laptop> getLaptopById(Long id) {
		return laptopRepository.findById(id);
	}

	@Override
	public List<String> getAllBrands() {
		return laptopRepository.findDistinctBrands();
	}

	@Override
	public Laptop updateLaptop(Long id, Laptop laptop) throws ChangeSetPersister.NotFoundException {
	    Optional<Laptop> theLaptop = laptopRepository.findById(id);
	    if (theLaptop.isPresent()) {
	        Laptop updatedLaptop = theLaptop.get();
	        
	        updatedLaptop.setName(laptop.getName());
	        updatedLaptop.setBrand(laptop.getBrand());
	        updatedLaptop.setBasePrice(laptop.getBasePrice());
	        updatedLaptop.setDescription(laptop.getDescription());
	        updatedLaptop.setImageUrl(laptop.getImageUrl());
	        updatedLaptop.setAvailableColours(laptop.getAvailableColours());
	        
	        // Static specs
	        updatedLaptop.setProcessor(laptop.getProcessor());
	        updatedLaptop.setGraphicsCard(laptop.getGraphicsCard());
	        updatedLaptop.setBatteryLife(laptop.getBatteryLife());
	        updatedLaptop.setOs(laptop.getOs());
	        updatedLaptop.setDisplaySize(laptop.getDisplaySize());
	        updatedLaptop.setDisplayDetails(laptop.getDisplayDetails());
	        
	        // Dynamic specs (e.g., RAM and ROM)
	        updatedLaptop.setSpecs(laptop.getSpecs());

	        return laptopRepository.save(updatedLaptop);
	    } else {
	        throw new ChangeSetPersister.NotFoundException();
	    }
	}

	@Override
	public List<Laptop> featuredLaptops() {
		 return laptopRepository.findAll().stream()
	                .limit(3) 	                
	                .toList();
	}

}
