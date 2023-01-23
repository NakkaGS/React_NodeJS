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
                        <h2>My Cart</h2>
                    </div>
                    <div className="product-add-btn">
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
                        {products?.map(item=> {
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

export default ProductListScreen