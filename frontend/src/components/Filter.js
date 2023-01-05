import React, { useState } from 'react'

//Redux
import { useDispatch } from 'react-redux' 

//Actions
import { filterProducts } from '../actions/productActions'

function Filter() {

    const [searchKey, setSearchKey] = useState('')
    const [sort, setSort] = useState('popular')
    const [category, setCategory] = useState('all')

    const dispatch = useDispatch()

    return (
        <div>
            <div className='d-flex justify-content-center flex-wrap align-items-center'>
                <div className="col-m-2">
                    <input value={searchKey} onChange={(e) => setSearchKey(e.target.value)} type="text" placeholder='search products' className='form-control'/>
                </div>
                <div className="col-md-2 m-2">
                    <select className='form-control' value={sort} onChange={(e) => setSort(e.target.value)}>
                        <option value='popular'>Popular</option>
                        <option value='htl'>High to Low</option>
                        <option value='lth'>Low to High</option>
                    </select>
                </div>

                <div className="col-md-2 m-2">
                    <select className='form-control' value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value="all">All</option>
                        <option value="electronics">Electronics</option>
                        <option value="fashion">Fashion</option>
                        <option value="mobiles">Mobiles</option>
                        <option value="games">Games</option>
                    </select>
                </div>
                
                <div className="col-md-2 m-3">
                    <button className='btn btn-light' onClick={() => {dispatch(filterProducts(searchKey, sort, category)) }} >Filter</button>
                </div>

                
            </div>
        </div>
    )
}

export default Filter