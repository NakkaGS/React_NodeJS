// Bottom Menu for Mobile

import React, { useEffect } from 'react'

//Redux
import { useSelector } from 'react-redux'

//React Router Dom
import { Link } from 'react-router-dom'

function MobileMenu() {

  const cart = useSelector(state=>state.cart)
  const { cartItems } = cart

  const openCloseMobileMenu = () => {

    // mobile menu variables
    const mobileMenuOpenBtn = document.querySelectorAll('[data-mobile-menu-open-btn]');
    const mobileMenu = document.querySelectorAll('[data-mobile-menu]');
    const mobileMenuCloseBtn = document.querySelectorAll('[data-mobile-menu-close-btn]');

    for (let i = 0; i < mobileMenuOpenBtn.length; i++) {
        
      const mobileMenuCloseFunc = function () {
        mobileMenu[i].classList.remove('active');
      }

      mobileMenuOpenBtn[i].addEventListener('click', function () {
        mobileMenu[i].classList.add('active');
      });

      mobileMenuCloseBtn[i].addEventListener('click', mobileMenuCloseFunc);

    }
  };

  useEffect(() => {
    openCloseMobileMenu();
  }, [openCloseMobileMenu])

  return (

    <div className="mobile-bottom-navigation">
      <button className="action-btn" onClick={openCloseMobileMenu()} data-mobile-menu-open-btn>
        <ion-icon name="menu-outline"></ion-icon>
      </button>

      <Link to={'./cart'} className="action-btn">
        <ion-icon name="bag-handle-outline"></ion-icon>
        <span className="count">{(typeof(cartItems) !== "undefined") && cartItems.length}</span>
      </Link>

      <Link to='./' className="action-btn">
        <ion-icon name="home-outline"></ion-icon>
      </Link>

    </div> 
  )
}

export default MobileMenu