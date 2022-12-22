import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from 'react-redux'
import { registerNewUser } from '../actions/userActions'

//Router
import { useNavigate } from "react-router-dom";

function RegisterScreen() {

    

    const[name,setName] = useState('')
    const[email,setEmail] = useState('')
    const[password, setPassword] = useState('')
    const[confirmPassword,setConfirmPassword] = useState('')

    const dispatch = useDispatch();

    const registerUser = useSelector(state => state.registerUser)
    const { loading, error, success } = registerUser

    let history = useNavigate(); //for V6 it is useNavigate, NOT useHistory

    useEffect(() => {
        if (success) {
            console.log("hier")
            history('/')
        }
        }, [dispatch, success]);

    function register(e) {

        e.preventDefault()

        const user = {
            name: name,
            email: email,
            password: password
        }
        if(password === confirmPassword){
            dispatch(registerNewUser(user))

        } else {
            alert('Passwords not matched')
        }

    }


    return (
        <div>
            <div className="row d-flex justify-content-center">
                <div className="col-md-5 card p-3" style={{marginTop:'150px'}}>
                    <div className="div">
                        <h4 className='text-center m-3'>Register</h4>
                        <form onSubmit={register}>
                            <input type="text" placeholder='Name' required className='form-control' value={name} onChange={(e) => setName(e.target.value)} />
                            <input type="text" placeholder='Email' required className='form-control' value={email} onChange={(e) => setEmail(e.target.value)} />
                            <input type="text" placeholder='Password' required className='form-control' value={password} onChange={(e) => setPassword(e.target.value)} />
                            <input type="text" placeholder='Confirm Password' required className='form-control' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                            <div className="d-flex align-items-end flex-column">
                                <button type='submit' className='btn mt-3'>Register</button>
                            </div>
                        </form>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegisterScreen