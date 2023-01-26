import React, { useEffect } from 'react'

//Redux
import { useDispatch, useSelector } from 'react-redux' 

//Router
import { useParams, useNavigate } from "react-router-dom"; //Library React Router Dom

//Actions
import { categoryProducts, listProducts } from '../actions/productActions'

//Components
import Loader from '../components/Loader' //to have the Spinner in the page
import Message from '../components/Message' //to have the Error in the page

//Components by me Nakata
import ProductSection from '../components/ProductSection'
import Sidebar from '../components/Sidebar'

export default function ProductCategoryScreen({ match }){

    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const {error, loading, products} = productList 

    const productCategory = useSelector(state => state.productCategory)
    const {error: errorCategory, loading: loadingCategory, products: productsByCategory} = productCategory 

    let { category } = useParams(match); //get the Product ID

    useEffect(() => {
        dispatch(categoryProducts(category))
        dispatch(listProducts())
    }, [dispatch])

    return(
    <div>
        <div className="product-container">

            <div className="container">
                <div className="sidebar has-scrollbar" data-mobile-menu="">
                    <Sidebar productList={productList.products}/>
                </div>

                <div className='product-box'>
                    
                    {loading ? <Loader /> //it is to create the loadin and error view 
                        : error ? <Message variant='danger'>{error}</Message>
                        : (!loading && Object.keys(productsByCategory).length === 0) ? <Message variant='info'>No Products</Message> 
                        : (
                            
                            <ProductSection productList={productsByCategory} />

                        )

                        }

                </div>
                
            </div>
        </div>

    </div>
    
    )
}