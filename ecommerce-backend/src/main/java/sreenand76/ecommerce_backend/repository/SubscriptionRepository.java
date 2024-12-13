package sreenand76.ecommerce_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import sreenand76.ecommerce_backend.entity.EmailSubscription;

public interface SubscriptionRepository extends JpaRepository<EmailSubscription, Long> {
    boolean existsByEmail(String email);
}