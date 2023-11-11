package com.example.demo.Repository;
import com.example.demo.Model.BookingHistory;



import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface BookingHistoryRepository extends JpaRepository<BookingHistory, Long> {

    @Query("SELECT n FROM BookingHistory n WHERE n.booking_id = ?1")
    BookingHistory findBookingBybookindId(String booking_id);

    @Modifying
    @Transactional
    @Query("UPDATE BookingHistory n SET n.status = 'Completed' WHERE n.booking_id = ?1 and n.status = 'Process'")
    void updateStatustoComplete(String bookingID );
}
