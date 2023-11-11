package com.example.demo.Controller;
import com.example.demo.Model.BookingQueue;

import com.example.demo.Service.BookingQueueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/bookingqueue")
@CrossOrigin(origins = "http://localhost:3000")
public class  BookingQueueController {

    @Autowired
    BookingQueueService bookingqueueService;

    @GetMapping
    public List<BookingQueue> getAllBookingQueue() {
        return bookingqueueService.getAllBookingQueue();
    }

    @GetMapping("/getby/{id}")
    public BookingQueue getBookingQueueById(@PathVariable Long id) {
        return bookingqueueService.getBookingQueueById(id);
    }

//    @GetMapping("/getbycustomeridandnannyid/{customer_id}/{nanny_id}")
//    public BookingQueue getfindBookingsfromIdCustomerandNannyid(@PathVariable Long customer_id , Long nanny_id) {
//        return bookingqueueService.getfindBookingsfromIdCustomerandNannyid(customer_id,nanny_id);
//    }

    ////////////////////////////////////
    @GetMapping("/getbookings/{customer_id}/{nanny_id}")
    public List<BookingQueue> getBookingsByCustomerIdAndNannyId(
            @PathVariable("customer_id") Long customer_id,
            @PathVariable("nanny_id") Long nanny_id) {

        return bookingqueueService.getBookingsByCustomerIdAndNannyId(customer_id, nanny_id);
    }

    @GetMapping("/getbookingstatus/{customer_id}/{nanny_id}")
    public List<BookingQueue> getBookingsByCustomerIdAndNannyIdStatusPaid(
            @PathVariable("customer_id") Long customer_id,
            @PathVariable("nanny_id") Long nanny_id) {

        return bookingqueueService.getBookingsByCustomerIdAndNannyIdStatusPaid(customer_id, nanny_id);
    }
    ///////////////////////////////////////////
    @GetMapping("/getbookingstest/{customer_id}/{nanny_id}")
    public BookingQueue getBookingsByCustomerIdAndNannyIdtest(
            @PathVariable("customer_id") Long customer_id,
            @PathVariable("nanny_id") Long nanny_id) {

        return bookingqueueService.getBookingsByCustomerIdAndNannyId1(customer_id, nanny_id);
    }

    @GetMapping("/getbookingstestdate/{nanny_id}")
    public List<BookingQueue> getfindBookingsCheckdate(

            @PathVariable("nanny_id") Long nanny_id) {

        return bookingqueueService.getfindBookingsCheckdate( nanny_id);
    }

    @GetMapping("/getbookingsteststatus/{customer_id}/{nanny_id}")
    public BookingQueue getBookingsByCustomerIdAndNannyIdtestStatus(
            @PathVariable("customer_id") Long customer_id,
            @PathVariable("nanny_id") Long nanny_id) {

        return bookingqueueService.getBookingsByCustomerIdAndNannyId1Status(customer_id, nanny_id);
    }


    @PostMapping
    public BookingQueue createBookingQueue(@RequestBody BookingQueue bookingqueue) {
        return bookingqueueService.saveBookingQueue(bookingqueue);
    }

    @PutMapping("/update/{id}")
    public BookingQueue updateBookingQueue(@PathVariable Long id, @RequestBody BookingQueue bookingqueue) {
        // You should add logic to handle the update.
        // For simplicity, this example directly saves the received object.
        return bookingqueueService.saveBookingQueue(bookingqueue);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteBookingQueue(@PathVariable Long id) {
        bookingqueueService.deleteBookingQueue(id);
    }

    @PutMapping("/updateStatusPaid/{bookingID}")
    public ResponseEntity<String> updateNannyStatusToPaid(@PathVariable Long bookingID) {
        try {
           bookingqueueService.updateStatusByPaid(bookingID);
            return ResponseEntity.ok("Booking status updated successfully");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating booking status");
        }
    }

    @PutMapping("/updateStatusPaidSuccess/{bookingID}")
    public ResponseEntity<String> updateNannyStatusToSuccess(@PathVariable Long bookingID) {
        try {
            bookingqueueService.updateStatusByPaidSuccess(bookingID);
            return ResponseEntity.ok("Booking status updated sc successfully");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating booking status success");
        }
    }

}
