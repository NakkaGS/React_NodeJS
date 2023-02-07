import React, { useState, useEffect } from 'react'

//React Redux
import {useDispatch, useSelector} from 'react-redux'

//Router Dom
import { useNavigate, useParams } from 'react-router-dom'

//Components
import Loader from '../components/Loader' //to have the Spinner in the page
import Message from '../components/Message' //to have the Error in the page

//Actions
import { listProductDetails, updateProduct } from '../actions/productActions'
import { listCategories } from '../actions/categoryActions'

//Constants
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'

function ProductEditScreen({ match }) {

    const dispatch = useDispatch()

    let history = useNavigate(); //for V6 it is useNavigate, NOT useHistory

    let { id } = useParams(match); //get the Product ID

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [description, setDescription] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [category, setCategory] = useState('Others')

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const productDetails = useSelector((state) => state.productDetails)
    const { loading, error, product } = productDetails

    const productUpdate = useSelector((state) => state.productUpdate)
    const { success : updateSuccess } = productUpdate

    const categoryList = useSelector(state => state.categoryList)
    const {error: errorCategory, loading: loadingCategory, categories} = categoryList 

    useEffect(() => {

        //it is to full fill the field as soon as we load the page
        if (userInfo.isadmin === false) {
            history('/login')
        } else {
            
            if (updateSuccess) {
                dispatch({ type: PRODUCT_UPDATE_RESET })
                history('/admin/product')
            } else {

                
                if(!product || !product?.name){
                    dispatch(listProductDetails(id))
                    dispatch(listCategories())
                }
    
                if(name !== product?.name || product?._id !== Number(id)){
                    setName(product?.name)
                    setPrice(product?.price)
                    setCountInStock(product?.countInStock)
                    setDescription(product?.description)
                    setCategory(product?.category?.name)
                }
            }
        }

    }, [dispatch, updateSuccess, id, history, product?.name]);

    const submitHandler = (e) => {
        e.preventDefault();

        const productEdited = {
            _id: product?._id,
            name: name,
            price: price,
            countInStock: countInStock,
            category: category
        };

        dispatch(updateProduct(productEdited));
    }

    return (
    <div className='profile container'>
        <div className="row d-flex">
                
                <div className="card p-3">
                    <h2 className='user-title'>Edit - Product</h2>
                    <form onSubmit={submitHandler}>
                        <input type="text" placeholder='Name' className='form-control mt-2' value={name} onChange={(e) => setName(e.target.value)} />
                        <input type="number" placeholder='Price' className='form-control mt-2' value={price} onChange={(e) => setPrice(e.target.value)} />
                        <input type="number" placeholder='Count in Stock' className='form-control mt-2' value={countInStock} onChange={(e) => setCountInStock(e.target.value)} />
                        <select className='form-control mt-2' value={category} onChange={(e) => setCategory(e.target.value)}>
                            {categories?.map(item=> {
                                return (
                                    <option key={item._id}>{item.name}</option>
                                )
                            })}
                        </select>
                        <textarea rows="4" type="text" placeholder='Description' className='form-control mt-2' value={description} onChange={(e) => setDescription(e.target.value)} />


                        <div className="d-flex align-items-end flex-column">
                            <button type='submit' className='mt-3 light'>Update</button>
                        </div>
                    </form>
                    
                </div>
        </div>
    </div>
    )
}

export default ProductEditScreen