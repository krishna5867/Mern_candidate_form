import React from 'react';
import { CustomDropDown, CustomFileUpload, CustomInputBox } from './static';
import { PlusIcon, TrashIcon } from '../assets';

const FileUpload = ({ formData, setFormData, errors, setErrors}) => {
    const { documents } = formData;

    const handleChange = (index, event) => {
        const { name, value } = event.target;
        const updatedDocuments = [...documents];

        if (name === "file") {
            const file = event.target.files[0];
            updatedDocuments[index][name] = file;
        } else {
            updatedDocuments[index][name] = value;
        }

        setFormData({
            ...formData,
            documents: updatedDocuments
        });

        setErrors(prevErrors => ({
            ...prevErrors,
            documents: prevErrors.documents.map((doc, i) => {
                if (i === index) {
                    return {
                        ...doc,
                        [name]: ''
                    };
                }
                return doc;
            })
        }));
    };

    const handleNewFile = () => {
        if (Array.isArray(documents) && documents.length < 5) {
            setFormData({
                ...formData,
                documents: [...documents, { fileName: '', fileType: '', file: '' }]
            });
        }
    };


    const handleDelete = (index) => {
        const updatedDocuments = [...documents];
        updatedDocuments.splice(index, 1);
        setFormData({ ...formData, documents: updatedDocuments });
    };

    return (
        <div>
            <p className='text-xl font-medium px-4 pt-10'>Upload Documents</p>
            {documents.map((input, index) => (
                <div key={index} className="inline-flex py-2 items-start md:items-center w-full md:w-auto">
                    <div className='flex md:flex-row flex-col w-full justify-start gap-x-4 px-4 mb-6 md:mb-0'>
                        <CustomInputBox
                            label="File Name"
                            type="text"
                            name="fileName"
                            value={input.fileName}
                            required={true}
                            onChange={(event) => handleChange(index, event)}
                            // error={errors?.documents && errors?.documents[index]}
                        />
                        <span>
                        </span>
                        {/* <CustomDropDown /> */}
                        <CustomDropDown
                            value={input.fileType}
                            onChange={(event) => handleChange(index, event)}

                        />
                        <div className='flex gap-x-2'>
                            <CustomFileUpload
                                type="file"
                                name="file"
                                value={formData.documents.file}
                                onChange={(event) => handleChange(index, event)}
                                // error={errors?.documents && errors?.documents[index]}
                            />
                            {index >= 2 && (
                                <div className='flex justify-center items-end md:items-center'>
                                    <button
                                    type="button"
                                        className='p-2 rounded-md flex items-end md:items-center justify-center border border-gray-300 bg-gray-200'
                                        onClick={() => handleDelete(index)}
                                    >
                                        <TrashIcon />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                    {index === 0 && documents.length < 5 && (
                        <button
                            className='p-2 mt-8 md:mt-0 mr-2 rounded-md bg-black flex items-center justify-center'
                            onClick={handleNewFile}
                            type="button"
                        >
                            <PlusIcon />
                        </button>
                    )}
                </div>
            ))}
        </div>
    );
};

export default FileUpload;



