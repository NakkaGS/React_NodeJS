import React, { useState, useEffect } from 'react'

//Redux
import { useDispatch, useSelector } from 'react-redux'

//React Router Dom
import { Link } from 'react-router-dom'

//Components
import Rating from "../components/Rating";

//Actions
import { filterProducts } from '../actions/productActions'

function ProductSection({productList}) {
    const [searchKey, setSearchKey] = useState('')
    const [sort, setSort] = useState('popular')
    const [category, setCategory] = useState('all')

    const dispatch = useDispatch()

    return (
        <div>
            <div className="product-main">

            <h2 className="title">New Products</h2>

                <div className="product-grid">

                    {(productList?.length && (productList.map(product => {
                        
                        return ( 
                        <div className="showcase" key={product._id}>

                            <div className="showcase-banner">
                            
                            <img src={product?.image} alt="Product Image" width="300" className="product-img default"/>

                            <p className="showcase-badge">15%</p>

                                <div className="showcase-actions">

                                    <button className="btn-action">
                                        <ion-icon name="heart-outline" role="img" class="md hydrated" aria-label="heart outline"></ion-icon>
                                    </button>

                                    <button className="btn-action">
                                        <ion-icon name="eye-outline" role="img" class="md hydrated" aria-label="eye outline"></ion-icon>
                                    </button>

                                    <button className="btn-action">
                                        <ion-icon name="repeat-outline" role="img" class="md hydrated" aria-label="repeat outline"></ion-icon>
                                    </button>

                                    <button className="btn-action">
                                        <ion-icon name="bag-add-outline" role="img" class="md hydrated" aria-label="bag add outline"></ion-icon>
                                    </button>

                                </div>

                            </div>

                                <div className="showcase-content">

                                    <button className="showcase-category" onClick={() => { dispatch(filterProducts(searchKey, sort, String(product?.category?.name))) } }><b>{product?.category?.name}</b></button>

                                    <Link to={`/product/${product._id}`}>
                                        <div className="showcase-title-box">                               
                                            <h3 className="showcase-title">{product?.name}</h3>
                                        </div>
                                    </Link>

                                    <Rating value={Number(product.rating)} color={'#f8e825'} 
                                        text={(product?.reviews.length) > 0 
                                            ? (` ${Number(product?.reviews.length)} reviews`) 
                                            : typeof(product?.numReviews)=== 'undefined' 
                                                ? (' 0 review') : (' 0 review')}  />

                                    <div className="price-box">
                                        <p className="price-product">${product?.price}</p>
                                        <del>$75.00</del>
                                    </div>

                                </div>

                            </div>
                            
                        
                        )
                            
                    })))}

                </div>

            </div>

        </div>
    )
}

export default ProductSection