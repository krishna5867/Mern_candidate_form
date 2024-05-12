import React from 'react';
import { FileUploadIcon } from "../../assets/index";

const CustomFileUpload = ({ value, onChange, name, error }) => {

    return (
        <div className='flex flex-col gap-y-2 w-full sm:w-auto'>
            <label htmlFor={name}>Upload Document<span className='text-red-600'>*</span></label>
            <div className='relative'>
                <input
                    type="file"
                    id={name}
                    name={name}
                    placeholder="Choose File"
                    className='p-2 rounded-md z-50 relative w-full border border-black'
                    onChange={onChange}
                    value={value}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <FileUploadIcon />
                </div>
            </div>
            {error && <p className="text-red-600">{error}</p>}
        </div>
    );
};

export default CustomFileUpload;



