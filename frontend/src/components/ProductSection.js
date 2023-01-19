import React from 'react'

import Rating from "../components/Rating";

//React Router Dom
import { Link } from 'react-router-dom'

function ProductSection({productList}) {
  return (
    <div>
        <div className="product-main">

        <h2 class="title">New Products</h2>

            <div class="product-grid">

                {(productList?.length && (productList.map(product => {
                    
                    return ( 
                    <div class="showcase">

                        <div class="showcase-banner">

                        <img src={product?.image} alt="Product Image" width="300" class="product-img default"/>

                        <p class="showcase-badge">15%</p>

                            <div class="showcase-actions">

                                <button class="btn-action">
                                <ion-icon name="heart-outline" role="img" class="md hydrated" aria-label="heart outline"></ion-icon>
                                </button>

                                <button class="btn-action">
                                <ion-icon name="eye-outline" role="img" class="md hydrated" aria-label="eye outline"></ion-icon>
                                </button>

                                <button class="btn-action">
                                <ion-icon name="repeat-outline" role="img" class="md hydrated" aria-label="repeat outline"></ion-icon>
                                </button>

                                <button class="btn-action">
                                <ion-icon name="bag-add-outline" role="img" class="md hydrated" aria-label="bag add outline"></ion-icon>
                                </button>

                            </div>

                        </div>

                            <div class="showcase-content">

                            <a href="#" class="showcase-category"><b>{product?.category}</b></a>

                            <Link to={`/product/${product._id}`}>
                                <div className="showcase-title-box">                               
                                    <h3 class="showcase-title">{product?.name}</h3>
                                </div>
                            </Link>

                                <Rating value={Number(product.rating)} color={'#f8e825'} 
                                    text={(product.numReviews) > 0 
                                        ? (` ${Number(product?.numReviews)} reviews`) 
                                        : typeof(product?.numReviews)=== 'undefined' 
                                            ? (' 0 review') : (' 0 review')}  />

                                <div class="price-box">
                                    <p class="price-product">${product?.price}</p>
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