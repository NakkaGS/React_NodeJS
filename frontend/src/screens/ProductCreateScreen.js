//App.js->Route->RegisterScreen.js

import React, { useState, useEffect } from "react";

//Router
import { useNavigate } from "react-router-dom";

//Redux
import { useDispatch, useSelector } from "react-redux";
//useSelector - allows us to used certain parts of the state/reducer

//Actions
import { createProduct } from "../actions/productActions";

//Bootstrap Components
import { Form, Button } from "react-bootstrap";

//Components
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";

//Contants
import { PRODUCT_CREATE_RESET } from "../constants/productConstants";

function RegisterScreen() {

  //Initial State Empty (initializing fields)
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [countInStock, setCountInStock] = useState('')

  const dispatch = useDispatch();

  const productCreate = useSelector(state => state.productCreate)
  const { loading: loadingCreate, error: errorCreate, success: successCreate } = productCreate

  let history = useNavigate(); //for V6 it is useNavigate, NOT useHistory

  useEffect(() => {
    if (successCreate) {
        dispatch({ type: PRODUCT_CREATE_RESET })
        history('/')
    }
    }, [dispatch, successCreate, history]);

  //when the button is pressed, it executes this line
  const submitHandler = (e) => {
    e.preventDefault();
    const product = {
      name: name,
      price: price,
      countInStock: countInStock,
      description: description,
      category: category,
    };
    
    dispatch(createProduct(product));
  };

  return (
    <FormContainer>
      <h1>Create Product</h1>

      {loadingCreate ? 
        <Loader/> 
        : errorCreate 
            ? <Message variant='danger'>{errorCreate}</Message>
            : (
                <Form onSubmit={submitHandler}>
                    <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Enter Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    ></Form.Control>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="price">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                        required
                        type="number"
                        placeholder="Enter Price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    ></Form.Control>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="category">
                    <Form.Label>Category</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Enter setCategory"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    ></Form.Control>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Enter Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    ></Form.Control>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="countInStock">
                    <Form.Label>Stock</Form.Label>
                    <Form.Control
                        required
                        type="number"
                        placeholder="Enter Stock"
                        value={countInStock}
                        onChange={(e) => setCountInStock(e.target.value)}
                    ></Form.Control>
                    </Form.Group>

                    <Button type="submit" variant="primary">
                    Create Product
                    </Button>

                </Form>
            )}

    </FormContainer>
  );
}

export default RegisterScreen;
