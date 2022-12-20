//App.js->HomeScreen.js->Product.js
//It show the product with some describition (used in HomeScreen)

import React from 'react'

//Boostrap Components
import { Card, Row, Col, Badge } from 'react-bootstrap'

//Components
import Rating from './Rating'

import { Link } from 'react-router-dom'

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

function Product({ product }) { //take the product in HomeScreen
  return (
    <Card className='mt-2 mb-2'>
        <Link to={`/product/${product._id}`}>
            <Card.Img src={product.image} className="site-img" fluid/>
        </Link> 

        <Card.Body>
          <Link to={`/product/${product._id}`}>
            <Card.Title as="div" className='text-center'>
              <strong> 
                {product.name}
              </strong>
            </Card.Title>
          </Link>
        </Card.Body>

        <Card.Text as='div'>
          <div className='my-3'>
              <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#f8e825'}/>
          </div>
        </Card.Text>

        <Card.Text as='div'>
          <Row>
            <Col className='text-center'>
              <h3>{formatter.format(product.price)}</h3>
            </Col>

            <Col className="site-img">
              {product?.countInStock > 0 ? (<Badge bg="success">'In Stock'</Badge>) : (<Badge bg="danger">'Out of Stock'</Badge>)}
            </Col>
          </Row>       
        </Card.Text>

    </Card>
  )
}

export default Product