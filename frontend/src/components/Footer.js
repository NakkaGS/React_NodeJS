import React from 'react'

//Redux
import { useSelector } from 'react-redux'

//React Router Dom
import { Link } from 'react-router-dom'

function Footer() {
    const categoryList = useSelector(state => state.categoryList)
    const {error, loading, categories} = categoryList

    return (
        // Footer Navigation
        <footer>

            <div className="footer-nav">
                
                <div className="container">

                    {/* Categories */}
                    <ul className="footer-nav-list">

                        <li className="footer-nav-item">
                            <h2 className="nav-title">Popular Categories</h2>
                        </li>

                        {categories?.map(category => {
                            return(
                            <li className="footer-nav-item" key={category._id}>
                                <Link to={`/category/${(category.name.toLowerCase())}`} className="footer-nav-link">{category.name}</Link>
                            </li>
                            )
                        })}
                    
                    </ul>

                    {/* Our Company */}
                    <ul className="footer-nav-list">

                        <li className="footer-nav-item">
                            <h2 className="nav-title">Our Company</h2>
                        </li>

                        <li className="footer-nav-item">
                            <a href="#" className="footer-nav-link">about us</a>
                        </li>

                        <li className="footer-nav-item">
                            <a href="#" className="footer-nav-link">career</a>
                        </li>
                    
                    </ul>

                    {/* Services */}
                    <ul className="footer-nav-list">

                        <li className="footer-nav-item">
                            <h2 className="nav-title">Services</h2>
                        </li>

                        <li className="footer-nav-item">
                            <a href="#" className="footer-nav-link">Delivery</a>
                        </li>

                        <li className="footer-nav-item">
                            <a href="#" className="footer-nav-link">Legal Notice</a>
                        </li>

                        <li className="footer-nav-item">
                            <a href="#" className="footer-nav-link">terms and conditions</a>
                        </li>

                        <li className="footer-nav-item">
                            <a href="#" className="footer-nav-link">secure payment</a>
                        </li>
                    
                    </ul>

                    {/* Location, Phone, Email */}
                    <ul className="footer-nav-list">

                        <li className="footer-nav-list">
                            <h2 className="nav-title">Contact</h2>
                        </li>

                        {/* Location */}
                        <li className="footer-nav-item flex">
                            <div className="icon-box">
                            <ion-icon name="location-outline"></ion-icon>
                            </div>

                            <address className="content">
                            419 State 414 Retail
                            Beaver Dams, New York(NY), 14812, USA
                            </address>
                        </li>

                        {/* Phone */}
                        <li className="footer-nav-item flex">
                            <div className="icon-box">
                            <ion-icon name="call-outline"></ion-icon>
                            </div>

                            <a href="#" className="footer-nav-link">(607) 936-8058</a>
                        </li>

                        {/* Email */}
                        <li className="footer-nav-item flex">
                            <div className="icon-box">
                            <ion-icon name="mail-outline"></ion-icon>
                            </div>

                            <a href="mailto:example@email.com" className="footer-nav-link">example@email.com</a>
                        </li>
                    
                    </ul>

                    {/* Social Media */}
                    <ul className="footer-nav-list">

                        <li className="footer-nav-item">
                            <h2 className="nav-title">Follow Us</h2>
                        </li>

                        <li>

                            <ul className="social-link">

                                <li className="footer-nav-item">
                                    <a href="#" className="footer-nav-link">
                                    <ion-icon name="logo-facebook"></ion-icon>
                                    </a>
                                </li>

                                <li className="footer-nav-item">
                                    <a href="#" className="footer-nav-link">
                                    <ion-icon name="logo-twitter"></ion-icon>
                                    </a>
                                </li>

                                <li className="footer-nav-item">
                                    <a href="#" className="footer-nav-link">
                                    <ion-icon name="logo-linkedin"></ion-icon>
                                    </a>
                                </li>

                                <li className="footer-nav-item">
                                    <a href="#" className="footer-nav-link">
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