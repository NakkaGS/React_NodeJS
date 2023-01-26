// Left Menu that shows after click on the Bottom Menu for Mobile

import React from 'react'

function LeftMenu() {
    
    return (
        
        <nav class="mobile-navigation-menu has-scrollbar" data-mobile-menu>

        {/* Sidemenu Mobile - Top Part */}
        <div class="menu-top">
            <h2 class="menu-title">Menu</h2>
            <button class="menu-close-btn" data-mobile-menu-close-btn>
            <ion-icon name="close-outline"></ion-icon>
            </button>
        </div>

        {/* Sidemenu Mobile - Middle Part */}
        <ul class="mobile-menu-category-list">

            {/* Home */}
            <li class="menu-category">
            <a href="#" class="menu-title">Home</a>
            </li>

            {/* Mens */}
            <li class="menu-category">

            <button class="accordion-menu" data-accordion-btn>
                <p class="menu-title">Men's</p>

                <div>
                <ion-icon name="add-outline" class="add-icon"></ion-icon>
                <ion-icon name="remove-outline" class="remove-icon"></ion-icon>
                </div>

            </button>

            <ul class="submenu-category-list" data-accordion>

                <li class="submenu-category">
                <a href="#" class="submenu-title">Shirt</a>
                </li>

                <li class="submenu-category">
                <a href="#" class="submenu-title">Shorts & Jeans</a>
                </li>

                <li class="submenu-category">
                <a href="#" class="submenu-title">Safety Shoes</a>
                </li>
                
                <li class="submenu-category">
                <a href="#" class="submenu-title">Wallet</a>
                </li>

            </ul>

            </li>

            {/* Blog */}
            <li class="menu-category">
            <a href="#" class="menu-title">Blog</a>
            </li>

            {/* Hot Offers */}
            <li class="menu-category">
            <a href="#" class="menu-title">Hot Offers</a>
            </li>

        </ul>

        {/* Sidemenu Mobile - Bottom Part */}
        <div class="menu-bottom">

            {/* Sidemenu Mobile - Menu Social Media */}
            <ul class="menu-social-container">
            <li>
                <a href="#" class="social-link">
                <ion-icon name="logo-facebook"></ion-icon>
                </a>
            </li>
            
            <li>
                <a href="#" class="social-link">
                <ion-icon name="logo-twitter"></ion-icon>
                </a>
            </li>

            <li>
                <a href="#" class="social-link">
                <ion-icon name="logo-instagram"></ion-icon>
                </a>
            </li>

            </ul>

        </div>

        </nav>
    )
}

export default LeftMenu