package com.example.demo.Model;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.math.BigDecimal;
@Entity
@Table(name = "nannies")
public class Nanny {
    private static final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty("id")
    @Column(name = "id")
    private Long nannyId;

    @JsonProperty("username")
    @Column(name = "username",unique = true)
    private String username;

    @JsonProperty("first_name")
    @Column(name = "first_name")
    private String firstName;

    @JsonProperty("last_name")
    @Column(name = "last_name")
    private String lastName;

    @JsonProperty("email")
    @Column(name = "email")
    private String email;

    @JsonProperty("pass_word")
    @Column(name = "pass_word", nullable = false)
    private String pass_word;

    @JsonProperty("district")
    @Column(name = "district")
    private String district;

    @JsonProperty("sub_district")
    @Column(name = "sub_district", nullable = false)
    private String sub_district;

    @JsonProperty("province")
    @Column(name = "province")
    private String province;

    @JsonProperty("zip_code")
    @Column(name = "zip_code")
    private String zip_code;

    @JsonProperty("street_number")
    @Column(name = "street_number", nullable = false)
    private String street_number;

    @JsonProperty("contact_number")
    @Column(name = "contact_number")
    private String contactNumber;

    @JsonProperty("role_level")
    @Column(name = "role_level")
    private String role_level;

    @JsonProperty("cost")
    @Column(name = "cost", columnDefinition = "DECIMAL(8,2)")
    private Double cost;

    @JsonProperty("type_work")
    @Column(name = "type_work", columnDefinition = "CHAR(1)")
    private String typeWork;

    @JsonProperty("status")
    @Column(name = "status")
    private String status;

    @JsonProperty("age")
    @Column(name = "age")
    private Integer age;

    @JsonProperty("gender")
    @Column(name = "gender")
    private String gender;

    @JsonProperty("score")
    @Column(name = "score")
    private Double score;

    @JsonProperty("role")
    @Column(name = "role", nullable = false)
    private String role;

    public Double getScore() {
        return score;
    }

    public void setScore(Double score) {
        this.score = score;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public Long getNannyId() {
        return nannyId;
    }

    public void setNannyId(Long nannyId) {
        this.nannyId = nannyId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getDistrict() {
        return district;
    }

    public void setDistrict(String district) {
        this.district = district;
    }

    public String getSub_district() {
        return sub_district;
    }

    public void setSub_district(String sub_district) {
        this.sub_district = sub_district;
    }

    public String getProvince() {
        return province;
    }

    public void setProvince(String province) {
        this.province = province;
    }

    public String getZip_code() {
        return zip_code;
    }

    public void setZip_code(String zip_code) {
        this.zip_code = zip_code;
    }

    public String getContactNumber() {
        return contactNumber;
    }

    public void setContactNumber(String contactNumber) {
        this.contactNumber = contactNumber;
    }

    public String getRole_level() {
        return role_level;
    }
    public void setRole_level(String role_level) {
        this.role_level = role_level;
    }

    public String getPassword() {
        return pass_word;
    }

//    public void setPassword(String password) {
//        this.pass_word = encoder.encode(password);
//    }

    public void setPass_word(String pass_word) {
        this.pass_word = encoder.encode(pass_word);
    }

    public Double getCost() {
        return cost;
    }

    public void setCost(Double cost) {
        this.cost = cost;
    }

    public String getTypeWork() {
        return typeWork;
    }

    public void setTypeWork(String typeWork) {
        this.typeWork = typeWork;
    }

    public String getStatus() {
        return status;
    }

    public String getStreet_number() {
        return street_number;
    }

    public void setStreet_number(String street_number) {
        this.street_number = street_number;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getRole() {
        return role;
    }
}
