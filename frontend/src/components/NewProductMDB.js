import React from "react";

import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBIcon,
  MDBBtn,
  MDBRipple,
} from "mdb-react-ui-kit";

import { Link } from 'react-router-dom'

//Boostrap Components
import { Card, Row, Col, Badge } from 'react-bootstrap'

function NewProductMDB({ product }) { //take the product in HomeScreen
  return (
        <MDBCol>
          <MDBCard>
            <MDBRipple
              rippleColor="light"
              rippleTag="div"
              className="bg-image rounded hover-zoom"
            >
              <MDBCardImage
                src={product?.image}
                fluid
                className="mx-auto cardnktimage"
                
              />
              <Link to={`/product/${product._id}`}>
                <div className="mask">
                  <div className="d-flex justify-content-start align-items-end h-100">
                    <h5>
                        {product?.countInStock > 0 ? (<Badge bg="success">'In Stock'</Badge>) : (<Badge bg="danger">'Out of Stock'</Badge>)}
                    </h5>
                  </div>
                </div>
                <div className="hover-overlay">
                  <div
                    className="mask"
                    style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
                  ></div>
                </div>
              </Link>
            </MDBRipple>
            <MDBCardBody id="cardnkt">
              <Link to={`/product/${product._id}`}>
                <p className="title">{product?.name}</p>
              </Link>
              <br />
              <p className="category ">{product?.category}</p>
              <h3 className="mb-3">${product?.price}</h3>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
  );
}

export default NewProductMDB;