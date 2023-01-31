import React, { useState, useEffect } from 'react'

//React Redux
import {useDispatch, useSelector} from 'react-redux'

//Router Dom
import { useNavigate, useParams } from 'react-router-dom'

//Components
import Loader from '../components/Loader' //to have the Spinner in the page
import Message from '../components/Message' //to have the Error in the page

//Actions
import { getCategoryDetails, updateCategory } from '../actions/categoryActions'

//Constants
import { CATEGORY_UPDATE_RESET } from '../constants/categoryConstants'

function UserEditScreen({ match }) {

    const dispatch = useDispatch()

    let history = useNavigate(); //for V6 it is useNavigate, NOT useHistory

    let { id } = useParams(match); //get the Product ID

    const [name, setName] = useState('')

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    //it goes to store and call the reducer from 'userRegister'. In this reducer we get the following data (error, loading, userInfo)
    const categoryDetails = useSelector((state) => state.categoryDetails);
    const { error, loading, category } = categoryDetails;

    const categoryUpdate = useSelector((state) => state.categoryUpdate);
    const { error: errorUpdate, loading: loadingUpdate, success: successUpdate } = categoryUpdate; //it change the variable name because of the duplicate names

    //it is to full fill the field as soon as we load the page

    useEffect(() => {

        if (userInfo.isadmin === false) {
            history('/login')
        } else {

            dispatch(getCategoryDetails(id))
            if(successUpdate){
                dispatch({type: CATEGORY_UPDATE_RESET})
                history('/admin/categories')

            } else {
    
                if(!category) {
                    dispatch(getCategoryDetails(id))
                }
    
                if(category?.name !== undefined || category?.name !== name || category?._id === Number(id)){
                    setName(String(category?.name))

                }
            }
        }

    }, [category?.name, id, successUpdate, history, dispatch]);

    const submitHandler = (e) => {
        e.preventDefault()

        dispatch(updateCategory({ 
            '_id': category._id,
            'name': name,}))
    }

    return (
    <div className='profile container'>
        <div className="row d-flex">
                
                <div className="card p-3">
                    <h2 className='user-title'>Edit - Category</h2>
                    <form onSubmit={submitHandler}>
                        <input type="text" placeholder='Name' className='form-control mt-2' value={name}  onChange={e => setName(e.target.value)}/>

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