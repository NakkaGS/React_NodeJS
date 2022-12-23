import React, {useEffect} from 'react'

//Redux
import { useDispatch, useSelector } from 'react-redux' 
//useSelector - allows us to used certain parts of the state/reducer

//Actions
import { listProducts } from '../actions/productActions'

//Boostrap Components
import { Row } from 'react-bootstrap'

//Components
import Banner from '../components/Banner'
import NewProductCard from '../components/NewProductCard'
import Filter from '../components/Filter'
import Loader from '../components/Loader' //to have the Spinner in the page
import Message from '../components/Message' //to have the Error in the page

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
        <Filter/>
        <Row>
            <hr/>

            <h1 className='text-center mt-5'>Latest Products</h1>

            <div id='products'>
                
                {loading ? <Loader /> //it is to create the loadin and error view 
                    : error ? <Message variant='danger'>{error}</Message>
                    : (!loading && Object.keys(productList.products).length === 0) ? <Message variant='info'>No Products</Message> 
                    :
                        (products?.length && (products.map(product => {
                            
                            return ( 
                                <div className='col' key={product._id}>
                                    <NewProductCard product={product} />
                                </div>
                            )
                
                        })))
                    }

            </div>
            

        </Row>
        <Banner />
    </div>
    
    )
}