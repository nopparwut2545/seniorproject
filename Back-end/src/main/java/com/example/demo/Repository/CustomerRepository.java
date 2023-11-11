package com.example.demo.Repository;

import com.example.demo.Model.Customer;
import com.example.demo.Model.Nanny;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;
import java.util.Optional;

public interface CustomerRepository extends JpaRepository<Customer, Long> {

    @Query("SELECT c FROM Customer c WHERE c.username = ?1")
    Customer findCustomerByUsername(String username);

    Optional<Customer> findByUsername(String username);
//    Customer findByEmail(String email);
    Optional<Customer> findByEmail(String email);
}