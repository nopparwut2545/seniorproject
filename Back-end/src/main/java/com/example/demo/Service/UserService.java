package com.example.demo.Service;

import com.example.demo.Model.UserEntity;
import com.mysql.cj.x.protobuf.MysqlxCursor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service

public class UserService {
    private  static  final  String EXISTING_EMAIL = "test@test.com";
    private static  final  String ANOTHER_EMAIL = "next@test.com";


    public Optional<UserEntity> findByEmail(String email){

        if(EXISTING_EMAIL.equalsIgnoreCase(email)){

            var user = new UserEntity();
            user.setId(1L);
            user.setEmail(EXISTING_EMAIL);
            user.setPassword("$2a$12$xFbCYT8YIjtK4ne0dYtcIOdohDWMK9BO8/ue8Dxko.D3ystELXoXi");
            user.setRole("ROLE_ADMIN");
            user.setExtraInfo("My nice admin account");
            return  Optional.of(user);
        }else if (ANOTHER_EMAIL.equalsIgnoreCase(email)){
            var user = new UserEntity();
            user.setId(99L);
            user.setEmail(EXISTING_EMAIL);
            user.setPassword("$2a$12$xFbCYT8YIjtK4ne0dYtcIOdohDWMK9BO8/ue8Dxko.D3ystELXoXi");
            user.setRole("ROLE_USER");
            user.setExtraInfo("My nice user");
            return  Optional.of(user);
        }

return  Optional.empty();


    }
}
