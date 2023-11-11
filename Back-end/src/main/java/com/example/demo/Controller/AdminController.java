package com.example.demo.Controller;

import com.example.demo.Model.Admin;
import com.example.demo.Service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/api/admins")
@RequiredArgsConstructor
public class AdminController {

    @Autowired
    private AdminService adminService;

    @GetMapping
    public List<Admin> getAllAdmin(){
        return  adminService.getAllAdmin();
    }
    @PostMapping("/register")
    public  Admin createAdmin(@RequestBody Admin admin){
        return  adminService.saveAdmin(admin);
    }
    @GetMapping("/{id}")
    public  Admin getAdminById(@PathVariable Long id){
        return  adminService.getAdminById(id);
    }


}
