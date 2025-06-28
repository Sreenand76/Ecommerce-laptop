package sreenand76.ecommerce_backend.request;

//Request DTO
public class PaymentRequest {
 private Long amount; // in smallest currency unit (e.g., cents)
 private String currency; // "USD", "INR", etc.
 public Long getAmount() {
	return amount;
 }
 public void setAmount(Long amount) {
	this.amount = amount;
}
public String getCurrency() {
	return currency;
}
public void setCurrency(String currency) {
	this.currency = currency;
}
 
}