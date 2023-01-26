// Left Menu that shows after click on the Bottom Menu for Mobile

import React, { useEffect } from 'react'

//Redux
import { useSelector } from 'react-redux'

//React Router Dom
import { Link } from 'react-router-dom'


function MobileLeftMenu() {

    const categoryList = useSelector(state => state.categoryList)
    const {error, loading, categories} = categoryList

    const openCloseLeftMenu = () => {
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

    useEffect(() => {
        openCloseLeftMenu();
    }, [openCloseLeftMenu])
    
    return (
        
        <nav className="mobile-navigation-menu has-scrollbar" data-mobile-menu>

            {/* Sidemenu Mobile - Top Part */}
            <div className="menu-top">
                <h2 className="menu-title">Menu</h2>
                <button className="menu-close-btn" data-mobile-menu-close-btn>
                <ion-icon name="close-outline"></ion-icon>
                </button>
            </div>

            {/* Sidemenu Mobile - Middle Part */}
            <ul className="mobile-menu-category-list">

                {/* Home */}
                <li className="menu-category">
                <a href="#" className="menu-title">Home</a>
                </li>

                {/* Mens */}
                <li className="menu-category">

                <button className="accordion-menu" onClick={openCloseLeftMenu()} data-accordion-btn>
                    <p className="menu-title">Category</p>

                    <div>
                    <ion-icon name="add-outline" class="add-icon"></ion-icon>
                    <ion-icon name="remove-outline" class="remove-icon"></ion-icon>
                    </div>

                </button>               

                <ul className="submenu-category-list" data-accordion>

                    {categories?.map(category => {
                        return(
                        <li className="submenu-category" key={category._id}>
                            <a href={`/category/${(category.name.toLowerCase())}`} className="submenu-title">{category.name}</a>
                        </li>
                        )
                    })}

                </ul>

                </li>

                {/* Blog */}
                <li className="menu-category">
                <a href="#" className="menu-title">Blog</a>
                </li>

                {/* Hot Offers */}
                <li className="menu-category">
                <a href="#" className="menu-title">Hot Offers</a>
                </li>

            </ul>

            {/* Sidemenu Mobile - Bottom Part */}
            <div className="menu-bottom">

                {/* Sidemenu Mobile - Menu Social Media */}
                <ul className="menu-social-container">
                <li>
                    <a href="#" className="social-link">
                    <ion-icon name="logo-facebook"></ion-icon>
                    </a>
                </li>
                
                <li>
                    <a href="#" className="social-link">
                    <ion-icon name="logo-twitter"></ion-icon>
                    </a>
                </li>

                <li>
                    <a href="#" className="social-link">
                    <ion-icon name="logo-instagram"></ion-icon>
                    </a>
                </li>

                </ul>

            </div>

        </nav>
    )
}

export default MobileLeftMenu