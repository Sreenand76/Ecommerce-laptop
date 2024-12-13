package sreenand76.ecommerce_backend.user;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import sreenand76.ecommerce_backend.entity.User;



public class AppUserDetails implements UserDetails{
	  private Long id;
	    private String email;
	    private String password;
	    private Collection<GrantedAuthority> authorities;

	   
	    public AppUserDetails(Long id, String email, String password, Collection<GrantedAuthority> authorities) {
	        this.id = id;
	        this.email = email;
	        this.password = password;
	        this.authorities = authorities;
	    }

	    // Static method to build HotelUserDetails from User object
	    public static UserDetails buildUserDetails(User user) {
	        List<GrantedAuthority> authorities = user.getRoles()
	                .stream()
	                .map(role -> new SimpleGrantedAuthority(role.getName()))
	                .collect(Collectors.toList());
	        return new AppUserDetails(
	                user.getId(),
	                user.getEmail(),
	                user.getPassword(),
	                authorities);
	    }

	    // Getters and setters for all fields
	    public Long getId() {
	        return id;
	    }

	    public void setId(Long id) {
	        this.id = id;
	    }

	    public String getEmail() {
	        return email;
	    }

	    public void setEmail(String email) {
	        this.email = email;
	    }

	    public String getPassword() {
	        return password;
	    }

	    public void setPassword(String password) {
	        this.password = password;
	    }

	    public Collection<GrantedAuthority> getAuthorities() {
	        return authorities;
	    }

	    public void setAuthorities(Collection<GrantedAuthority> authorities) {
	        this.authorities = authorities;
	    }

	    // Implementing methods from UserDetails interface
	    @Override
	    public String getUsername() {
	        return email;
	    }

	    @Override
	    public boolean isAccountNonExpired() {
	        return true;
	    }

	    @Override
	    public boolean isAccountNonLocked() {
	        return true;
	    }

	    @Override
	    public boolean isCredentialsNonExpired() {
	        return true;
	    }

	    @Override
	    public boolean isEnabled() {
	        return true;
	    }
}
