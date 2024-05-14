import React from 'react'
import { CustomInputBox } from './static';

const AddressInputs = ({ formData, setFormData, handleChange, errors }) => {
  
    const handleCheckBox = (e) => {
        const isChecked = e.target.checked;
        if(isChecked){
            setFormData(prevState => ({
                ...prevState,
                permanentAddress: {
                    ...prevState.residentalAddress 
                }
            }));
        }
    }

    return (
        <>
            <p className='text-xl font-semibold px-4 mt-4'>Residental Address</p>
            <div className='grid md:grid-cols-2 md:gap-x-10 gap-y-4 px-4'>
                <CustomInputBox
                    label="Street 1"
                    type="text"
                    name="residentalStreet1"
                    value={formData.residentalStreet1}
                    onChange={handleChange}
                    error={errors.residentalStreet1}
                />
                <CustomInputBox
                    label="Street 2"
                    type="text"
                    name="residentalStreet2"
                    value={formData.residentalStreet2}
                    onChange={handleChange}
                    error={errors.residentalStreet2}
                />
            </div>
            <div className='flex gap-x-2 p-4'>
                <input type="checkbox" id="add" name="add" className='w-6' onChange={handleCheckBox} />
                <label htmlFor="add" className='text-lg'>Same as Residental Address</label>
            </div>
            <p className='text-xl font-medium px-4 mt-4'>Permanent Address</p>
            <div className='grid md:grid-cols-2 md:gap-x-10 gap-y-4 px-4'>
                <CustomInputBox
                    label="Street 1"
                    type="text"
                    required={false}
                    name="permanentStreet1"
                    value={formData.permanentStreet1}
                    onChange={handleChange}
                />
                <CustomInputBox
                    label="Street 2"
                    type="text"
                    required={false}
                    name="permanentStreet2"
                    value={formData.permanentStreet2}
                    onChange={handleChange}
                />
            </div>
        </>
    )
}

export default AddressInputs
