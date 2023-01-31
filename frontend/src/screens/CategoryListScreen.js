import React, { useEffect } from 'react'

//Redux
import { useDispatch, useSelector } from 'react-redux' 
//useSelector - allows us to used certain parts of the state/reducer

//Router Dom
import { Link, useNavigate } from 'react-router-dom'

//Boostrap Components
import { Button } from 'react-bootstrap'

//Actions
import { listCategories, deleteCategory } from '../actions/categoryActions'

function CategoryListScreen() {

    const dispatch = useDispatch()

    const history = useNavigate();

    const categoryList = useSelector(state => state.categoryList)
    const {error, loading, categories} = categoryList 

    const userLogin = useSelector((state)=> state.userLogin)
    const{ userInfo } = userLogin

    const categoryDelete = useSelector(state => state.categoryDelete)
    const {error: errorDelete, loading: loadingDelete, success: successDelete} = categoryDelete 

    useEffect(() => {

        if (!userInfo?.isadmin) {
            history('/login')
        } else {
            dispatch(listCategories())
        }
        
    }, [dispatch, successDelete])

    const deleteCategoryHandler = (categoryToDelete) => {
        if (window.confirm('Are you sure you want to delete this user?')){
            //console.log('DELETE: ', id)
            dispatch(deleteCategory(categoryToDelete?._id))
            history('/admin/category')
        }
    }

    return (
        <div className='category'>
            <div className='container'>

                <div className="table-top d-flex justify-content-between">
                    <div className="category-title">
                        <h2>Category List</h2>
                    </div>
                    <div className="category-add-btn">
                        <Link to="/admin/category/create" className="btn btn-dark m-3">Add Category</Link>
                    </div>
                    
                </div>
                
                <table className='table'>
                    <thead>
                        <tr className='table-active'>
                            <th><strong>Name</strong></th>
                            <th className='text-center'><strong>Number of Products</strong></th>
                            <th className='center'><strong>Options</strong></th>
                        </tr>
                    </thead>

                    <tbody>
                        {categories?.map(item=> {
                            return (
                                <tr key={item._id}>
                                    <td>{item.name}</td>
                                    <td className='text-center'>{item.products.length}</td>
                                    <td className='center'>

                                        <Button variant='light' className='btn-sm'>
                                            <a href={`./category/${item._id}`}><i className='fas fa-edit'></i></a>
                                        </Button>

                                        <Button variant='danger' className='btn-sm' onClick={() => deleteCategoryHandler(item)}>
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

export default CategoryListScreen