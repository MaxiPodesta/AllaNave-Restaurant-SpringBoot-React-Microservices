package com.mp.ar.Usuarios.controller;


import com.mp.ar.Usuarios.AuthenticationRR.AuthResponse;
import com.mp.ar.Usuarios.AuthenticationRR.LoginRequest;
import com.mp.ar.Usuarios.AuthenticationRR.RegisterRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthenticationController {
    @Autowired
     private AuthService  authServ;
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request){
        return ResponseEntity.ok(authServ.login(request));
    }
    @PostMapping("/register")
    public  ResponseEntity<AuthResponse>  register(@RequestBody RegisterRequest request){
        return ResponseEntity.ok(authServ.register(request));
    }

}
