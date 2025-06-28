package sreenand76.ecommerce_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import sreenand76.ecommerce_backend.entity.LaptopSpec;

@Repository
public interface LaptopSpecRepository extends JpaRepository<LaptopSpec,Long>{

}
