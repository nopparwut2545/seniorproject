package com.example.demo.Service;


import com.example.demo.Model.BookingHistory;
import com.example.demo.Model.BookingQueue;
import com.example.demo.Model.Nanny;
import com.example.demo.Repository.BookingHistoryRepository;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class BookingHistoryService {

    @Autowired
    private BookingHistoryRepository bookinghistoryrepository;

    public List<BookingHistory> getAllBookingHistory() {
        return bookinghistoryrepository.findAll();
    }

    public BookingHistory getBookingHistoryById(Long id) {

        return bookinghistoryrepository.findById(id).orElse(null);
    }

    public BookingHistory saveBookingHistory(BookingHistory bookinghistory) {

        return bookinghistoryrepository.save(bookinghistory);
    }


    public void deleteBookingHistory(Long id) {
        bookinghistoryrepository.deleteById(id);
    }

    public BookingHistory findBookingBybookindId(String booking_id) {
        return  bookinghistoryrepository.findBookingBybookindId(booking_id);
    }

    public void updateStatustoComplete(String booking_id) {
        bookinghistoryrepository.updateStatustoComplete(booking_id);
    }
}
