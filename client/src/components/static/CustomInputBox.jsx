import React from 'react'

const CustomInputBox = ({ name, label, type, value, placeholder, onChange, required = "true", error }) => {
  return (
    <div className='flex flex-col gap-y-2 w-auto'>
      <label htmlFor={name}>{label}{required ? <span className='text-red-600'>*</span> : null}</label>
      <input type={type} id={name} name={name} placeholder={placeholder} value={value} onChange={onChange} className='border border-black p-2 rounded-md' />
      {error && <p className='text-red-600'>{error}</p>}
    </div>
  )
}

export default CustomInputBox