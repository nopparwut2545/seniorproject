package com.example.demo.Service;
import com.example.demo.Model.BookingQueue;

import com.example.demo.Repository.BookingQueueRepository;

import com.example.demo.Repository.NannyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class BookingQueueService {

    @Autowired
    private BookingQueueRepository bookingqueuerepository;

    public List<BookingQueue> getAllBookingQueue() {
        return bookingqueuerepository.findAll();
    }

    public BookingQueue getBookingQueueById(Long id) {

        return bookingqueuerepository.findById(id).orElse(null);
    }
//    public BookingQueue getfindBookingsfromIdCustomerandNannyid(Long customer_id , Long nanny_id ){
//        return bookingqueuerepository.findBookingsfromIdCustomerandNannyid( customer_id,nanny_id );
//    }

//    public List<BookingQueue> getBookingsfromIdCustomer(Long customer_id , Long nanny_id  ){
//        return bookingqueuerepository.findBookingsfromIdCustomer( customer_id,nanny_id);
//    }
///////////////////////////////////////////////////////////
    public List<BookingQueue> getBookingsByCustomerIdAndNannyId(Long customer_id, Long nanny_id) {
        return bookingqueuerepository.findBookingsByCustomerIdAndNannyId(customer_id, nanny_id);
    }

    public List<BookingQueue> getBookingsByCustomerIdAndNannyIdStatusPaid(Long customer_id, Long nanny_id) {
        return bookingqueuerepository.findBookingsByCustomerIdAndNannyIdStatusPaid(customer_id, nanny_id);
    }
    /////////////////////////////////////////////////////////
    public BookingQueue getBookingsByCustomerIdAndNannyId1(Long customer_id, Long nanny_id) {
        return bookingqueuerepository.findBookingsByCustomerIdAndNannyIdtest(customer_id, nanny_id);
    }


    public BookingQueue getBookingsByCustomerIdAndNannyId1Status(Long customer_id, Long nanny_id) {
        return bookingqueuerepository.findBookingsByCustomerIdAndNannyIdtestStatus(customer_id, nanny_id);
    }

    public List<BookingQueue>  getfindBookingsCheckdate( Long nanny_id) {
        return bookingqueuerepository.findBookingsCheckdate(nanny_id);
    }

    public List<BookingQueue>  getfindBookingsByCustomerID( Long customer_id) {
        return bookingqueuerepository.findBookingsByCustomerID(customer_id);
    }

    public BookingQueue saveBookingQueue(BookingQueue bookingqueue) {

        return bookingqueuerepository.save(bookingqueue);
    }


    public void deleteBookingQueue(Long id) {
        bookingqueuerepository.deleteById(id);
    }

    public void updateStatusByPaid(Long bookingID) {
        bookingqueuerepository.updateStatusByPaid(bookingID);
    }

    public void updateStatusByCancle(Long bookingID) {
        bookingqueuerepository.updateStatusByCancle(bookingID);
    }

    public void updateStatusByBookings(Long bookingID) {
        bookingqueuerepository.updateStatusByBooking(bookingID);
    }

    public void updateStatusByPaidSuccess(Long bookingID) {
        bookingqueuerepository.updateStatusByPaidSuccess(bookingID);
    }
    public List<String> findPaidNannyIdsByCustomerId(Long customerId) {
        return bookingqueuerepository.findPaidNannyIdsByCustomerId(customerId);
    }
}
