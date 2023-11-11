package com.example.demo.Service;

import com.example.demo.Model.LoginResponse;
import com.example.demo.Security.InvalidCredentialsException;
import com.example.demo.Security.JwtIssuer;
import com.example.demo.Security.UserPrinciple;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final JwtIssuer jwtIssuer;
    private final AuthenticationManager authenticationManager;

    private LoginResponse authenticate(String email, String password, String role) {
        try {
            var authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(email, password)
            );
            SecurityContextHolder.getContext().setAuthentication(authentication);
            var principle = (UserPrinciple) authentication.getPrincipal();

            if (!principle.getAuthorities().contains(new SimpleGrantedAuthority(role))) {
                throw new RuntimeException("User does not have the required role!");
            }

            var roles = principle.getAuthorities().stream()
                    .map(GrantedAuthority::getAuthority)
                    .collect(Collectors.toList());

            var token = jwtIssuer.issue(principle.getUserId(), principle.getEmail(), roles);
            return LoginResponse.builder().acessToken(token).build();
        } catch (BadCredentialsException ex) {
            throw new InvalidCredentialsException("Incorrect password or email.");
        }
    }

    public LoginResponse attemptUserLogin(String email, String password) {
        return authenticate(email, password, "USER");
    }

    public LoginResponse attemptAdminLogin(String email, String password) {
        return authenticate(email, password, "ADMIN");
    }

    public LoginResponse attemptNannyLogin(String email, String password) {
        return authenticate(email, password, "NANNY");
    }
}
