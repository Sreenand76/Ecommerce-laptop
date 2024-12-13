package sreenand76.ecommerce_backend.controller;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import sreenand76.ecommerce_backend.service.SubscriptionService;

@RestController
@RequestMapping("/subscriptions")
public class SubscriptionController {

    private SubscriptionService subscriptionService;
    
    public SubscriptionController(SubscriptionService subscriptionService) {
    	this.subscriptionService=subscriptionService;
    }

    @PostMapping
    public ResponseEntity<Boolean> subscribe(@RequestBody String email) {
        boolean isSubscribed = subscriptionService.subscribe(email);

        if (isSubscribed) {
            return ResponseEntity.ok(true);
        } else {
            return ResponseEntity.ok(false);
        }
    }
}
