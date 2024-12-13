package sreenand76.ecommerce_backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;

import sreenand76.ecommerce_backend.entity.Laptop;

public interface ILaptopService {
	 List<Laptop> addLaptops(List<Laptop> laptops);

	List<Laptop> getAllLaptops();

	void deleteQuestion(Long id);

	Optional<Laptop> getLaptopById(Long id);

	List<String> getAllBrands();

	Laptop updateLaptop(Long id,Laptop laptop) throws NotFoundException;

	List<Laptop> featuredLaptops();
}
