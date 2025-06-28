package sreenand76.ecommerce_backend.repository;


import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

import sreenand76.ecommerce_backend.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long>{
	 boolean existsByEmail(String email);
	 void deleteByEmail(String email);
	 Optional<User> findByEmail(String email);
}
