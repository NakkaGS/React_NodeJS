import React, { useEffect } from 'react'

//Redux
import { useDispatch, useSelector } from 'react-redux' 
//useSelector - allows us to used certain parts of the state/reducer

//Router Dom
import { Link } from 'react-router-dom'

//Actions
import { listProducts } from '../actions/productActions'

function ProductListScreen() {

    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const {error, loading, products} = productList 

    useEffect(() => {
        dispatch(listProducts())
    }, [dispatch])

    return (
        <div className='product-list'>
            <div className='container'>

                <div className="table-top d-flex justify-content-between">
                    <div className="product-list-title">
                        <h2>Product List</h2>
                    </div>
                    <div className="product-add-btn">
                        <Link to="/category/create" className="btn btn-dark m-3">Add Category</Link>
                    </div>

                    
                </div>
                
                <table className='table'>
                    <thead>
                        <tr>
                            <th><strong>Name</strong></th>
                            <th><strong>Category</strong></th>
                            <th><strong>Price</strong></th>
                            <th><strong>Number in Stock</strong></th>
                            <th><strong>Rating</strong></th>
                            <th><strong>Number of Reviews</strong></th>
                        </tr>
                    </thead>

                    <tbody>
                        {products?.map(item=> {
                            return (
                                <tr key={item._id}>
                                    <td>{item.name}</td>
                                    <td>{item.category.name}</td>
                                    <td>${item.price}</td>
                                    <td>{item.countInStock} units</td>
                                    <td>{item.rating}</td>
                                    <td>{item.reviews.length}</td>
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