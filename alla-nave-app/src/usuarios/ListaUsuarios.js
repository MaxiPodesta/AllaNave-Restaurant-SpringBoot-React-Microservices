import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export default function ListaUsuarios() {


    const urlBase="http://localhost:8080/alla-nave/usuarios";

    const[usuarios, setUsuarios]= useState([]);
   
    useEffect(() => {
        loadUsuarios();
    },[]);
   
    const loadUsuarios = async () => {
        const result =await axios.get(urlBase);
        console.log("Result load Users");
        console.log(result.data);
        setUsuarios(result.data);
    }
   const deleteUser=async(idUsuario) => {
    await axios.delete(`${urlBase}/${idUsuario}`)
    loadUsuarios();
  }

  return ( <div className="container">
  <div className="container text-center" style={{ margin: "30px" }}>
    <h3>List of users</h3>
  </div>
  <table className="table table-striped table-over align-mode">
    <thead className="table-dark">
      <tr>
        <th scope="col">Id</th>
        <th scope="col">Name</th>
        <th scope="col">Surname</th>
        <th scope="col">Email</th>
        <th scope="col">Phone</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
        {//Iteration of the array Usuarios
        usuarios.map((usuarios,indice)=> (
      <tr key={indice}>
        <th scope="row">{usuarios.idUsuario}</th>
        <td>{usuarios.name}</td>
        <td>{usuarios.surname}</td>
        <td>{usuarios.email}</td>
        <td>{usuarios.phone}</td>
        <td className='text-center'>
          <div>
            <Link to={`/edit/${usuarios.idUsuario}`}
            className='btn btn-warning btn-sm me-3'>Edit</Link>
            <button onClick={()=> deleteUser(usuarios.idUsuario)}
            className='btn btn-danger btn-sm'
            >Delete</button>
          </div>
        </td>
      </tr>
        ))
        }
    </tbody>
  </table>
</div>
)
}
