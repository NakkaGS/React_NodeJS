import React, { useState } from 'react'

//React Rating Component
import Rating from 'react-rating'

//Redux
import { useDispatch } from 'react-redux'

//Actions
import { addProductReview } from '../actions/productActions'

function Review({ product }) {

    const dispatch = useDispatch()

    const [rating, setRating] = useState(5)
    const [comment, setComment] = useState("")

    const sendReview = (e) => {
        e.preventDefault()

        const review = {
            rating: rating,
            comment: comment,
        }
        dispatch(addProductReview(review, product))
    }

    return (
    <div>
        
        <h3>Give your Review</h3>

        <Rating
            style={{ color: "orange" }}
            initialRating={rating}
            emptySymbol="far fa-star fa-1x"
            fullSymbol="fas fa-star fa-1x"
            onChange={(e)=>{setRating(e)}}

        />

        <input type="text"className="form-control mt-2 col-md-10" value={comment} onChange={(e)=>{setComment(e.target.value)}} />
        <button className="btn btn-light mt-3" onClick={sendReview}>Submit Review</button>
    </div>
    )
}

export default Review