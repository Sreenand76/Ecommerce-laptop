package sreenand76.ecommerce_backend.service;


import org.springframework.stereotype.Service;
import sreenand76.ecommerce_backend.entity.EmailSubscription;
import sreenand76.ecommerce_backend.repository.SubscriptionRepository;

@Service
public class SubscriptionService {
    
    private SubscriptionRepository subscriptionRepository;
    
    public SubscriptionService(SubscriptionRepository subscriptionRepository) {
    	this.subscriptionRepository=subscriptionRepository;
    }

    public boolean subscribe(String email) {
        // Check if the email already exists
        if (subscriptionRepository.existsByEmail(email)) {
            return false; // Email is already subscribed
        }

        // Save the email to the database
        EmailSubscription subscription = new EmailSubscription();
        subscription.setEmail(email);
        subscriptionRepository.save(subscription);

        return true; 
    }
}
