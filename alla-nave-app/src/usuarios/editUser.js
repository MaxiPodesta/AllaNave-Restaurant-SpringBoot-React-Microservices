/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function EditUser() {

    const urlBase = "http://localhost:8080/alla-nave/usuarios";

    let navegacion = useNavigate();

    const {idUsuario} = useParams();

    const [usuario, setUsuario] = useState({
        name: "",
        surname: "",
        email: "",
        password: "",
        phone: ""
    })

    const { name, surname, email, password, phone } = usuario

    useEffect(() => {
        loadUser();
    }, [])

    const loadUser = async () => {
        const resultado = await axios.get(`${urlBase}/${idUsuario}`)
        setUsuario(resultado.data);
    }

    const onInputChange = (e) => {
        //spread operator ... (expandir los atributos)
        setUsuario({ ...usuario, [e.target.name]: e.target.value })
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.put(`${urlBase}/${idUsuario}`, usuario);
        // Redirigimos a la pagina de inicio
        navegacion('/');
    }

    return (
        <div className='container'>
            <div className='container text-center' style={{ margin: "30px" }}>
                <h3 style={{ color: 'white' }}>Edit User</h3>
            </div>

            <form onSubmit={(e) => onSubmit(e)}>

                <div className="mb-3">
                    <label htmlFor="name"
                        className="form-label" style={{ color: 'white' }}>Name</label>
                    <input type="text" className="form-control"
                        id="name" name='name' required={true}
                        value={name} onChange={(e) => onInputChange(e)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="surname"
                        className="form-label" style={{ color: 'white' }}>Surname</label>
                    <input type="text" className="form-control"
                        id="surname" name='surname'
                        value={surname} onChange={(e) => onInputChange(e)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="email"
                        className="form-label" style={{ color: 'white' }}>Email</label>
                    <input type="email" className="form-control"
                        id="email" name='email'
                        value={email} onChange={(e) => onInputChange(e)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="password"
                        className="form-label" style={{ color: 'white' }}>Password</label>
                    <input type="password" className="form-control"
                        id="password" name='password'
                        value={password} onChange={(e) => onInputChange(e)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="phone"
                        className="form-label" style={{ color: 'white' }}>Phone</label>
                    <input type="phone" className="form-control"
                        id="phone" name='phone'
                        value={phone} onChange={(e) => onInputChange(e)} />
                </div>
                <div className='text-center'>
                    <button type="submit"
                        className="btn btn-warning btn-sm me-3">Update Changes</button>
                    <a href='/' className='btn btn-danger btn-sm'>Return</a>
                </div>
            </form>
        </div>
    )
}
