import React, { useState } from 'react'

//Redux
import { useDispatch } from 'react-redux'

//Actions
import { filterProducts } from '../actions/productActions'

//React Router Dom
import { Link } from 'react-router-dom'

//Components
import Rating from "../components/Rating";

function Sidebar({productList}) {

    const [searchKey, setSearchKey] = useState('')
    const [sort, setSort] = useState('popular')
    const [category, setCategory] = useState('all')

    const dispatch = useDispatch()

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

        });

}
      };
      
    return (
        <div className="sidebar has-scrollbar" data-mobile-menu="">

            <div className="sidebar-category">

                <div className="sidebar-top">
                    <h2 className="sidebar-title">Category</h2>
                    <button className="sidebar-close-btn" data-mobile-menu-close-btn="">
                    <ion-icon name="close-outline" role="img" class="md hydrated" aria-label="close outline"></ion-icon>
                    </button>
                </div>

                <ul className="sidebar-menu-category-list">

                    <li className="sidebar-menu-category">
                    
                    <button className="sidebar-accordion-menu" onClick={openCloseSidebar} data-accordion-btn="">

                        <div className="menu-title-flex">
                            <p className="menu-title">shop</p>
                        </div>

                        <div>
                            <ion-icon name="add-outline" class="add-icon md hydrated" role="img" aria-label="add outline"></ion-icon>
                            <ion-icon name="remove-outline" class="remove-icon md hydrated" role="img" aria-label="remove outline"></ion-icon>
                        </div>

                    </button>

                    <ul className="sidebar-submenu-category-list" data-accordion="">

                        <li className="sidebar-submenu-category">
                            <button className="sidebar-submenu-title" onClick={() => {dispatch(filterProducts(searchKey, sort, 'fashion')) }}>
                                <p className="product-name">fashion</p>
                            </button>
                        </li>

                        <li className="sidebar-submenu-category">
                            <button className="sidebar-submenu-title" onClick={() => {dispatch(filterProducts(searchKey, sort, 'mobiles')) }}>
                                <p className="product-name">mobiles</p>
                            </button>
                        </li>

                        <li className="sidebar-submenu-category">
                            <button className="sidebar-submenu-title" onClick={() => {dispatch(filterProducts(searchKey, sort, 'electronics')) }}>
                                <p className="product-name">electronics</p>
                            </button>
                        </li>

                    </ul>

                    </li>


                </ul>

            </div>

            <div className="product-showcase">
                <h3 className="showcase-heading">best sellers</h3>

                <div className="showcase-wrapper">

                    <div className="showcase-container">

                        {(productList?.length && (productList.map(product => {
                        
                        return ( 
                        <div className="showcase">

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
