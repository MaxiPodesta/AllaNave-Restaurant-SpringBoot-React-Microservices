package com.mp.ar.reservation.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
public class UsuarioDTO {
    private String name;
    private String surname;
    private String email;
    private String phone;
    private String password;
}
