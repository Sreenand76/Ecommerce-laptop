package sreenand76.ecommerce_backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import sreenand76.ecommerce_backend.entity.SelectedLaptopSpec;

public interface SelectedLaptopSpecRepository extends JpaRepository<SelectedLaptopSpec, Long> {
	@Query("SELECT s FROM SelectedLaptopSpec s WHERE s.laptop.id = :laptopId AND s.ram = :ram AND s.storage = :storage AND s.color = :color AND s.usedIn = :usedIn")
	Optional<SelectedLaptopSpec> findCustomSpec(@Param("laptopId") Long laptopId,
	                                            @Param("ram") String ram,
	                                            @Param("storage") String storage,
	                                            @Param("color") String color,
	                                            @Param("usedIn") String usedIn);

}
