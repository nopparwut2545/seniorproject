package com.example.demo.Repository;

import com.example.demo.Model.BookingHistory;
import com.example.demo.Model.BookingQueue;
import com.example.demo.Model.Customer;
import com.example.demo.Model.Nanny;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

public interface CustomerRepository extends JpaRepository<Customer, Long> {

    @Query("SELECT c FROM Customer c WHERE c.username = ?1")
    Customer findCustomerByUsername(String username);

    Optional<Customer> findByUsername(String username);
//    Customer findByEmail(String email);
    Optional<Customer> findByEmail(String email);

    @Query("SELECT bh FROM BookingHistory bh JOIN BookingQueue bq on bh.booking_id = bq.bookingID WHERE bq.customer_id = :customer_id")
    List<BookingHistory> findByCustomerIdBH(@Param("customer_id") Long customer_id);

    @Query("SELECT bq FROM BookingHistory bh JOIN BookingQueue bq on bh.booking_id = bq.bookingID WHERE bq.customer_id = :customer_id")
    List<BookingQueue> findByCustomerIdBQ(@Param("customer_id") Long customer_id);

    @Query("SELECT bq FROM BookingQueue bq WHERE bq.customer_id = :customer_id AND bq.status_payment = 'Bookings'")
    List<BookingQueue> findBQByCustomerIDStatusBookings(@Param("customer_id") Long customer_id);
}