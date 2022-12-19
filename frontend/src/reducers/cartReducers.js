import { 
    CART_ADD_ITEM,

} from '../constants/cartConstants'

export const cartReducer = (state = { cartItems:[] }, action) => {
    switch(action.type){
        case CART_ADD_ITEM:
        console.log(action)
        console.log(state.cartItems)
        //check if it already has a item with the same id and then just add the quantity
        const alreadyExist = state.cartItems.find(item => item._id == action.payload._id)
        console.log(alreadyExist)

        if(alreadyExist){
            console.log("it is here")
            return {
                ...state,
                //checks every position in the state
                cartItems : state.cartItems.map((item) => item._id == action.payload._id ? action.payload: item)
            }
        } else {

            console.log('it is else')
            return {
                ...state, //can only make copies of the original values, and then they can modify the copies.
                cartItems : [...state.cartItems, action.payload]
            }
        }
            
        default:
            return state;
    }
}