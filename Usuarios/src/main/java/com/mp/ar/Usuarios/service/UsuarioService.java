package com.mp.ar.Usuarios.service;

import com.mp.ar.Usuarios.entity.Usuario;
import com.mp.ar.Usuarios.repository.IUsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsuarioService implements IUsuarioService{

    @Autowired
    private IUsuarioRepository usuRepo;//Injection of the repository

    @Override
    public List<Usuario> listOfUsuarios() {
        return usuRepo.findAll();
    }// List all the users of the DB

    @Override
    public Usuario createUsuario(Usuario usu) {
        return usuRepo.save(usu);
    }//Save a new user

    @Override
    public String deleteUsuario(Integer idUsuario) {//Delete the user searching it by id
        usuRepo.deleteById(idUsuario);
        return "User has been deleted succesfully";
    }

    @Override
    public String editUsuario(Integer idUsuario, Usuario usuEdit) { //Edit the user by id and recieve all the new data
        Usuario usuario= usuRepo.findById(idUsuario).orElse(null);
        assert usuario != null;

        usuario.setName(usuEdit.getName());
        usuario.setSurname(usuEdit.getSurname());
        usuario.setEmail(usuEdit.getEmail());
        usuario.setPassword(usuEdit.getPassword());
        usuario.setPhone(usuEdit.getPhone());

        usuRepo.save(usuario);

        return "User has been edited succesfully";
    }

    @Override
    public Usuario searchUsuario(Integer idUsuaio) {//Search the user and in case of don't find it returns null
        return usuRepo.findById(idUsuaio).orElse(null);
    }

    @Override
    public Usuario searchUsuarioByEmail(String email) {//search user by the email using the method declared in the repository

        return usuRepo.findByEmail(email);
    }
}
