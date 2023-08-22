import React from 'react'
import './Auth.css'

export default function Auth({title, children}) {
  return (
    <div className='auth-container'>
        <div className="card">
            <div className="card-title">
                <h2>{title}</h2>
            </div>
            <div className="card-body">
                {children}
            </div>
        </div>
    </div>
  )
}
