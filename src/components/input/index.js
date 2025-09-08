import React from 'react'
import './style.css'

const Input = ({lable,state,setState,placeholder,type}) => {
  return (
    <div className='input-wrapper'>
       <p className='lable-input'>{lable}</p>
       <input 
       type={type}
       value={state}
       placeholder={placeholder}
       onChange={(e)=> setState(e.target.value)}
       className='custom-input'
       />
    </div>
  )
}

export default Input