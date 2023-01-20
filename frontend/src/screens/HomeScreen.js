import React, {useEffect} from 'react'

//Redux
import { useDispatch, useSelector } from 'react-redux' 
//useSelector - allows us to used certain parts of the state/reducer

//Actions
import { listProducts } from '../actions/productActions'

//Components
import Banner from '../components/Banner'
import Loader from '../components/Loader' //to have the Spinner in the page
import Message from '../components/Message' //to have the Error in the page

//Components by me Nakata
import ProductSection from '../components/ProductSection'
import Sidebar from '../components/Sidebar'

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
        <div className="product-container">

            <div className="container">
                <div className="sidebar has-scrollbar" data-mobile-menu="">
                    <Sidebar productList={productList.products}/>
                </div>

                <div className='product-box'>
                    
                    {loading ? <Loader /> //it is to create the loadin and error view 
                        : error ? <Message variant='danger'>{error}</Message>
                        : (!loading && Object.keys(productList.products).length === 0) ? <Message variant='info'>No Products</Message> 
                        :
                            <ProductSection productList={productList.products} />
                        }

                </div>
                
            </div>
        </div>



            

        <Banner />
    </div>
    
    )
}