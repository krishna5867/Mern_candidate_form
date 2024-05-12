import React from "react";

const CustomDropDown = ({ value, onChange }) => {

    return (
        <div className='flex flex-col gap-y-2 w-full sm:w-auto'>
            <label htmlFor="fileType">Type of File<span className='text-red-600'>*</span></label>
            <select
                id="fileType"
                name="fileType"
                value={value}
                onChange={onChange}
                className='border border-black p-2 rounded-md'>
                <option value="" disabled>Choose File Type</option>
                <option value="image">Image</option>
                <option value="pdf">PDF</option>
            </select>
            <span>(Image, pdf)</span>
        </div>
    );
};

export default CustomDropDown;
