package com.example.demo.Repository;
import com.example.demo.Model.BookingQueue;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


public interface BookingQueueRepository extends JpaRepository<BookingQueue, Long>  {

//    @Query("SELECT n FROM BookingQueue n WHERE n.customer_id = ?1 and n.nanny_id = ?2 ")
//    BookingQueue findBookingsfromIdCustomerandNannyid(Long customer_id , Long nanny_id );

//    @Query("SELECT n FROM BookingQueue n WHERE n.customer_id = ?1 AND n.nanny_id = ?2")
//    List<BookingQueue> findBookingsfromIdCustomer(Long customer_id, Long nanny_id);
    /////////////////////////
    @Query("SELECT n FROM BookingQueue n WHERE n.customer_id = :customer_id AND n.nanny_id = :nanny_id  ")
    List<BookingQueue> findBookingsByCustomerIdAndNannyId(@Param("customer_id") Long customer_id, @Param("nanny_id") Long nanny_id);


    @Query("SELECT n FROM BookingQueue n WHERE n.customer_id = :customer_id AND n.nanny_id = :nanny_id AND n.status_payment = 'Paid'   ")
    List<BookingQueue> findBookingsByCustomerIdAndNannyIdStatusPaid(@Param("customer_id") Long customer_id, @Param("nanny_id") Long nanny_id);

    //////////////////////////////////////
    @Query("SELECT n FROM BookingQueue n WHERE n.customer_id = :customer_id AND n.nanny_id = :nanny_id")
    BookingQueue findBookingsByCustomerIdAndNannyIdtest(@Param("customer_id") Long customer_id, @Param("nanny_id") Long nanny_id);

    //    @Query("SELECT n FROM BookingQueue n WHERE n.customer_id = :customer_id AND n.nanny_id = :nanny_id AND n.status_payment = 'Bookings'   ")
    @Query("SELECT n FROM BookingQueue n WHERE n.customer_id = :customer_id AND n.nanny_id = :nanny_id AND n.status_payment = 'Bookings'")
    BookingQueue findBookingsByCustomerIdAndNannyIdtestStatus(@Param("customer_id") Long customer_id, @Param("nanny_id") Long nanny_id);

    @Modifying
    @Transactional
    @Query("UPDATE BookingQueue n SET n.status_payment = 'Paid' WHERE n.bookingID = ?1 and n.status_payment = 'Pending'")
    void updateStatusByPaid(Long bookingID );

    @Modifying
    @Transactional
    @Query("UPDATE BookingQueue n SET n.status_payment = 'Bookings' WHERE n.bookingID = ?1 and n.status_payment = 'Paid'")
    void updateStatusByBooking(Long bookingID );

    @Modifying
    @Transactional
    @Query("UPDATE BookingQueue n SET n.status_payment = 'Cancle' WHERE n.bookingID = ?1 and n.status_payment = 'Pending'")
    void updateStatusByCancle(Long bookingID );

    @Modifying
    @Transactional
    @Query("UPDATE BookingQueue n SET n.status_payment = 'Success' WHERE n.bookingID = ?1")
    void updateStatusByPaidSuccess(Long bookingID );

    @Query("SELECT n FROM BookingQueue n WHERE  n.nanny_id = :nanny_id and n.status_payment = 'Paid' ")
    List<BookingQueue> findBookingsCheckdate(@Param("nanny_id") Long nanny_id);

    @Query("SELECT n FROM BookingQueue n WHERE  n.customer_id = :customer_id  ")
    List<BookingQueue> findBookingsByCustomerID(@Param("customer_id") Long customer_id);

    @Query("SELECT n.username FROM BookingQueue bk join Nanny n on bk.nanny_id = n.nannyId  WHERE bk.customer_id = :customerId AND bk.status_payment = 'Paid'")
    List<String> findPaidNannyIdsByCustomerId(@Param("customerId") Long customerId);
}
