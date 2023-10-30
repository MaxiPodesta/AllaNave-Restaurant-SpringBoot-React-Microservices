package com.mp.ar.Usuarios.repository;

import com.mp.ar.Usuarios.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface IUsuarioRepository extends JpaRepository<Usuario, Integer> {
    @Query("SELECT u FROM Usuario u WHERE u.email = :email")//Query needed to instruct the action in the DB
    Usuario findByEmail(String email);
}
