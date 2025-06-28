package sreenand76.ecommerce_backend.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import sreenand76.ecommerce_backend.entity.Role;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(String role);
    boolean existsByName(String role);	
}