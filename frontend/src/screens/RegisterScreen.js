import React, { useState, useEffect } from "react";

//Redux
import { useDispatch, useSelector } from 'react-redux'

//Router
import { useNavigate, Link } from "react-router-dom";

//Actions
import { registerNewUser } from '../actions/userActions'

//Components
import Loader from '../components/Loader' //to have the Spinner in the page
import Message from '../components/Message' //to have the Error in the page

function RegisterScreen() {

    const[name,setName] = useState('')
    const[email,setEmail] = useState('')
    const[password, setPassword] = useState('')
    const[confirmPassword,setConfirmPassword] = useState('')

    const dispatch = useDispatch();

    const userRegister = useSelector(state => state.userRegister)
    const { loading, error, success } = userRegister

    let history = useNavigate(); //for V6 it is useNavigate, NOT useHistory

    useEffect(() => {
        if (success) {
            history('/')
        }
        }, [dispatch, success, history]);

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
            {loading ? <Loader /> //it is to create the loadin and error view 
                : error ? <Message variant='danger'>{error}</Message>
                : 
                <div className="row d-flex justify-content-center">
                
                    <div className="col-md-5 card p-3" style={{marginTop:'150px'}}>
                        <div className="div">
                            <h4 className='text-center m-3'>Register</h4>
                            <form onSubmit={register}>
                                <input type="text" placeholder='Name' required className='form-control mt-2' value={name} onChange={(e) => setName(e.target.value)} />
                                <input type="text" placeholder='Email' required className='form-control mt-2' value={email} onChange={(e) => setEmail(e.target.value)} />
                                <input type="text" placeholder='Password' required className='form-control mt-2' value={password} onChange={(e) => setPassword(e.target.value)} />
                                <input type="text" placeholder='Confirm Password' required className='form-control mt-2' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                                <div className="d-flex align-items-end flex-column">
                                    <button type='submit' className='btn mt-3'>Register</button>
                                </div>
                            </form>
                            <Link to="/login" className="btn btn-light m-3 login-button">You already have account</Link>
                            
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default RegisterScreen