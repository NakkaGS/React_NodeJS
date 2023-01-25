import React, { useEffect } from 'react'

//Redux
import { useDispatch, useSelector } from 'react-redux' 
//useSelector - allows us to used certain parts of the state/reducer

//Router Dom
import { Link, useNavigate } from 'react-router-dom'

//Actions
import { getAllUserDetails } from '../actions/userActions'

//Boostrap Components
import { Button } from 'react-bootstrap'

function UserListScreen() {
  
  const dispatch = useDispatch()

  let history = useNavigate(); //for V6 it is useNavigate, NOT useHistory

  const userList = useSelector(state => state.userList)
  const {error, loading, users} = userList 

  const userLogin = useSelector(state=> state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {

    if (userInfo?.isadmin === false) {
        history('/login')
    } else {
        dispatch(getAllUserDetails())
    }

}, [dispatch, history])


  return (
    <div className='user-list'>
      <div className='container'>

        <div className="table-top d-flex justify-content-between">
            <div className="user-list-title">
                <h2>User List</h2>
            </div>
            <div className="user-add-btn">
                <Link to="/admin/user/create" className="btn btn-dark m-3">Add User</Link>
            </div>

        </div>
        
        <table className='table '>
            <thead>
                <tr className='table-active'>
                    <th><strong>Name</strong></th>
                    <th className='text-center'><strong>E-mail</strong></th>
                    <th className='text-center'><strong>Is Admin?</strong></th>
                    <th className='center'><strong>Options</strong></th>
                </tr>
            </thead>

            <tbody>
                {users?.map(user=> {
                    return (
                        <tr key={user._id}>
                            <td>{user?.name}</td>
                            <td className='text-center'>{user?.email}</td>
                            <td className='text-center'>{user?.isadmin ? "Yes" : "No" }</td>
                            <td className='center'>

                                <Button variant='light' className='btn-sm'>
                                    <i className='fas fa-edit'></i>
                                </Button>

                                <Button variant='danger' className='btn-sm'>
                                    <i className='fas fa-trash'></i>
                                </Button>

                            </td>   
                        </tr>
                    )
                })}
            </tbody>

        </table>
      </div>
    </div>
  )
}

export default UserListScreen