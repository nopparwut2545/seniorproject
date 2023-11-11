package com.example.demo.Model;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
@Entity
@Table(name = "activity_program")
public class ActivityProgram {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty("ProgramID")
    @Column(name = "ProgramID")
    private Long ProgramID;

    @JsonProperty("Normal_Period1")
    @Column(name = "Normal_Period1")
    private String NormalPeriod1;

    @JsonProperty("Normal_Period2")
    @Column(name = "Normal_Period2")
    private String NormalPeriod2;

    @JsonProperty("Normal_Period3")
    @Column(name = "Normal_Period3")
    private String NormalPeriod3;

    @JsonProperty("Normal_Period4")
    @Column(name = "Normal_Period4")
    private String NormalPeriod4;

    @JsonProperty("Normal_Period5")
    @Column(name = "Normal_Period5")
    private String NormalPeriod5;

    @JsonProperty("Overnight_Period1")
    @Column(name = "Overnight_Period1")
    private String OvernightPeriod1;

    @JsonProperty("Overnight_Period2")
    @Column(name = "Overnight_Period2")
    private String OvernightPeriod2;

    @JsonProperty("Overnight_Period3")
    @Column(name = "Overnight_Period3")
    private String OvernightPeriod3;

    @JsonProperty("Overnight_Period4")
    @Column(name = "Overnight_Period4")
    private String OvernightPeriod4;

    @JsonProperty("Overnight_Period5")
    @Column(name = "Overnight_Period5")
    private String OvernightPeriod5;

    @JsonProperty("customer_id")
    @Column(name = "customer_id")
    private Long customer_id;

    public Long getProgramID() {
        return ProgramID;
    }

    public void setProgramID(Long programID) {
        ProgramID = programID;
    }

    public String getNormalPeriod1() {
        return NormalPeriod1;
    }

    public void setNormalPeriod1(String normalPeriod1) {
        NormalPeriod1 = normalPeriod1;
    }

    public String getNormalPeriod2() {
        return NormalPeriod2;
    }

    public void setNormalPeriod2(String normalPeriod2) {
        NormalPeriod2 = normalPeriod2;
    }

    public String getNormalPeriod3() {
        return NormalPeriod3;
    }

    public void setNormalPeriod3(String normalPeriod3) {
        NormalPeriod3 = normalPeriod3;
    }

    public String getNormalPeriod4() {
        return NormalPeriod4;
    }

    public void setNormalPeriod4(String normalPeriod4) {
        NormalPeriod4 = normalPeriod4;
    }

    public String getNormalPeriod5() {
        return NormalPeriod5;
    }

    public void setNormalPeriod5(String normalPeriod5) {
        NormalPeriod5 = normalPeriod5;
    }

    public String getOvernightPeriod1() {
        return OvernightPeriod1;
    }

    public void setOvernightPeriod1(String overnightPeriod1) {
        OvernightPeriod1 = overnightPeriod1;
    }

    public String getOvernightPeriod2() {
        return OvernightPeriod2;
    }

    public void setOvernightPeriod2(String overnightPeriod2) {
        OvernightPeriod2 = overnightPeriod2;
    }

    public String getOvernightPeriod3() {
        return OvernightPeriod3;
    }

    public void setOvernightPeriod3(String overnightPeriod3) {
        OvernightPeriod3 = overnightPeriod3;
    }

    public String getOvernightPeriod4() {
        return OvernightPeriod4;
    }

    public void setOvernightPeriod4(String overnightPeriod4) {
        OvernightPeriod4 = overnightPeriod4;
    }

    public String getOvernightPeriod5() {
        return OvernightPeriod5;
    }

    public void setOvernightPeriod5(String overnightPeriod5) {
        OvernightPeriod5 = overnightPeriod5;
    }

    public Long getCustomer_id() {
        return customer_id;
    }

    public void setCustomer_id(Long customer_id) {
        this.customer_id = customer_id;
    }
}
