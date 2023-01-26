import React from 'react'

//Redux
import { useDispatch, useSelector } from 'react-redux'

//React Router Dom
import { Link } from 'react-router-dom'

function Footer() {
    const categoryList = useSelector(state => state.categoryList)
    const {error, loading, categories} = categoryList

    return (
        // Footer Navigation
        <footer>

            <div class="footer-nav">
                
                <div class="container">

                    {/* Categories */}
                    <ul class="footer-nav-list">

                        <li class="footer-nav-item">
                            <h2 class="nav-title">Popular Categories</h2>
                        </li>

                        {categories?.map(category => {
                            return(
                            <li class="footer-nav-item" key={category._id}>
                                <Link to={`/category/${(category.name.toLowerCase())}`} class="footer-nav-link">{category.name}</Link>
                            </li>
                            )
                        })}
                    
                    </ul>

                    {/* Our Company */}
                    <ul class="footer-nav-list">

                        <li class="footer-nav-item">
                            <h2 class="nav-title">Our Company</h2>
                        </li>

                        <li class="footer-nav-item">
                            <a href="#" class="footer-nav-link">about us</a>
                        </li>

                        <li class="footer-nav-item">
                            <a href="#" class="footer-nav-link">career</a>
                        </li>
                    
                    </ul>

                    {/* Services */}
                    <ul class="footer-nav-list">

                        <li class="footer-nav-item">
                            <h2 class="nav-title">Services</h2>
                        </li>

                        <li class="footer-nav-item">
                            <a href="#" class="footer-nav-link">Delivery</a>
                        </li>

                        <li class="footer-nav-item">
                            <a href="#" class="footer-nav-link">Legal Notice</a>
                        </li>

                        <li class="footer-nav-item">
                            <a href="#" class="footer-nav-link">terms and conditions</a>
                        </li>

                        <li class="footer-nav-item">
                            <a href="#" class="footer-nav-link">secure payment</a>
                        </li>
                    
                    </ul>

                    {/* Location, Phone, Email */}
                    <ul class="footer-nav-list">

                        <li class="footer-nav-list">
                            <h2 class="nav-title">Contact</h2>
                        </li>

                        {/* Location */}
                        <li class="footer-nav-item flex">
                            <div class="icon-box">
                            <ion-icon name="location-outline"></ion-icon>
                            </div>

                            <address class="content">
                            419 State 414 Retail
                            Beaver Dams, New York(NY), 14812, USA
                            </address>
                        </li>

                        {/* Phone */}
                        <li class="footer-nav-item flex">
                            <div class="icon-box">
                            <ion-icon name="call-outline"></ion-icon>
                            </div>

                            <a href="#" class="footer-nav-link">(607) 936-8058</a>
                        </li>

                        {/* Email */}
                        <li class="footer-nav-item flex">
                            <div class="icon-box">
                            <ion-icon name="mail-outline"></ion-icon>
                            </div>

                            <a href="mailto:example@email.com" class="footer-nav-link">example@email.com</a>
                        </li>
                    
                    </ul>

                    {/* Social Media */}
                    <ul class="footer-nav-list">

                        <li class="footer-nav-item">
                            <h2 class="nav-title">Follow Us</h2>
                        </li>

                        <li>

                            <ul class="social-link">

                                <li class="footer-nav-item">
                                    <a href="#" class="footer-nav-link">
                                    <ion-icon name="logo-facebook"></ion-icon>
                                    </a>
                                </li>

                                <li class="footer-nav-item">
                                    <a href="#" class="footer-nav-link">
                                    <ion-icon name="logo-twitter"></ion-icon>
                                    </a>
                                </li>

                                <li class="footer-nav-item">
                                    <a href="#" class="footer-nav-link">
                                    <ion-icon name="logo-linkedin"></ion-icon>
                                    </a>
                                </li>

                                <li class="footer-nav-item">
                                    <a href="#" class="footer-nav-link">
                                    <ion-icon name="logo-instagram"></ion-icon>
                                    </a>
                                </li>
                            
                            </ul>

                        </li>

                    </ul>
                    
                </div>
                
            </div>
            
        </footer>

    )
}

export default Footer