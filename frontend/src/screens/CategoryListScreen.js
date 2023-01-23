import React, { useEffect } from 'react'

//Redux
import { useDispatch, useSelector } from 'react-redux' 
//useSelector - allows us to used certain parts of the state/reducer

//Router Dom
import { Link } from 'react-router-dom'

//Actions
import { listCategories } from '../actions/categoryActions'

function CategoryListScreen() {

    const dispatch = useDispatch()

    const categoryList = useSelector(state => state.categoryList)
    const {error, loading, categories} = categoryList 

    useEffect(() => {
        dispatch(listCategories())
    }, [dispatch])

    return (
        <div className='category'>
            <div className='container'>

                <div className="table-top d-flex justify-content-between">
                    <div className="category-title">
                        <h2>My Cart</h2>
                    </div>
                    <div className="category-add-btn">
                        <Link to="/category/create" className="btn btn-dark m-3">Add Category</Link>
                    </div>

                    
                </div>
                
                <table className='table'>
                    <thead>
                        <tr>
                            <th><strong>Name</strong></th>
                            <th><strong>Number of Products</strong></th>
                        </tr>
                    </thead>

                    <tbody>
                        {categories?.map(item=> {
                            return (
                                <tr key={item._id}>
                                    <td>{item.name}</td>
                                    <td>{item.products.length}</td>
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