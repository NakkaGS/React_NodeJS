import React from 'react'

//Boostrap Components
import { Row, Col, Badge } from 'react-bootstrap'

import { Link } from 'react-router-dom'

function NewProductCard({ product }) {
  return (
    <div className='cards'>
        <Link to={`/product/${product._id}`}>
            <div className='image'>
                <img src={product?.image} alt=''></img>
                <div className='insideimg'>
                    <h4>
                        {product?.countInStock > 0 ? (<Badge bg="success">'In Stock'</Badge>) : (<Badge bg="danger">'Out of Stock'</Badge>)}
                    </h4>
                </div>
            </div>

            <div className='details'>
                <h3>{product?.name}</h3>
                <div className='cateprice'>
                    <h5>{product?.category}</h5>
                    <h2>${product?.price}</h2>
                </div>
                
            </div>
        </Link>
    </div>
  )
}

export default NewProductCard