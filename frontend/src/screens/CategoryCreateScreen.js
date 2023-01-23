import React, { useState, useEffect } from "react";

//Router
import { useNavigate } from "react-router-dom";

//Bootstrap Components
import { Form, Button } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";

//Components
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";

//Contants
import { CATEGORY_CREATE_RESET } from "../constants/categoryConstants";

//Actions
import { createCategory } from '../actions/categoryActions'

function CategoryCreateScreen() {

    //Initial State Empty (initializing fields)
    const [name, setName] = useState('')

    const history = useNavigate();

    const dispatch = useDispatch();

    const categoryCreate = useSelector(state => state.categoryCreate)
    const { loading: loadingCreate, error: errorCreate, success: successCreate } = categoryCreate
  
    const userLogin = useSelector((state)=> state.userLogin)
    const{ userInfo } = userLogin

    useEffect(() => {
        if (successCreate) {
            dispatch({ type: CATEGORY_CREATE_RESET })
            history('/category')
        }
        }, [dispatch, successCreate, history]);

    //when the button is pressed, it executes this line
    const submitHandler = (e) => {
        e.preventDefault();
        const category = {
            name: name,
        };

        dispatch(createCategory(category));

    };

    return (
        <div className="create-category">
            <FormContainer>
                <h1 className="create-category-title">Create Product</h1>
        
                {errorCreate && <Message variant='danger'>{errorCreate}</Message>}

                <Form onSubmit={submitHandler}>
                    <Form.Group className="mb-2" controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Enter Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    ></Form.Control>
                    </Form.Group>

                    <div className="create-submit-btn">
                        <Button type="submit" variant="primary">
                        Create Category
                        </Button>
                    </div>

                </Form>
        
                </FormContainer>
  
        </div>
    )
}

export default CategoryCreateScreen