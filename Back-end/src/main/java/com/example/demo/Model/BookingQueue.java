package com.example.demo.Model;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "bookings")

public class BookingQueue {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty("id")
    @Column(name = "id")
    private Long bookingID;

    @JsonProperty("customer_id")
    @Column(name = "customer_id")
    private Long customer_id;

    @JsonProperty("nanny_id")
    @Column(name = "nanny_id")
    private Long nanny_id;

    @JsonProperty("hours")
    @Column(name = "hours")
    private Long hours;

    public Long getHours() {
        return hours;
    }

    public void setHours(Long hours) {
        this.hours = hours;
    }

    @JsonProperty("start_date")
    @Column(name = "start_date")
//    @Temporal(TemporalType.DATE)
    private Date start_date;

    @JsonProperty("end_date")
    @Column(name = "end_date")
//    @Temporal(TemporalType.DATE)
    private Date end_date;

    @JsonProperty("total_amount")
    @Column(name = "total_amount", columnDefinition = "DECIMAL(10,2)")
    private Double total_amount;

    @JsonProperty("status_payment")
    @Column(name = "status_payment")
    private String status_payment;

    public Long getBookingID() {
        return bookingID;
    }

    public void setBookingID(Long bookingID) {
        this.bookingID = bookingID;
    }

    public Long getCustomer_id() {
        return customer_id;
    }

    public void setCustomer_id(Long customer_id) {
        this.customer_id = customer_id;
    }

    public Long getNanny_id() {
        return nanny_id;
    }

    public void setNanny_id(Long nanny_id) {
        this.nanny_id = nanny_id;
    }

    public Date getStart_date() {
        return start_date;
    }

    public void setStart_date(Date start_date) {
        this.start_date = start_date;
    }

    public Date getEnd_date() {
        return end_date;
    }

    public void setEnd_date(Date end_date) {
        this.end_date = end_date;
    }

    public Double getTotal_amount() {
        return total_amount;
    }

    public void setTotal_amount(Double total_amount) {
        this.total_amount = total_amount;
    }

    public String getStatus_payment() {
        return status_payment;
    }

    public void setStatus_payment(String status_payment) {
        this.status_payment = status_payment;
    }
}
