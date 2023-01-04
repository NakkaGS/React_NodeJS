import React, { useState, useEffect } from 'react'

import {useDispatch, useSelector} from 'react-redux'

import { useNavigate } from 'react-router-dom'

import Message from '../components/Message'

import { updateUserProfile, getUserDetails } from '../actions/userActions'

//Constants
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'

function ProfileScreen() {
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const userDetails = useSelector((state) => state.userDetails)
    const { error, loading, user } = userDetails

    const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
    const { success: successUpdate } = userUpdateProfile

    const dispatch = useDispatch()

    const [name, setName] = useState( userInfo.name )
    const [email, setEmail] = useState( userInfo.email)
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [message, setMessage] = useState('')

    const history = useNavigate()

    if (!userInfo) {
        history('/login')
      }
    
      /////////
      useEffect(() => {
        if (!userInfo) {
          history('/login')
        } else {
            if(!user || !user.name || userInfo?._id !== user?._id || successUpdate){ //that to get the data
              dispatch({ type: USER_UPDATE_PROFILE_RESET}) //it helps to not get the same profile as in Edit User Profile            

            } else { //after get the data it full fill the data with setName and setEmail
              setName(user.name)
              setEmail(user.email)
            }
        }
      }, [history, dispatch, user, userInfo]);

    const submitHandler = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setMessage("Password do not match")
        } else {
            const user = {
                _id: userInfo._id,
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
                        <input type="text" placeholder='Name' className='form-control mt-2' value={name} onChange={(e) => setName(e.target.value)} />
                        <input type="text" placeholder='Email' className='form-control mt-2' value={email} onChange={(e) => setEmail(e.target.value)} />
                        <input type="text" placeholder='Password' className='form-control mt-2' value={password} onChange={(e) => setPassword(e.target.value)} />
                        <input type="text" placeholder='Confirm Password' className='form-control mt-2' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
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