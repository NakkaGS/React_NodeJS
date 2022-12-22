import { createStore , combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import {    productListReducer, 
            productDetailsReducer, 
            productCreateReducer, } from './reducers/productReducers'

import { cartReducer } from './reducers/cartReducers'

import { userRegisterReducer, userLoginReducer } from './reducers/userReducer'

//every time that one of the items on the left is call (in the screen, component), it calls the reducer 
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    productCreate: productCreateReducer,
    
    cart: cartReducer,

    userRegister : userRegisterReducer,
    userLogin : userLoginReducer,

})

const cartItemsFromStorage =  localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []

const initialState = {
    cart : {cartItems: cartItemsFromStorage}
}

const store = createStore(reducer, initialState,
    composeWithDevTools(applyMiddleware(thunk))) //createStore is not been used anymore

export default store