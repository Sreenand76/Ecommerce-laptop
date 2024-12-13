package sreenand76.ecommerce_backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import sreenand76.ecommerce_backend.entity.Laptop;

@Repository
public interface LaptopRepository extends JpaRepository<Laptop, Long> {
	 @Query("SELECT DISTINCT laptop.brand FROM Laptop laptop")
	List<String> findDistinctBrands();
	
}
