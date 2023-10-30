package com.mp.ar.Usuarios.service;

import com.mp.ar.Usuarios.entity.Usuario;

import java.util.List;


public interface IUsuarioService {
    public List<Usuario> listOfUsuarios();
    public Usuario createUsuario(Usuario usu);
    public String deleteUsuario(Integer idUsuario);
    public String editUsuario(Integer idUsuario, Usuario usuEdit);
    public Usuario searchUsuario(Integer idUsuaio);
    public Usuario searchUsuarioByEmail(String email);
}
