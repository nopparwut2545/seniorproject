package com.example.demo.Security;

import com.example.demo.Model.Admin;
import com.example.demo.Model.Customer;
import com.example.demo.Model.Nanny;
import com.example.demo.Repository.CustomerRepository;
import com.example.demo.Service.AdminService;
import com.example.demo.Service.CustomerService;
import com.example.demo.Service.NannyService;
import com.example.demo.Service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.List;



@RequiredArgsConstructor
@Service
public class CustomUserDetailsService implements UserDetailsService {


    private final CustomerService customerService;
    private final NannyService nannyService;
    private final AdminService adminService;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        // Try finding the Customer first
        Customer customer = customerService.findCustomerByEmail(email);
        if (customer != null) {
            return UserPrinciple.build(customer);
        }

        // If not a customer, try finding the Nanny
        Nanny nanny = nannyService.findByEmail(email);
        if (nanny != null ) {
            return UserPrinciple.build(nanny);

        }

        // If not a nanny either, try finding the Admin
        Admin admin = adminService.findAdminByEmail(email);
        if (admin != null) {
            return UserPrinciple.build(admin);
        }

        // If none of the above conditions match, throw an exception
        throw new UsernameNotFoundException("User not found with email: " + email);
    }




}

//@Service
//public class CustomUserDetailService implements UserDetailsService {
//private  final UserService userService;
//    private final CustomerRepository customerRepository;
//    @Override
//    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//        var user = customerRepository.findByUsername(username)
//                .orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + username));
//        return UserPrinciple.builder()
//                .userId(user.getCustomerId())
//                .email(user.getEmail())
//                .authorities(List.of(new SimpleGrantedAuthority(user.getRole())))
//                .password(user.getPassword())
//                .build();
//    }
//}
