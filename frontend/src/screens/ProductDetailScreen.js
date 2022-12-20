//App.js->Route->ProductScreen.js

import React, { useState, useEffect } from "react";

//Router
import { Link, useParams } from "react-router-dom"; //Library React Router Dom

//Redux
import { useDispatch, useSelector } from 'react-redux'

//Actions
import { listProductDetails } from '../actions/productActions' //this is the reducer
import { addToCart } from '../actions/cartActions' //this is the reducer

//Bootstrap Components
import { Row, Col, Image, ListGroup, Button, Card, Form } from "react-bootstrap"; //Library React Bootstrap

//Components
import Rating from "../components/Rating";
import Loader from '../components/Loader'
import Message from '../components/Message'

function ProductScreen({ match }) {

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });
  
  const [quantity, setQuantity] = useState(1)

  const dispatch = useDispatch()

  const productDetails = useSelector(state => state.productDetails)
  const { loading, error, product } = productDetails

  let { id } = useParams(match); //get the Product ID

  useEffect(() => {
    dispatch(listProductDetails(id))

  }, [dispatch, id, match])

  const addtoCardHandler = (e) => {
      e.preventDefault()
      dispatch(addToCart(product, quantity))
  }

  return(
    <div>
      <Link to="/" className="btn btn-light m-3">Go Back</Link>

      {loading ?
        <Loader/>
        : error
          ? <Message variant='danger'>{error}</Message>
          : (
            <div>
              <Row>
                <Col md={2} className="m-5">
                  <Image src={product?.image} alt={product?.name} fluid style={{maxWidth: 250}}/>
                  {/* //it was necessary to add '?' every time that we want to get a attribute from the product */}
                </Col>
      
                <Col md={3} className="mx-5 w-50 newfont">
                  <ListGroup variant="flush">

                    <ListGroup.Item>
                      <h3>{product?.name}</h3>
                    </ListGroup.Item>
        
                    <ListGroup.Item>
                    
                      <Rating value={Number(product.rating)} color={'#f8e825'} 
                        text={(product.numReviews) > 0 
                              ? (` ${Number(product?.numReviews)} reviews`) 
                              : typeof(product?.numReviews)=== 'undefined' 
                                ? (' 0 review') : (' 0 review')}  />
                    </ListGroup.Item>
        
                    <ListGroup.Item>
                      <p><strong>Price:</strong> {formatter.format(product.price)}</p>
                    </ListGroup.Item>
        
                    <ListGroup.Item>
                      <p><strong>Description:</strong> {product?.description}</p>
                    </ListGroup.Item>
                  </ListGroup>
                </Col>
        
                <Col md={2}>
                  <Card>
                    <ListGroup variant="flush">
                      <ListGroup.Item>
                        <Row>
                          <Col>
                            Price:
                          </Col>
        
                          <Col>
                            <strong>{formatter.format(product.price)}</strong>
                          </Col>
                        </Row>
                      </ListGroup.Item>
        
                      <ListGroup.Item>
                        <Row>
                          <Col>
                            Status:
                          </Col>
                          
                          <Col>
                            {product?.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                          </Col>
                        </Row>
                      </ListGroup.Item>

                      {product?.countInStock > 0 && (
                          <ListGroup.Item>
                            <Row>
                              <Col>Qty:</Col>
                              <Col xs='6' className='my-1'>

                              <Form.Control
                                  as='select'
                                  value={quantity} //it must have the same name as in the database attribute
                                  onChange={(e) => setQuantity(e.target.value)}
                                >
                                  {
                                    
                                    [...Array(product?.countInStock).keys()].map((x) => (
                                      <option key={x + 1} value={x + 1}>
                                        {x + 1}
                                      </option>
                                    ))
                                  }

                                </Form.Control>
                              </Col>
                            </Row>
                          </ListGroup.Item>
                        )                 
                      }
                      <ListGroup.Item>
                        <Button 
                          onClick={addtoCardHandler}
                          className='btn-block' 
                          disabled={product?.countInStock === 0 || product?.countInStock < 0} 
                          type='button'>
                          Add to Cart
                        </Button>
                      </ListGroup.Item>

                    </ListGroup>
                  </Card>
                </Col>
              </Row>

            </div>
          )
      }

    </div>
  )
};

export default ProductScreen;
