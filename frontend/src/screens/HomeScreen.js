import React, {useEffect, useState} from 'react'

//Redux
import { useDispatch, useSelector } from 'react-redux' 
//useSelector - allows us to used certain parts of the state/reducer

import {
    MDBContainer,
    MDBRow,
  } from "mdb-react-ui-kit";

//Actions
import { listProducts } from '../actions/productActions'

//Boostrap Components
import { Row, Col } from 'react-bootstrap'

//Components
import Product from '../components/Product'
import NewProductMDB from '../components/NewProductMDB'

export default function HomeScreen(){

    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const {error, loading, products} = productList 
    //separate the data from the productList

    //const [products, setProducts] = useState()

    useEffect(() => {

        dispatch(listProducts())
/*         console.log('Testing');
        axios.get('/api/products/getallproducts')
        .then(res=>{
            console.log(res);
            setProducts(res.data)
        }) .catch (err => {
            console.log(err)
        }) */
    }, [dispatch])

    const result = products.map(element => {
        return element + 1;
      });

    const check = Array.isArray(products)

    console.log(result); // 👉️ [2, 3, 4]

    return(
    <div>
        <MDBRow>
            {products?.length && (products.map(product => {
                
                return ( 
                    <div className='col-md-2 m-4' key={product._id}>
                        <NewProductMDB product={product} />
                    </div>
                )
    
            })) }

        </MDBRow>


    </div>
    )
}