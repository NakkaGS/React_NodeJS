import { 
    CART_ADD_ITEM, 
    CART_REMOVE_ITEM, 
    CART_CLEAR_ITEMS

} from '../constants/cartConstants'

//////////////////////////////////////////////
export const cartReducer = (state = { cartItems:[] }, action) => {
    switch(action.type){

        case CART_ADD_ITEM:
            //check if it already has a item with the same id and then just add the quantity
            const alreadyExist = state.cartItems.find(item => item?._id === action?.payload._id)

            if(alreadyExist){
                return {
                    ...state,
                    //checks every position in the state
                    cartItems : state.cartItems.map((item) => item._id === action.payload._id ? action.payload: item)
                }
            } else {

            return {
                ...state, //can only make copies of the original values, and then they can modify the copies.
                cartItems : [...state.cartItems, action.payload]
            }
        }

        case CART_REMOVE_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter(item => {return item._id !== action.payload._id})
            }
            
        case CART_CLEAR_ITEMS:
            return {}

        default:
            return state;
    }
}