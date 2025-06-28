package sreenand76.ecommerce_backend.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.stripe.exception.StripeException;

import sreenand76.ecommerce_backend.request.PaymentRequest;
import sreenand76.ecommerce_backend.service.StripeService;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    @Autowired
    private StripeService stripeService;

    @PostMapping("/create-intent")
    public ResponseEntity<Map<String, String>> createPaymentIntent(@RequestBody PaymentRequest request) {
        try {
            String clientSecret = stripeService.createPaymentIntent(
                request.getAmount(),
                request.getCurrency()
            );
            Map<String, String> response = new HashMap<>();
            response.put("clientSecret", clientSecret);
            return ResponseEntity.ok(response);
        } catch (StripeException e) {
            return ResponseEntity.status(500).body(Map.of("error", "Payment failed: " + e.getMessage()));
        }
    }

}
