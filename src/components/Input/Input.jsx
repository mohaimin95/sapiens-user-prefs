import React from 'react'
import "./Input.css";

export default function Input({ label, ...rest}) {
  return (
    <div className="form-element">
        <label htmlFor={rest.name}>{label}</label>
        <input id={rest.name} {...rest} />
    </div>
  )
}
