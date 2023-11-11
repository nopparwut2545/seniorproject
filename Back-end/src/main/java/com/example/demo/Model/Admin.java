package com.example.demo.Model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
@Entity
@Table(name = "admins")
public class Admin {
    private static final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    @JsonProperty("id")
    private Long adminId;
    @JsonProperty("username")
    @Column(name = "username",unique = true)
    private String username;
    @JsonProperty("first_name")
    @Column(name = "first_name", nullable = false)
    private String firstName;
    @JsonProperty("last_name")
    @Column(name = "last_name", nullable = false)
    private String lastName;
    @JsonProperty("email")
    @Column(name = "email", nullable = false)
    private String email;
    @JsonProperty("password")
    @Column(name = "pass_word", nullable = false)
    private String password;
    @JsonProperty("district")
    @Column(name = "district", nullable = false)
    private String district;
    @JsonProperty("sub_district")
    @Column(name = "sub_district", nullable = false)
    private String sub_district;
    @JsonProperty("province")
    @Column(name = "province", nullable = false)
    private String province;
    @JsonProperty("zip_code")
    @Column(name = "zip_code", nullable = false)
    private String zip_code;
    @JsonProperty("street_number")
    @Column(name = "street_number", nullable = false)
    private String street_number;
    @JsonProperty("contact_number")
    @Column(name = "contact_number", nullable = false)
    private String contact_number;

    @JsonProperty("age")
    @Column(name = "age")
    private Integer age;

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    @JsonProperty("gender")
    @Column(name = "gender")
    private String gender;

    @JsonProperty("role")
    @Column(name = "role", nullable = false)
    private String role;

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public Long getAdminId() {
        return adminId;
    }

    public void setAdminId(Long adminId) {
        this.adminId = adminId;
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

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = encoder.encode(password);;
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

    public String getStreet_number() {
        return street_number;
    }

    public void setStreet_number(String street_number) {
        this.street_number = street_number;
    }

    public String getContact_number() {
        return contact_number;
    }

    public void setContact_number(String contact_number) {
        this.contact_number = contact_number;
    }
}

