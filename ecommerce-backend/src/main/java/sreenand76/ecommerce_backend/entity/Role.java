package sreenand76.ecommerce_backend.entity;

import java.util.Collection;
import java.util.HashSet;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;


@Entity
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;

    @JsonIgnore
    @ManyToMany(mappedBy = "roles")
    private Collection<User> users = new HashSet<>();

    // Default constructor
    public Role() {
    }

    // Constructor with name
    public Role(String name) {
        this.name = name;
    }

    // Getter for id
    public Long getId() {
        return id;
    }

    // Setter for id
    public void setId(Long id) {
        this.id = id;
    }

    // Getter for name
    public String getName() {
        return name != null ? name : "";
    }

    // Setter for name
    public void setName(String name) {
        this.name = name;
    }

    // Getter for users
    public Collection<User> getUsers() {
        return users;
    }

    // Setter for users
    public void setUsers(Collection<User> users) {
        this.users = users;
    }

    // Method to assign role to user
    public void assignRoleToUser(User user) {
        user.getRoles().add(this);
        this.getUsers().add(user);
    }

    // Method to remove user from role
    public void removeUserFromRole(User user) {
        user.getRoles().remove(this);
        this.getUsers().remove(user);
    }

    // Method to remove all users from role
    public void removeAllUsersFromRole() {
        if (this.getUsers() != null) {
            List<User> roleUsers = this.getUsers().stream().toList();
            roleUsers.forEach(this::removeUserFromRole);
        }
    }

    // Custom getter for name (this is already covered by the regular getter)
    public String getRoleName() {
        return name != null ? name : "";
    }
}
