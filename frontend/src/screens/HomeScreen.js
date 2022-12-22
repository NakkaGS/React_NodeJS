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
            <div id='products'>

            {products?.length && (products.map(product => {
                
                return ( 
                    <div className='col' key={product._id}>
                        <NewProductCard product={product} />
                    </div>
                )
    
            })) }

            </div>

        </Row>
        <Banner />
    </div>
    
    )
}