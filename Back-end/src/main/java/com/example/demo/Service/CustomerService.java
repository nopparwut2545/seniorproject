
package com.example.demo.Service;

import com.example.demo.Model.BookingHistory;
import com.example.demo.Model.BookingQueue;
import com.example.demo.Model.Customer;
import com.example.demo.Model.Nanny;
import com.example.demo.Repository.CustomerRepository;
import jakarta.persistence.EntityNotFoundException;
import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.NoSuchElementException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;
import java.util.UUID;

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

    public Customer saveCustomerbyEditprofile(Customer customer) {
        return customerRepository.save(customer);
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

    public void updateProfileImageUrl(Long customerId, String profileImageUrl) {
        customerRepository.updateProfileImageUrl(customerId, profileImageUrl);
    }

    public Customer uploadProfileImage(Long customerId, MultipartFile profile_image_url) throws IOException {
        System.out.println(profile_image_url);
        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new EntityNotFoundException("Customer not found with ID: " + customerId));

        String imageUrl = saveProfileImageToFileSystem(profile_image_url);
        customer.setProfileImageUrl(imageUrl);
//        customer.setProfileImageUrl("TESESESE");
        System.out.println("IMAGE:"+imageUrl);
        customerRepository.save(customer);
        return customer;
    }

    private String saveProfileImageToFileSystem(MultipartFile profile_image_url) throws IOException {

        // Implement the logic to save the image to a directory and return the URL.
        // You might want to generate a unique filename, handle errors, etc.
        // Example: Save the file to a directory and return the URL.
        String directory = "path/to/profile/images";
        String filename = "profile-image-" + UUID.randomUUID().toString() + ".jpg";

        byte[] image = Base64.encodeBase64(profile_image_url.getBytes(),true);
        String result = new String(image);
        return result;
//        try {
//            Path filePath = Paths.get(directory, filename);
//            Files.copy(profileImage.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
////            return "/profile/images/" + filename; // Return the URL
//
//        } catch (IOException e) {
//            throw new RuntimeException("Failed to save profile image", e);
//        }
    }
}
