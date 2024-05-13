import React from 'react';
import { CustomInputBox } from './static';

const Form = ({ formData, handleChange, errors }) => {
    return (
        <div className='grid md:grid-cols-2 md:gap-x-10 gap-y-4 px-4'>
            <CustomInputBox
                label="First Name"
                type="text"
                name="fname"
                placeholder="Enter your first name here..."
                value={formData.fname}
                onChange={handleChange}
                error={errors.fname}
            />
            <CustomInputBox
                label="Last Name"
                type="text"
                name="lname"
                placeholder="Enter your last name here..."
                value={formData.lname}
                onChange={handleChange}
                error={errors.lname}
            />
            <CustomInputBox
                label="E-mail"
                type="text"
                name="email"
                placeholder="Enter your email here..."
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
            />
            <div>
                <CustomInputBox
                    label="Date of Birth"
                    type="date"
                    name="dob"
                    placeholder="Enter DOB"
                    value={formData.dob}
                    onChange={handleChange}
                    error={errors.dob}
                />
                <p>(Min age should be 18 years)</p>
            </div>
        </div>
    );
};



export default Form