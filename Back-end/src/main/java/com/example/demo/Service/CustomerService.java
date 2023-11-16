
package com.example.demo.Service;

import com.example.demo.Model.BookingHistory;
import com.example.demo.Model.BookingQueue;
import com.example.demo.Model.Customer;
import com.example.demo.Model.Nanny;
import com.example.demo.Repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.NoSuchElementException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class CustomerService {
    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Autowired
    private CustomerRepository customerRepository;
    @Autowired
    private CommonService commonService;

    public List<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }

    public Customer getCustomerById(Long id) {
        return customerRepository.findById(id).orElseThrow(() -> new NoSuchElementException("No customer found with ID: " + id));
    }

    public Customer getCustomerByUsername(String username) {
        return  customerRepository.findCustomerByUsername(username);
    }
//    public Customer saveCustomer(Customer customer) {
//        return customerRepository.save(customer);
//    }

    public Customer saveCustomer(Customer customer) {
        if (commonService.isEmailUnique(customer.getEmail())) {
            return customerRepository.save(customer);
        } else {
            throw new IllegalArgumentException("Email is already in use.");
        }
    }

    public void deleteCustomer(Long id) {
        customerRepository.deleteById(id);
    }


    public Optional<Customer> login(String username, String password) {
        Optional<Customer> customerOptional = customerRepository.findByUsername(username);
        if (customerOptional.isPresent()) {
            Customer customer = customerOptional.get();
            if (passwordEncoder.matches(password, customer.getPassword())) {
                return customerOptional;
            }
        }
        return Optional.empty();
    }


    public Customer findByUsername(String username) {
        return customerRepository.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("User Not Found with username: " + username));
    }
    public Customer findCustomerByEmail(String email) {
        return customerRepository.findByEmail(email).orElse(null);
    }


    public List<BookingHistory> getBookingDataByCustomerIdBH(Long customer_id) {
        return customerRepository.findByCustomerIdBH(customer_id);
    }

    public List<BookingQueue> getBookingDataByCustomerIdBQ(Long customer_id) {
        return customerRepository.findByCustomerIdBQ(customer_id);
    }

    public List<BookingQueue> findBQByCustomerIDStatusBookings(Long customer_id) {
        return customerRepository.findBQByCustomerIDStatusBookings(customer_id);
    }
}
