import React, { useState, useEffect } from 'react'

//Redux
import { useDispatch, useSelector } from 'react-redux'

//Actions
import { filterProducts } from '../actions/productActions'

//React Router Dom
import { Link } from 'react-router-dom'

//Components
import Rating from "../components/Rating";
import Loader from '../components/Loader' //to have the Spinner in the page
import Message from '../components/Message' //to have the Error in the page

//Actions
import { listCategories } from '../actions/categoryActions'

function Sidebar({productList}) {

    const [searchKey, setSearchKey] = useState('')
    const [sort, setSort] = useState('popular')
    const [category, setCategory] = useState('all')

    const dispatch = useDispatch()

    const categoryList = useSelector(state => state.categoryList)
    const {error, loading, categories} = categoryList 

    useEffect(() => {
        dispatch(listCategories())
    }, [dispatch])

    const openCloseSidebar = () => {
        // accordion variables
        const accordionBtn = document.querySelectorAll('[data-accordion-btn]');
        const accordion = document.querySelectorAll('[data-accordion]');

        for (let i = 0; i < accordionBtn.length; i++) {

            accordionBtn[i].addEventListener('click', function () {

                const clickedBtn = this.nextElementSibling.classList.contains('active');

                for (let i = 0; i < accordion.length; i++) {

                    if (clickedBtn) break;

                    if (accordion[i].classList.contains('active')) {

                        accordion[i].classList.remove('active');
                        accordionBtn[i].classList.remove('active');

                    }

                }

                this.nextElementSibling.classList.toggle('active');
                this.classList.toggle('active');

            }
        )}
    };
      
        return (
            <div className="sidebar has-scrollbar" data-mobile-menu>

                <div className="sidebar-category">

                    <div className="sidebar-top">
                        <h2 className="sidebar-title">Category</h2>
                        <button className="sidebar-close-btn" data-mobile-menu-close-btn>
                        <ion-icon name="close-outline" role="img" class="md hydrated" aria-label="close outline"></ion-icon>
                        </button>
                    </div>

                    <ul className="sidebar-menu-category-list">

                        <li className="sidebar-menu-category">
                        
                        <button className="sidebar-accordion-menu" onClick={openCloseSidebar} data-accordion-btn>

                            <div className="menu-title-flex">
                                <p className="menu-title">shop</p>
                            </div>

                            <div>
                                <ion-icon name="add-outline" class="add-icon md hydrated" role="img" aria-label="add outline"></ion-icon>
                                <ion-icon name="remove-outline" class="remove-icon md hydrated" role="img" aria-label="remove outline"></ion-icon>
                            </div>

                        </button>

                        <ul className="sidebar-submenu-category-list" data-accordion>
                            {categories?.map(category => {
                                return (
                                    <li className="sidebar-submenu-category" key={category._id}>
                                        {/* <button className="sidebar-submenu-title" onClick={() => {dispatch(filterProducts(searchKey, sort, String(category.name))) }}>
                                            <p className="product-name">{category.name}</p>
                                        </button> */}

                                        <a className="sidebar-submenu-title" href={`/category/${(category.name.toLowerCase())}`} >
                                            <p className="product-name">{category.name}</p>
                                        </a>
                                    </li>
                                )
                            })}

                        </ul>

                        </li>

                    </ul>

                </div>

                <div className="product-showcase">
                    <h3 className="showcase-heading">best sellers</h3>

                    <div className="showcase-wrapper">

                        <div className="showcase-container">
                        {loading ? 
                        <Loader/> 
                        : error 
                            ? <Message variant='danger'>{error}</Message>
                            : (
                            productList?.length && (productList.map(product => {
                            
                            return ( 
                            <div className="showcase" key={product._id}>

                                <Link to={`/product/${product._id}`} className="showcase-img-box">
                                    <img src={product?.image} alt="Top Products" className="showcase-img" width="75" height="75"></img>
                                </Link>

                                <div className="showcase-content">

                                    <Link to={`/product/${product._id}`} >
                                        <h4 className="showcase-title">{product?.name}</h4>
                                    </Link>

                                    <div className="showcase-rating">
                                        <Rating value={Number(product?.rating)} color={'#f8e825'} />
                                    </div>

                                    <div className="price-box">
                                        <p className="price-product">${product?.price}</p>
                                    </div>
                                
                                </div>

                            </div>
                            )
        
                        })))}

                        </div>

                    </div>
                </div>

            </div>
    )
}

export default Sidebar
