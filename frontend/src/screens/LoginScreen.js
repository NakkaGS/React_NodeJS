import React, { useState, useEffect } from "react";

//Redux
import { useDispatch, useSelector } from 'react-redux'

//Router
import { useNavigate, Link } from "react-router-dom";

//Actions
import { loginUser } from '../actions/userActions'

//Components
import Loader from '../components/Loader' //to have the Spinner in the page
import Message from '../components/Message' //to have the Error in the page

function LoginScreen() {

    const[email,setEmail] = useState('')
    const[password, setPassword] = useState('')

    const dispatch = useDispatch();

    let history = useNavigate(); //for V6 it is useNavigate, NOT useHistory

    const userLogin = useSelector(state => state.userLogin)
    const { loading, error, userInfo } = userLogin

    useEffect(() => {
        if (typeof(userInfo) !=="undefined") {
            if(userInfo){
                history('/')
            }
        }
    }, [userInfo, history]);

    function login(e) {
        e.preventDefault()

        const user = {
            email: email,
            password: password
        }
        dispatch(loginUser(user))
    }

    return (
        <div>
            {loading ? <Loader /> //it is to create the loadin and error view 
                : error ? <Message variant='danger'>{error}</Message>
                : 
                <div className="row d-flex justify-content-center">
                    <div className="col-md-5 card p-3" style={{marginTop:'150px'}}>
                        <div className="div">
                            <h4 className='text-center m-3'>Sign In</h4>
                            <form onSubmit={login}>
                                <input type="text" placeholder='Email' required className='form-control mt-2' value={email} onChange={(e) => setEmail(e.target.value)} />
                                <input type="password" placeholder='Password' required className='form-control mt-2' value={password} onChange={(e) => setPassword(e.target.value)} />
                                <div className="d-flex align-items-end flex-column">
                                    <button type='submit' className='btn btn-light mt-3'>Sign In</button>
                                </div>
                            </form>

                            <Link to="/register" className="btn btn-light m-3 register-button">Register</Link>
                            
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default LoginScreen