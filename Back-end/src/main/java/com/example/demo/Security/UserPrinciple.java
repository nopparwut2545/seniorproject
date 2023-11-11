package com.example.demo.Security;

import com.example.demo.Model.Admin;
import com.example.demo.Model.Customer;
import com.example.demo.Model.Nanny;
import com.example.demo.Repository.CustomerRepository;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Builder;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;
import java.util.List;

@Getter
@Builder
public class UserPrinciple implements UserDetails {
    private Long userId;
    private String email;
    private String password;
    private Collection<? extends GrantedAuthority> authorities;
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

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

    public UserPrinciple(Long userId, String email, String password, Collection<? extends GrantedAuthority> authorities) {
        this.userId = userId;
        this.email = email;
        this.password = password;
        this.authorities = authorities;
    }

    public static UserPrinciple build(Customer customer) {
        List<GrantedAuthority> authorities = Collections.singletonList(new SimpleGrantedAuthority(customer.getRole()));
        return new UserPrinciple(
                customer.getCustomerId(),
                customer.getEmail(),
                customer.getPassword(),
                authorities
        );
    }

    public static UserPrinciple build(Nanny nanny) {
        List<GrantedAuthority> authorities = Collections.singletonList(new SimpleGrantedAuthority(nanny.getRole()));
        return new UserPrinciple(
                nanny.getNannyId(),
                nanny.getEmail(),
                nanny.getPassword(),
                authorities
        );
    }

    public static UserPrinciple build(Admin admin) {
        List<GrantedAuthority> authorities = Collections.singletonList(new SimpleGrantedAuthority(admin.getRole()));
        return new UserPrinciple(
                admin.getAdminId(),
                admin.getEmail(),
                admin.getPassword(),
                authorities
        );
    }


//public static UserPrinciple build(Customer customer) {
//    List<GrantedAuthority> authorities = Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + customer.getRole()));
//    return new UserPrinciple(
//            customer.getCustomerId(),
//            customer.getEmail(),
//            customer.getPassword(),
//            authorities
//    );
//}

}
