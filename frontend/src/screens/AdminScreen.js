import React from 'react'

function AdminScreen() {
  return (
    <div>
        <div className="container">
            <div className="admin-header">
                <ul className="menu">
                    <li><a href="/" className="active">Product List</a></li>
                    <li><a href="/">Create Product</a></li>
                    <li><a href="/">User List</a></li>
                    <li><a href="/">Product List</a></li>
                </ul>
            </div>
        </div>
    </div>
  )
}

export default AdminScreen