package com.example.demo.Model;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "booking_history")
public class BookingHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty("id")
    @Column(name = "id")
    private Long id;

    @JsonProperty("booking_id")
    @Column(name = "booking_id")
    private Long booking_id;

    @JsonProperty("status")
    @Column(name = "status")
    private String status;

    @JsonProperty("time_session")
    @Column(name = "time_session")
    private Long time_session;

    public Long getBooking_id() {
        return booking_id;
    }

    public Long getTime_session() {
        return time_session;
    }

    public void setTime_session(Long time_session) {
        this.time_session = time_session;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void setBooking_id(Long booking_id) {
        this.booking_id = booking_id;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
