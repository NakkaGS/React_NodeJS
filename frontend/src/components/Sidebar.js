import React, { useState } from 'react'

import Rating from "../components/Rating";

//Redux
import { useDispatch } from 'react-redux'

//Actions
import { filterProducts } from '../actions/productActions'

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

            console.log(accordionBtn[i])
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
        <div class="sidebar has-scrollbar" data-mobile-menu="">

            <div class="sidebar-category">

                <div class="sidebar-top">
                    <h2 class="sidebar-title">Category</h2>
                    <button class="sidebar-close-btn" data-mobile-menu-close-btn="">
                    <ion-icon name="close-outline" role="img" class="md hydrated" aria-label="close outline"></ion-icon>
                    </button>
                </div>

                <ul class="sidebar-menu-category-list">

                    <li class="sidebar-menu-category">
                    
                    <button class="sidebar-accordion-menu" onClick={openCloseSidebar} data-accordion-btn="">

                        <div class="menu-title-flex">
                            <p class="menu-title">shop</p>
                        </div>

                        <div>
                            <ion-icon name="add-outline" class="add-icon md hydrated" role="img" aria-label="add outline"></ion-icon>
                            <ion-icon name="remove-outline" class="remove-icon md hydrated" role="img" aria-label="remove outline"></ion-icon>
                        </div>

                    </button>

                    <ul class="sidebar-submenu-category-list" data-accordion="">

                        <li class="sidebar-submenu-category">
                            <button class="sidebar-submenu-title" onClick={() => {dispatch(filterProducts(searchKey, sort, 'fashion')) }}>
                                <p class="product-name">fashion</p>
                            </button>
                        </li>

                        <li class="sidebar-submenu-category">
                            <button class="sidebar-submenu-title" onClick={() => {dispatch(filterProducts(searchKey, sort, 'mobiles')) }}>
                                <p class="product-name">mobiles</p>
                            </button>
                        </li>

                        <li class="sidebar-submenu-category">
                            <button class="sidebar-submenu-title" onClick={() => {dispatch(filterProducts(searchKey, sort, 'electronics')) }}>
                                <p class="product-name">electronics</p>
                            </button>
                        </li>

                    </ul>

                    </li>


                </ul>

            </div>

            <div class="product-showcase">
                <h3 class="showcase-heading">best sellers</h3>

                <div class="showcase-wrapper">

                    <div class="showcase-container">

                        {(productList?.length && (productList.map(product => {
                        
                        return ( 
                        <div class="showcase">

                            <a href="#" class="showcase-img-box">
                                <img src={product?.image} alt="Top Products" class="showcase-img" width="75" height="75"></img>
                            </a>

                            <div class="showcase-content">

                                <a href="#">
                                    <h4 class="showcase-title">{product?.name}</h4>
                                </a>

                                <div class="showcase-rating">
                                    <Rating value={Number(product?.rating)} color={'#f8e825'} />
                                </div>

                                <div class="price-box">
                                    <p class="price-product">${product?.price}</p>
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
