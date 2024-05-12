import React, { useState } from 'react'
import axios from "axios";
import { FormInputs, AddressInputs, FileUploadInputs, SuccessMsg } from "./index"
import { Button, } from './static';

const CandidateForm = () => {
    const [apiResonseMsg, setApiResponseMsg] = useState("");
    console.log(apiResonseMsg);
    const [success, setSuccess] = useState(false);

    const [formData, setFormData] = useState({
        fname: "",
        lname: "",
        email: "",
        dob: "",
        residentalAddress: {
            street1: "",
            street2: "",
        },
        permanentAddress: {
            street1: "",
            street2: "",
        },
        documents: [
            {
                fileName: "",
                fileType: "",
                file: null
            },
            {
                fileName: "",
                fileType: "",
                file: null
            },
        ]
    });
    console.log(formData);
    const [errors, setErrors] = useState({
        fname: '',
        lname: '',
        email: '',
        dob: '',
        residentalAddress: {
            street1: "",
            street2: "",
        },
        permanentAddress: {
            street1: "",
            street2: "",
        },
        documents: [
            {
                fileName: "",
                fileType: "",
                file: ""
            },
            {
                fileName: "",
                fileType: "",
                file: ""
            },
        ]
    });
    // console.log(errors);

    const validateForm = () => {
        let validation = true;
        const newErrors = { ...errors };

        // eslint-disable-next-line no-useless-escape
        const emailRegex = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,})$/;

        if (!formData.fname.trim()) {
            newErrors.fname = 'First Name is required';
            validation = false;
        }
        if (!formData.lname.trim()) {
            newErrors.lname = 'Last Name is required';
            validation = false;
        }
        if (!formData.email.trim()) {
            validation = false;
            newErrors.email = "Email is required";
        } else if (formData.email && !emailRegex.test(formData.email.trim())) {
            validation = false;
            newErrors.email = "Invalid email";
        }
        if (!formData.dob.trim()) {
            newErrors.dob = 'DOB is required';
            validation = false;
        } else {
            const dobDate = new Date(formData.dob);
            const currentDate = new Date();
            let ageDiff = currentDate.getFullYear() - dobDate.getFullYear();
            const dobMonthDiff = currentDate.getMonth() - dobDate.getMonth();

            if (dobMonthDiff < 0 || (dobMonthDiff === 0 && currentDate.getDate() < dobDate.getDate())) {
                ageDiff--;
            }

            if (ageDiff < 18) {
                newErrors.dob = 'You must be at least 18 years old';
                validation = false;
            }
        }

        if (!formData.residentalAddress.street1.trim()) {
            newErrors.residentalAddress.street1 = 'Residential address is required';
            validation = false;
        }
        if (!formData.residentalAddress.street2.trim()) {
            newErrors.residentalAddress.street2 = 'Residential address is required';
            validation = false;
        }

        if (formData.documents.length < 2) {
            newErrors.documents = 'At least two documents are required';
            validation = false;
        } else {
            formData.documents.forEach((document, index) => {
                if (!document.fileName.trim() || !document.fileType || !document.file) {
                    newErrors.documents[index] = 'All fields are required for document ' + (index + 1);
                    validation = false;
                } else {
                    // Clear the error message if the document is valid
                    newErrors.documents[index] = '';
                }
            });
        }

        setErrors(newErrors);
        return validation;
    };

    const handleChange = (e) => {
        const { name, value, files, file } = e.target;
        console.log(files);
        console.log(file);

        if (files) {
            const file = files[0]; 
            const index = parseInt(name.split('file')[1]) - 1; 

            // Update the file in the documents array
            setFormData(prevState => {
                const newDocuments = [...prevState.documents];
                newDocuments[index] = {
                    ...newDocuments[index],
                    file: file
                };
                return {
                    ...prevState,
                    documents: newDocuments
                };
            });
        } else if (name.includes('residentalAddress') || name.includes('permanentAddress')) {
            const [addressType, addressField] = name.split('.');
            setFormData(prevState => ({
                ...prevState,
                [addressType]: {
                    ...prevState[addressType],
                    [addressField]: value
                }
            }));
        } else {
            setFormData(prevState => ({
                ...prevState,
                [name]: value
            }));

            setErrors(prevErrors => ({
                ...prevErrors,
                [name]: ''
            }));
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            const { fname, lname, email, dob, residentalAddress, permanentAddress, documents } = formData;
            const userData = {
                fname,
                lname,
                email,
                dob,
                residentalAddress,
                permanentAddress,
                documents
            };
            const res = await axios.post("http://localhost:4000/api/v1/form", userData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );
            const data = res.data;
            setApiResponseMsg(res.data.message);
            setSuccess(true)
            setTimeout(() => {
                setSuccess(false);
            }, 1500);
            console.log("Response:", data);
        } catch (error) {
            console.error("Error:", error);
            setApiResponseMsg(error.message);

        }
    }
    return (
        <div className='max-w-5xl mx-auto'>
            {/* {success && (
            <SuccessMsg message={apiResonseMsg} />
        )} */}
            <h1 className="text-black font-bold text-2xl text-center py-10">MERN STACK MACHINE TEST</h1>
            <form onSubmit={handleSubmit}>
                <FormInputs formData={formData} handleChange={handleChange} errors={errors} />
                <AddressInputs formData={formData} handleChange={handleChange} errors={errors} />
                <FileUploadInputs formData={formData} setFormData={setFormData} errors={errors} />
                <Button />
            </form>
        </div>
    )
}

export default CandidateForm