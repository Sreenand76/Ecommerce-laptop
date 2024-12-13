package sreenand76.ecommerce_backend.jwt;

import java.util.List;


public class JwtResponse {

    private Long id;
    private String email;
    private String token;
    private String type = "Bearer";
    private List<String> roles;

    // No-argument constructor
    public JwtResponse() {}

    // Parameterized constructor
    public JwtResponse(Long id, String email, String token, List<String> roles) {
        this.id = id;
        this.email = email;
        this.token = token;
        this.roles = roles;
    }

    // Getter and Setter for id
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    // Getter and Setter for email
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    // Getter and Setter for token
    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    // Getter for type (no setter since it's a constant "Bearer")
    public String getType() {
        return type;
    }

    // Getter and Setter for roles
    public List<String> getRoles() {
        return roles;
    }

    public void setRoles(List<String> roles) {
        this.roles = roles;
    }
}