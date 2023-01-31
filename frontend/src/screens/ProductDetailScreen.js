import React, { useState, useEffect } from "react";

//Router
import { Link, useParams, useNavigate } from "react-router-dom"; //Library React Router Dom

//Redux
import { useDispatch, useSelector } from 'react-redux'

//Actions
import { listProductDetails, deleteProduct } from '../actions/productActions' //this is the reducer
import { addToCart } from '../actions/cartActions' //this is the reducer

//Constant
import { PRODUCT_REVIEW_CREATE_RESET } from "../constants/productConstants";

//Bootstrap Components
import { Row, Col, Image, ListGroup, Button, Card, Form } from "react-bootstrap"; //Library React Bootstrap

//Components
import Rating from "../components/Rating";
import Loader from '../components/Loader'
import Message from '../components/Message'
import Review from '../components/Review'

function ProductScreen({ match }) {

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });
  
  const [quantity, setQuantity] = useState(1)

  const dispatch = useDispatch()

  let history = useNavigate(); //for V6 it is useNavigate, NOT useHistory

  const productDetails = useSelector(state => state.productDetails)
  const { loading, error, product } = productDetails

  const reviewCreate = useSelector(state => state.reviewCreate)
  const {error: errorReview, loading: loadingReview, success: successReview} = reviewCreate 
  
  const userLogin = useSelector(state=> state.productDetails)
  const { userInfo } = userLogin

  const { reviews } = product

  let { id } = useParams(match); //get the Product ID

  useEffect(() => {
    dispatch(listProductDetails(id))
  
    if (successReview) {
      dispatch({ type: PRODUCT_REVIEW_CREATE_RESET })
      dispatch(listProductDetails(id))
    }

  }, [dispatch, id, match, successReview])

  const addtoCardHandler = (e) => {
      e.preventDefault()
      dispatch(addToCart(product, quantity))
  }

  const deleteProductHandler = (e) => {
    e.preventDefault()
    dispatch(deleteProduct(product?._id))
    history('/')
  }

  return(
    <div className="container">
      <Link to="/" className="btn btn-light m-3">Go Back</Link>

      {loading ?
        <Loader/>
        : error
          ? <Message variant='danger'>{error}</Message>
          : (
            <div >
              <Row >
                <Col md={2} className="my-5">
                  <Image src={product?.image} alt={product?.name} fluid />
                  {/* //it was necessary to add '?' every time that we want to get a attribute from the product */}
                </Col>
      
                <Col md={6}>
                  <ListGroup variant="flush">

                    <ListGroup.Item>
                      <h3>{product?.name}</h3>
                      <h6>{product?.category.name}</h6>
                    </ListGroup.Item>
        
                    <ListGroup.Item>
                    
                      <Rating value={Number(product.rating)} color={'#f8e825'} 
                        text={(reviews?.length) > 0 
                              ? (` ${Number(reviews?.length)} reviews`) 
                              : typeof(reviews?.length)=== 'undefined' 
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
        
                <Col md={3}>
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
                      
                      <ListGroup.Item>
                        <Button 
                          onClick={deleteProductHandler}
                          className='btn-block'
                          disabled={userInfo}
                          type='button'>
                          Delete Product
                        </Button>
                      </ListGroup.Item>

                    </ListGroup>
                  </Card>
                </Col>
              </Row>
              <Row className="justify-content-center">
                <Col className="d-flex my-5 justify-content-center flex-wrap col-md-6">
                  <Review product={product}/>
                </Col>
                <Col>
                    <table className="table table-striped mt-5">
                        <thead>
                            <tr>
                                <th>User Name</th>
                                <th className='text-center'>Rating</th>
                                <th>Commenting</th>
                            </tr>
                        </thead>

                        <tbody>
                        {loading ? <Loader /> //it is to create the loadin and error view 
                            : error ? <Message variant='danger'>{error}</Message>
                            : 
                            (reviews?.length && (reviews.map(review=> {
                                return (
                                    
                                  <tr key={review?._id} className='cart-item'>
                                      <td>{review?.name}</td>
                                      <td className='text-center'>{review?.rating}</td>
                                      <td>{review?.comment}</td>
                                  </tr>
                                    
                                )
                            })))
                        }
                        </tbody>
                    </table>
                </Col>
              </Row>

            </div>
          )
      }

    </div>
  )
};

export default ProductScreen;
