package com.example.demo.Security;


import com.auth0.jwt.interfaces.DecodedJWT;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class JwtToPrinciplaConverter {
    public  UserPrinciple convert(DecodedJWT jwt){
        return  UserPrinciple.builder()
                .userId(Long.valueOf(jwt.getSubject()))
                .email(jwt.getClaim("e").asString())
                .authorities(extractAuthoritiesFromClaim(jwt))
                .build();
    }
    private List<SimpleGrantedAuthority> extractAuthoritiesFromClaim(DecodedJWT jwt){
        var clam = jwt.getClaim("a");
        if(clam.isNull() || clam.isMissing()) return List.of();
        return clam.asList(SimpleGrantedAuthority.class);
    }
}
