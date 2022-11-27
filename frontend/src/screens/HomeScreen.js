import React, {useEffect, useState} from 'react'

//Redux
import { useDispatch, useSelector } from 'react-redux' 
//useSelector - allows us to used certain parts of the state/reducer

//Actions
import { listProducts } from '../actions/productActions'

//Boostrap Components
import { Row, Col } from 'react-bootstrap'

//Components
import Product from '../components/Product'

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

    return(
    <div>
        <Row>

            {products?.length && (products.map(product => {
                return ( 
                    <div className='col-md-3 m-3 card p-2' key={product._id}>
                        <Product product={product} />
                    </div>
                )

            })) }
        </Row>
    </div>
    )
}