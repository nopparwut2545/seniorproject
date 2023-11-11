package com.example.demo.Controller;


import com.example.demo.Model.Customer;
import com.example.demo.Model.LoginRequest;
import com.example.demo.Model.LoginResponse;
import com.example.demo.Security.JwtIssuer;
import com.example.demo.Security.UserPrinciple;
import com.example.demo.Service.AuthService;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.parameters.P;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@CrossOrigin("http://localhost:3000")
public class AuthController {

    private  final JwtIssuer jwtIssuer;
    private  final AuthenticationManager authenticationManager;
    private  final AuthService authService;
//@PostMapping("/auth/login")
//    public LoginResponse login(@RequestBody @Validated LoginRequest request){
//    var authentication = authenticationManager.authenticate(
//            new UsernamePasswordAuthenticationToken(request.getEmail(),request.getPassword())
//    );
//    SecurityContextHolder.getContext().setAuthentication(authentication);
//    var principle = (UserPrinciple) authentication.getPrincipal();
//
//    var roles = principle.getAuthorities().stream()
//            .map(GrantedAuthority::getAuthority)
//            .toList();
//
//    var token = jwtIssuer.issue(principle.getUserId(),principle.getEmail(),roles);
//        return LoginResponse.builder()
//            .acessToken(token)
//            .build();
//
//
//    }
 @PostMapping("/auth/user-login")
public LoginResponse loginUser(@RequestBody @Validated LoginRequest request) {
    return authService.attemptUserLogin(request.getEmail(), request.getPassword());
}

    @PostMapping("/auth/admin-login")
    public LoginResponse loginAdmin(@RequestBody @Validated LoginRequest request) {
        return authService.attemptAdminLogin(request.getEmail(), request.getPassword());
    }

    @PostMapping("/auth/nanny-login")
    public LoginResponse loginNanny(@RequestBody @Validated LoginRequest request) {
        return authService.attemptNannyLogin(request.getEmail(), request.getPassword());
    }
//    @PostMapping("/auth/login")
//    public LoginResponse login(@RequestBody @Validated LoginRequest request) {
//        return authService.attemptLogin(request.getEmail(),request.getPassword());
//    }
    @GetMapping("/secured")
    public String  secured(@AuthenticationPrincipal UserPrinciple principle){
    return "If you see this,then you're logged in as user : " + principle.getEmail() + " User Id:"+principle.getUserId();
    }

    @GetMapping("/admin")
    public String admin(@AuthenticationPrincipal UserPrinciple principle){
        return  "if you see this,then you're  an ADMIN . User ID: "+ principle.getUserId();
    }


}
