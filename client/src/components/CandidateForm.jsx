import React, { useState } from "react";
import axios from "axios";
import { FormInputs, AddressInputs, FileUploadInputs } from "./index";
import { Button } from "./static";
import { toast } from "react-toastify";

const CandidateForm = () => {

  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    dob: "",
    residentalStreet1: "",
    residentalStreet2: "",
    permanentStreet1: "",
    permanentStreet2: "",
    documents: [
      {
        fileName: "",
        fileType: "",
        file: null,
      },
      {
        fileName: "",
        fileType: "",
        file: null,
      },
    ],
  });

  const [errors, setErrors] = useState({
    fname: "",
    lname: "",
    email: "",
    dob: "",
    residentalStreet1: " ",
    residentalStreet2: " ",
    permanentStreet1: " ",
    permanentStreet2: " ",
    documents: [
      {
        fileName: "",
        fileType: "",
        file: "",
      },
      {
        fileName: "",
        fileType: "",
        file: "",
      },
    ],
  });

  const validateForm = () => {
    let validation = true;
    const newErrors = { ...errors };

    // eslint-disable-next-line no-useless-escape
    const emailRegex = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,})$/;

    if (!formData.fname.trim()) {
      newErrors.fname = "First Name is required";
      validation = false;
    }
    if (!formData.lname.trim()) {
      newErrors.lname = "Last Name is required";
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
      newErrors.dob = "DOB is required";
      validation = false;
    } else {
      const dobDate = new Date(formData.dob);
      const currentDate = new Date();
      let ageDiff = currentDate.getFullYear() - dobDate.getFullYear();
      const dobMonthDiff = currentDate.getMonth() - dobDate.getMonth();

      if (
        dobMonthDiff < 0 ||
        (dobMonthDiff === 0 && currentDate.getDate() < dobDate.getDate())
      ) {
        ageDiff--;
      }

      if (ageDiff < 18) {
        newErrors.dob = "You must be at least 18 years old";
        validation = false;
      }
    }

    if (!formData.residentalStreet1.trim()) {
      newErrors.residentalStreet1 = "Residential address is required";
      validation = false;
    }
    if (!formData.residentalStreet2.trim()) {
      newErrors.residentalStreet2 = "Residential address is required";
      validation = false;
    }

    if (formData.documents.length < 2) {
      newErrors.documents = "At least two documents are required";
      validation = false;
    } else {
      formData.documents.forEach((document, index) => {
        if (!document.fileName.trim() || !document.fileType || !document.file) {
          newErrors.documents[index] =
            "All fields are required for document " + (index + 1);
          validation = false;
        } else {
          newErrors.documents[index] = "";
        }
      });
    }

    setErrors(newErrors);
    return validation;
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  }


  // Function to flatten nested objects
  const flattenObject = (obj, prefix = "") => {
    return Object.keys(obj).reduce((acc, key) => {
      const propName = prefix ? `${prefix}.${key}` : key;
      if (typeof obj[key] === "object" && obj[key] !== null) {
        Object.assign(acc, flattenObject(obj[key], propName));
      } else {
        acc[propName] = obj[key];
      }
      return acc;
    }, {});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const formDataToSend = { ...formData };

      const flattenedData = flattenObject(formDataToSend);

      const formDataWithFiles = new FormData();

      for (const key in flattenedData) {
        formDataWithFiles.append(key, flattenedData[key]);
      }

      formData.documents.forEach((document, index) => {
        formDataWithFiles.append(`file`, document.file);

      });

      const res = await axios.post("http://localhost:4000/api/v1/form", formDataWithFiles);
      const data = res.data;
      toast.success(data.message);

      // clear formData
      setFormData({
        fname: "",
        lname: "",
        email: "",
        dob: "",
        residentalStreet1: "",
        residentalStreet2: "",
        permanentStreet1: "",
        permanentStreet2: "",
        documents: [
          {
            fileName: "",
            fileType: "",
            file: "",
          },
          {
            fileName: "",
            fileType: "",
            file: "",
          },
        ],
      });

    } catch (error) {
      console.error("Error:", error);
      if (error.res && error.res.data && error.res.data.message) {
        toast.error(error.res.data.message);
      } else {
        toast.error("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-black font-bold text-2xl text-center py-10">
        MERN STACK MACHINE TEST
      </h1>
      <form onSubmit={handleSubmit}>
        <FormInputs
          formData={formData}
          handleChange={handleChange}
          errors={errors}
        />
        <AddressInputs
          formData={formData}
          setFormData={setFormData}
          handleChange={handleChange}
          errors={errors}
        />
        <FileUploadInputs
          formData={formData}
          setFormData={setFormData}
          errors={errors}
          setErrors={setErrors}
        />
        <Button />
      </form>
    </div>
  );
};

export default CandidateForm;
