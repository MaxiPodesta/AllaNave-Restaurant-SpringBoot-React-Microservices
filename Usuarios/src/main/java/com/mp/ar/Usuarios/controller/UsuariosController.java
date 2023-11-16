package com.mp.ar.Usuarios.controller;

import com.mp.ar.Usuarios.entity.Usuario;
import com.mp.ar.Usuarios.exception.NotFoundResource;
import com.mp.ar.Usuarios.service.IUsuarioService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/alla-nave")
@CrossOrigin(value = "http://localhost:3000")//port from where the petitions of the frontend will arrive
public class UsuariosController {
    private final static Logger logger = LoggerFactory.getLogger(UsuariosController.class);


    @Autowired
    private IUsuarioService usuServ;//Injection of the interface




    @GetMapping("/usuarios")
    @ResponseStatus(HttpStatus.CREATED)
    public List<Usuario> getAllUsuarios(){//list all the users
        var usuarios  = usuServ.listOfUsuarios();
        usuarios.forEach(usuario -> logger.info(usuario.toString()));//it brings all the info of each user on the DB
        return usuarios;
    }
    @PostMapping("/usuarios")
    public Usuario newUsuario(@RequestBody Usuario usu){

        return usuServ.createUsuario(usu);//create a new user
    }
    @DeleteMapping("/usuarios/{idUsuario}")
    public ResponseEntity<Map<String,Boolean>>removeUsuario(@PathVariable Integer idUsuario){
           Usuario usuario = usuServ.searchUsuario(idUsuario);
           if(usuario==null)
               throw new NotFoundResource("This id Doesn't exist in the database");
           usuServ.deleteUsuario(idUsuario);
           //Json
        Map<String,Boolean> answer =new HashMap<>();
        answer.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(answer);
    }
    @PutMapping("/usuarios/{idUsuario}")
    public ResponseEntity<Usuario> editUsuario(@PathVariable Integer idUsuario,
                                               @RequestBody Usuario usu){
        Usuario usuario = usuServ.searchUsuario(idUsuario); //find the user by id

            usuario.setName(usu.getName());
            usuario.setSurname(usu.getSurname());
            usuario.setEmail(usu.getEmail());
            usuario.setPassword(usu.getPassword());
            usuario.setPhone(usu.getPhone());
            usuServ.createUsuario(usuario); //update the new data

        return ResponseEntity.ok(usuario);
    }

    @GetMapping("/usuarios/{idUsuario}")
    public ResponseEntity<Usuario> searchUser(@PathVariable Integer idUsuario){

        Usuario usuario = usuServ.searchUsuario(idUsuario);
        if(usuario==null){
            throw new NotFoundResource("Couldn't found the resource: "+ idUsuario);
        }
        return ResponseEntity.ok(usuario);

    }
    @GetMapping("/usuarios/usuariosByEmail/{email}")
    public ResponseEntity<Usuario> searchUserByEmail(@PathVariable String email){

        Usuario usuario = usuServ.searchUsuarioByEmail(email);
        if(usuario==null){
            throw new NotFoundResource("Couldn't found the resource: "+ email);//in case that the email doesn't exist in the DB
        }
        return ResponseEntity.ok(usuario);

    }

}