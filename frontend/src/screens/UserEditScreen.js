import React, { useState, useEffect } from 'react'

//React Redux
import {useDispatch, useSelector} from 'react-redux'

//Router Dom
import { useNavigate, useParams } from 'react-router-dom'

//Components
import Loader from '../components/Loader' //to have the Spinner in the page
import Message from '../components/Message' //to have the Error in the page

//Actions
import { getUserDetails, updateUser } from '../actions/userActions'

//Constants
import { USER_UPDATE_RESET } from '../constants/userConstants'

function UserEditScreen({ match }) {

    const dispatch = useDispatch()

    let history = useNavigate(); //for V6 it is useNavigate, NOT useHistory

    let { id } = useParams(match); //get the Product ID

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isadmin, setIsAdmin] = useState(false)

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    //it goes to store and call the reducer from 'userRegister'. In this reducer we get the following data (error, loading, userInfo)
    const userDetails = useSelector((state) => state.userDetails);
    const { error, loading, userInfo: user } = userDetails;

    const userUpdate = useSelector((state) => state.userUpdate);
    const { error: errorUpdate, loading: loadingUpdate, success: successUpdate } = userUpdate; //it change the variable name because of the duplicate names

    //it is to full fill the field as soon as we load the page

    useEffect(() => {

        if (userInfo.isadmin === false) {
            history('/login')
        } else {

            if(successUpdate){
                dispatch({type: USER_UPDATE_RESET})
                history('/admin/users')

            } else {
    
                if(!user) {
                    dispatch(getUserDetails(id))
                }
    
                if(user?.name !== undefined || user?.name !== name || user?._id === Number(id)){
                    setName(String(user?.name))
                    setEmail(user?.email)
                    setIsAdmin(user?.isadmin)
                }
            }
        }

    }, [user?.name, id, successUpdate, history, dispatch]);

    //Gambiarra to convert 'false' to 'False' because the GET just accept 'False
    let isAdminBool = 'False'

    if (isadmin === false){
        isAdminBool = 'False'
    } else if (isadmin === true){
        isAdminBool = 'True'
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateUser({ 
        '_id': user._id,
        'name': name,
        'email': email,
        'isadmin': isAdminBool}))
    }

    return (
    <div className='profile container'>
        <div className="row d-flex">
                
                <div className="card p-3">
                    <h2 className='user-title'>Edit - User</h2>
                    <form onSubmit={submitHandler}>
                        <input type="text" placeholder='Name' className='form-control mt-2' value={name}  onChange={e => setName(e.target.value)}/>
                        <input type="text" placeholder='Email' className='form-control mt-2' value={email} onChange={e => setEmail(e.target.value)} />
                        <input type="checkbox" id='isadmin' placeholder='Admin' className='mt-2' checked={isadmin} onChange={e => setIsAdmin(e.target.value)} />
                        <label htmlFor="isadmin">Admin</label><br/>

                        <div className="d-flex align-items-end flex-column">
                            <button type='submit' className='mt-3 light'>Update</button>
                        </div>
                    </form>
                    
                </div>
        </div>
    </div>
    )
}

export default UserEditScreen