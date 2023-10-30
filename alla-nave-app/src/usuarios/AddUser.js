import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function AddUser() {
    let navegacion = useNavigate();
    const [usuario, setUsuario] = useState({
        name: "",
        surname: "",
        email: "",
        password: "",
        phone: ""
    })
    const { name, surname, email, password, phone } = usuario   

    const onInputChange = (e) => {
        setUsuario({ ...usuario, [e.target.name]: e.target.value })
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        const urlBase = "http://localhost:8080/alla-nave/usuarios";
        await axios.post(urlBase, usuario);
        //Redirect to main Page
        navegacion("/");
    }

    return (
        <div className='container'>
            <div className='container text-center' style={{ margin: "30px" }}>
                <h3 style={{ color: 'white' }}>Add User</h3>
            </div>

            <form onSubmit={(e) => onSubmit(e)}>
                <div className="mb-3">
                    <label htmlFor="Name" className="form-label" style={{ color: 'white' }}>Name</label>
                    <input type="text" className="form-control" id="name" name="name" required={true}
                        value={name} onChange={(e) => onInputChange(e)} />
                </div>

                <div className="mb-3">
                    <label htmlFor="Surname" className="form-label" style={{ color: 'white' }}>Surname</label>
                    <input type="text" className="form-control" id="surname" name='surname' required={true}
                        value={surname} onChange={(e) => onInputChange(e)} />
                </div>

                <div className="mb-3">
                    <label htmlFor="Email" className="form-label" style={{ color: 'white' }}>Email</label>
                    <input type="email" className="form-control" id="email" name="email"
                        value={email} onChange={(e) => onInputChange(e)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="Password" className="form-label" style={{ color: 'white' }}>Password</label>
                    <input type="password" className="form-control" id="password" name="password"
                        value={password} onChange={(e) => onInputChange(e)} />
                </div>

                <div className="mb-3">
                    <label htmlFor="Phone" className="form-label" style={{ color: 'white' }}>Phone</label>
                    <input type="tel" className="form-control" id="phone" name="phone"
                        value={phone} onChange={(e) => onInputChange(e)} />
                </div>

                <button type="submit" className="btn btn-success">Update Changes</button>
                <a href='/' className='btn btn-danger btn-sm'>Return</a>
            </form>
        </div>
    )
}
