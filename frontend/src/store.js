import { createStore , combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import {    productListReducer, 
            productCategoryReducer,
            productDetailsReducer, 
            productCreateReducer,
            productDeleteReducer,
            productUpdateReducer,

            reviewCreateReducer } from './reducers/productReducers'

import {    cartReducer } from './reducers/cartReducers'

import {    categoryCreateReducer, 
            categoryListReducer,
            categoryUpdateReducer,
            categoryDeleteReducer,
            categoryDetailsReducer } from './reducers/categoryReducers'

import {    userRegisterReducer, 
            userLoginReducer, 
            userUpdateProfileReducer, 
            userDetailsReducer,
            userUpdateReducer,
            userListReducer } from './reducers/userReducer'

import {    placeOrderReducer, 

            orderListMyReducer, 
            orderMyReducer, 
            
            orderListReducer } from './reducers/orderReducers'

//every time that one of the items on the left is call (in the screen, component), it calls the reducer 
const reducer = combineReducers({
    
    productList : productListReducer,
    productCategory : productCategoryReducer,
    productDetails : productDetailsReducer,
    productCreate : productCreateReducer,
    productDelete : productDeleteReducer,
    productUpdate :  productUpdateReducer,

    reviewCreate : reviewCreateReducer,
    
    cart: cartReducer,

    userRegister : userRegisterReducer,
    userLogin : userLoginReducer,
    userUpdateProfile : userUpdateProfileReducer,
    userDetails : userDetailsReducer,
    userList :  userListReducer,
    userUpdate : userUpdateReducer,
    
    placeOrder : placeOrderReducer,
    orderListMy : orderListMyReducer, //orders from the logged user
    orderList : orderListReducer, //orders for admin
    orderMy : orderMyReducer,

    categoryList : categoryListReducer,
    categoryCreate : categoryCreateReducer,
    categoryDetails :  categoryDetailsReducer,
    categoryUpdate : categoryUpdateReducer,
    categoryDelete : categoryDeleteReducer,

})

const cartItemsFromStorage =  localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []
const currentUser =  localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

const initialState = {
    cart : {cartItems: cartItemsFromStorage},
    userLogin : {userInfo: currentUser}
}

const store = createStore(reducer, initialState,
    composeWithDevTools(applyMiddleware(thunk))) //createStore is not been used anymore

export default store