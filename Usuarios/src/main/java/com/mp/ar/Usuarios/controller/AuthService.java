package com.mp.ar.Usuarios.controller;

import com.mp.ar.Usuarios.AuthenticationRR.AuthResponse;
import com.mp.ar.Usuarios.AuthenticationRR.LoginRequest;
import com.mp.ar.Usuarios.AuthenticationRR.RegisterRequest;
import com.mp.ar.Usuarios.entity.Role;
import com.mp.ar.Usuarios.entity.Usuario;
import com.mp.ar.Usuarios.repository.IUsuarioRepository;
import com.mp.ar.Usuarios.jwt.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class AuthService {
    @Autowired
    private IUsuarioRepository usuRepo;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public AuthResponse login(LoginRequest request) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(),request.getPassword()));
        UserDetails usuario = usuRepo.findByEmail(request.getEmail()).orElseThrow();
        String token = jwtService.getToken(usuario);
        return AuthResponse.builder()
                .token(token)
                .build();
    }


    public AuthResponse register(RegisterRequest request) {
        Usuario usuario = Usuario.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .name(request.getName())
                .surname(request.getSurname())
                .phone(request.getPhone())
                .role(Role.USER).build();

        usuRepo.save(usuario);

        return AuthResponse.builder()
                .token(jwtService.getToken(usuario))
                .build();
    }
}
