package com.example.demo.Controller;

import com.example.demo.Model.BookingHistory;
import com.example.demo.Model.Nanny;
import com.example.demo.Service.BookingHistoryService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/bookinghistory")
@CrossOrigin(origins = "http://localhost:3000")
public class BookingHistoryController {

    @Autowired
    BookingHistoryService bookingHistoryService;

    @GetMapping
    public List<BookingHistory> getAllBookingHistory() {
        return bookingHistoryService.getAllBookingHistory();
    }

    @GetMapping("/getby/{id}")
    public BookingHistory getBookingHistoryById(@PathVariable Long id) {
        return bookingHistoryService.getBookingHistoryById(id);
    }

    @PostMapping
    public BookingHistory createBookingHistory(@RequestBody BookingHistory bookinghistory) {
        return bookingHistoryService.saveBookingHistory(bookinghistory);
    }

    @PutMapping("/update/{id}")
    public BookingHistory updateBookingHistory(@PathVariable Long id, @RequestBody BookingHistory bookinghistory) {
        return bookingHistoryService.saveBookingHistory(bookinghistory);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteBookingHistory(@PathVariable Long id) {
        bookingHistoryService.deleteBookingHistory(id);
    }

    @GetMapping("/getbybookingid/{booking_id}")
    public BookingHistory findBookingBybookindId(@PathVariable String booking_id) {
        return bookingHistoryService.findBookingBybookindId(booking_id);
    }

    @PutMapping("/updatestatuscomplete/{booking_id}")
    public ResponseEntity<String> updateStatustoComplete(@PathVariable String booking_id) {
        try {
            bookingHistoryService.updateStatustoComplete(booking_id);
            return ResponseEntity.ok("BookingHistory status updated sc successfully");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating BookingHistory status success");
        }
    }
}
