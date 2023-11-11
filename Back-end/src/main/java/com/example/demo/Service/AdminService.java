package com.example.demo.Service;
import com.example.demo.Model.Admin;
import com.example.demo.Repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.NoSuchElementException;
@Service
public class AdminService {
    @Autowired
    private AdminRepository adminRepository;
    @Autowired
    private CommonService commonService;

    public List<Admin> getAllAdmin(){
        return adminRepository.findAll();
    }

    public Admin getAdminById(long id){
        return  adminRepository.findById(id).orElseThrow(() -> new NoSuchElementException("No admin found with ID:"+ id));
    }

//    public  Admin saveAdmin(Admin admin ){
//        return  adminRepository.save(admin);
//    }

    public Admin saveAdmin(Admin admin) {
        if (commonService.isEmailUnique(admin.getEmail())) {
            return adminRepository.save(admin);
        } else {
            throw new IllegalArgumentException("Email is already in use.");
        }
    }

    public  void  deleteAdmin(Long id){
        adminRepository.deleteById(id);
    }

    public Admin findAdminByEmail(String email){
        return adminRepository.findByEmail(email)
                .orElse(null);
    }

}
