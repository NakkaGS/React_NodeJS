import React, { useState } from 'react'

import {useDispatch, useSelector} from 'react-redux'

import Message from '../components/Message'

import { updateUserProfile } from '../actions/userActions'

function ProfileScreen() {
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const dispatch = useDispatch()

    const [name, setName] = useState( userInfo.name )
    const [email, setEmail] = useState( userInfo.email)
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [message, setMessage] = useState('')

    const submitHandler = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setMessage("Password do not match")
        } else {
            const user = {
                name: name,
                email: email,
                password: confirmPassword,
            };
              
            dispatch(updateUserProfile(user));
          }
    }


    return (
    <div>
        <div className="row d-flex justify-content-center">
                
            <div className="col-md-5 card p-3" style={{marginTop:'150px'}}>
                <div className="div">
                    <h4 className='text-center m-3'>Update</h4>
                    {message && <Message variant="danger">{message}</Message>}
                    <form onSubmit={submitHandler}>
                        <input type="text" placeholder='Name' required className='form-control mt-2' value={name} onChange={(e) => setName(e.target.value)} />
                        <input type="text" placeholder='Email' required className='form-control mt-2' value={email} onChange={(e) => setEmail(e.target.value)} />
                        <input type="text" placeholder='Password' required className='form-control mt-2' value={password} onChange={(e) => setPassword(e.target.value)} />
                        <input type="text" placeholder='Confirm Password' required className='form-control mt-2' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                        <div className="d-flex align-items-end flex-column">
                            <button type='submit' className='btn mt-3'>Update</button>
                        </div>
                    </form>
                    
                </div>
            </div>
        </div>
    </div>
    )
}

export default ProfileScreen