import axios from 'axios'

import { 
    CATEGORY_LIST_REQUEST,
    CATEGORY_LIST_SUCCESS,
    CATEGORY_LIST_FAIL,

} from '../constants/categoryConstants' //it is like enum in C


//////////////////////////////////////////////
export const listCategories = () => async (dispatch) => { //it is a action
    try {
        dispatch({ type: CATEGORY_LIST_REQUEST })
            const { data } = await axios.get(`/api/categories/getallcategories`)
            //console.log(data)

        dispatch({
            type: CATEGORY_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: CATEGORY_LIST_FAIL,
            payload: error.response && error.response.data.detail //if there a detail it show the detail, otherwise it shows the message set in 
                ? error.response.data.detail 
                : error.message,
        })
    }
}