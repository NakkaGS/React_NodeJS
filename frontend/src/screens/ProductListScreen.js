import React, { useEffect } from 'react'

//Redux
import { useDispatch, useSelector } from 'react-redux' 
//useSelector - allows us to used certain parts of the state/reducer

//Router Dom
import { Link, useNavigate } from 'react-router-dom'

//Actions
import { listProducts } from '../actions/productActions'

//Boostrap Components
import { Button } from 'react-bootstrap'

function ProductListScreen() {

    const dispatch = useDispatch()

    let history = useNavigate(); //for V6 it is useNavigate, NOT useHistory

    const productList = useSelector(state => state.productList)
    const {error, loading, products} = productList 

    const userLogin = useSelector(state=> state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {

        if (userInfo?.isadmin === false) {
            history('/login')
        } else {
            dispatch(listProducts())
        }

    }, [dispatch, history])

    return (
        <div className='product-list'>
            <div className='container'>

                <div className="table-top d-flex justify-content-between">
                    <div className="product-list-title">
                        <h2>Product List</h2>
                    </div>
                    <div className="product-add-btn">
                        <Link to="/admin/product/create" className="btn btn-dark m-3">Add Product</Link>
                    </div>

                    
                </div>
                
                <table className='table '>
                    <thead>
                        <tr className='table-active'>
                            <th><strong>Name</strong></th>
                            <th className='text-center'><strong>Category</strong></th>
                            <th className='text-center'><strong>Price</strong></th>
                            <th className='text-center'><strong>Number in Stock</strong></th>
                            <th className='text-center'><strong>Rating</strong></th>
                            <th className='text-center'><strong>Number of Reviews</strong></th>
                            <th className='center'><strong>Options</strong></th>
                        </tr>
                    </thead>

                    <tbody>
                        {products?.map(item=> {
                            return (
                                <tr key={item._id}>
                                    <td>{item.name}</td>
                                    <td className='text-center'>{item.category.name}</td>
                                    <td className='text-center'>${item.price}</td>
                                    <td className='text-center'>{item.countInStock} units</td>
                                    <td className='text-center'>{item.rating.toFixed(2)}</td>
                                    <td className='text-center'>{item.reviews.length}</td>
                                    <td className='center'>

                                        <Button variant='light' className='btn-sm'>
                                            <a href={`./product/${item._id}`}><i className='fas fa-edit'></i></a>
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

export default ProductListScreen