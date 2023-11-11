package com.example.demo.Service;

import com.example.demo.Repository.AdminRepository;
import com.example.demo.Repository.CustomerRepository;
import com.example.demo.Repository.NannyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CommonService {

    private final AdminRepository adminRepository;
    private final CustomerRepository customerRepository;
    private final NannyRepository nannyRepository;

    public boolean isEmailUnique(String email) {
        boolean existsInAdmin = adminRepository.findByEmail(email).isPresent();
        boolean existsInCustomer = customerRepository.findByEmail(email).isPresent();
        boolean existsInNanny = nannyRepository.findByEmail(email).isPresent();

        return !(existsInAdmin || existsInCustomer || existsInNanny);
    }
}
