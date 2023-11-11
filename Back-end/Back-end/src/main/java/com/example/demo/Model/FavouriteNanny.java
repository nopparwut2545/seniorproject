package com.example.demo.Model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import java.math.BigDecimal;
@Entity
@Table(name = "favourite_nannies")
public class FavouriteNanny {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty("id")
    @Column(name = "id")
    private Long favId;

    @JsonProperty("customer_id")
    @Column(name = "customer_id")
    private Long customer_id;

    @JsonProperty("nanny_id")
    @Column(name = "nanny_id")
    private Long nanny_id;

    public Long getFavId() {
        return favId;
    }

    public void setFavId(Long favId) {
        this.favId = favId;
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
}