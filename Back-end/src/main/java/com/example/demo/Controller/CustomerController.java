package com.example.demo.Controller;

import com.example.demo.Model.BookingHistory;
import com.example.demo.Model.BookingQueue;
import com.example.demo.Model.Customer;
import com.example.demo.Model.Nanny;
import com.example.demo.Service.CustomerService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/api/customers")
@RequiredArgsConstructor
public class CustomerController {

    @Autowired
    private CustomerService customerService;
//    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @GetMapping
    public List<Customer> getAllCustomers() {
        return customerService.getAllCustomers();
    }

    @PostMapping("/register")
    public Customer createCustomer(@RequestBody Customer customer) {
        return customerService.saveCustomer(customer);
    }

    @GetMapping("/{id}")
    public Customer getCustomerById(@PathVariable Long id) {
        return customerService.getCustomerById(id);
    }

//    @PostMapping("/register")
//    public Customer createCustomer(@RequestBody Customer customer) {
//        customer.setPass_word(passwordEncoder.encode(customer.getPass_word()));
//        return customerService.saveCustomer(customer);
//    }

    @PutMapping("/{id}")
    public Customer updateCustomer(@PathVariable Long id, @RequestBody Customer customer) {
        // You should add logic to handle the update.
        // For simplicity, this example directly saves the received object.
        return customerService.saveCustomer(customer);
    }

    @GetMapping("/getbyusername/{username}")
    public Customer findCustomerByUsername(@PathVariable String username) {
        return customerService.getCustomerByUsername(username);
    }

    @DeleteMapping("/{id}")
    public void deleteCustomer(@PathVariable Long id) {
        customerService.deleteCustomer(id);
    }

    @GetMapping("/messages")
    public ResponseEntity<List<String> > messages(){
        return ResponseEntity.ok(Arrays.asList("fisrt","second"));
    }

    @GetMapping("/bookingcs-dataBH/{customer_id}")
    public List<BookingHistory> getBookingDataByCustomerIdBH(@PathVariable Long customer_id) {
        return customerService.getBookingDataByCustomerIdBH(customer_id);
    }

    @GetMapping("/bookingcs-dataBQ/{customer_id}")
    public List<BookingQueue> getBookingDataByCustomerIdBQ(@PathVariable Long customer_id) {
        return customerService.getBookingDataByCustomerIdBQ(customer_id);
    }

    @GetMapping("/bookings/byCustomerId/{customer_id}")
    public List<BookingQueue> findBQByCustomerIDStatusBookings(@PathVariable Long customer_id) {
        return customerService.findBQByCustomerIDStatusBookings(customer_id);
    }
}
