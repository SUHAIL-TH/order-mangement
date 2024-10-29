import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {postSupplier} from '../utils/axios'
import { toast } from 'react-toastify';


const countries = [
  'USA',
  'Canada',
  'UK',
  'Germany',
  'Australia',
  // Add more countries as needed
];

const Supplier = () => {
  const initialValues = {
    supplierId: `SP-${Math.floor(Math.random() * 100000000)}`,
    supplierName: '',
    address: '',
    taxNo: '',
    country: '',
    mobileNo: '',
    email: '',
    status: '1',
  };

  const validationSchema = Yup.object({
    supplierName: Yup.string().required('Supplier Name is required'),
    address: Yup.string().required('Address is required'),
    taxNo: Yup.string().required('TAX No is required'),
    country: Yup.string().required('Country is required'),
    mobileNo: Yup.string()
      .required('Mobile No is required')
      .matches(/^[0-9]{10}$/, 'Mobile No must be exactly 10 digits'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      // Generate a new supplier ID
      const newSupplierId = `SP-${Math.floor(Math.random() * 100000000)}`;
      
      
      const data = { ...values, supplierId: newSupplierId };
      
      const response = await postSupplier(data);
      console.log("API Response in handleSubmit:", response);
  
      if (response?.data?.status) {
        toast.success(`Success: ${response.data.message}`);
        
       
        resetForm();
        
       
        data.supplierId = newSupplierId;
      } else {
        toast.error(`Error: ${response.data.message}`);
      }
    } catch (error) {
      console.error("Error in handleSubmit:", error);
      toast.error(`Error: ${error.message}`);
    }
  };
  

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-800 to-gray-900 flex items-center justify-center p-6">
  <div className="w-full max-w-2xl bg-slate-800 rounded-lg shadow-lg p-8 md:p-12">
    <h1 className="text-4xl font-bold text-center mb-8 text-red-500">Supplier Form</h1>
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {() => (
        <Form>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-200">Supplier ID</label>
              <Field
                type="text"
                placeholder="Enter your Supplier ID"
                name="supplierId"
                className="mt-2 p-3 border border-gray-500 rounded-md w-full bg-gray-700 text-gray-300"
                readOnly
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-200">Supplier Name</label>
              <Field
                type="text"
                name="supplierName"
                placeholder="Enter your Supplier Name"
                className="mt-2 p-3 border border-gray-500 rounded-md w-full bg-gray-700 text-gray-300"
              />
              <ErrorMessage name="supplierName" component="div" className="text-red-400 text-sm mt-1" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-200">Address</label>
              <Field
                type="text"
                name="address"
                placeholder="Enter your Address"
                className="mt-2 p-3 border border-gray-500 rounded-md w-full bg-gray-700 text-gray-300"
              />
              <ErrorMessage name="address" component="div" className="text-red-400 text-sm mt-1" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-200">TAX No</label>
              <Field
                type="text"
                name="taxNo"
                placeholder="Enter your TAX No"
                className="mt-2 p-3 border border-gray-500 rounded-md w-full bg-gray-700 text-gray-300"
              />
              <ErrorMessage name="taxNo" component="div" className="text-red-400 text-sm mt-1" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-200">Country</label>
              <Field as="select" name="country" className="mt-2 p-3 border border-gray-500 rounded-md w-full bg-gray-700 text-gray-300">
                <option value="">Select a country</option>
                {countries.map((country, index) => (
                  <option key={index} value={country}>
                    {country}
                  </option>
                ))}
              </Field>
              <ErrorMessage name="country" component="div" className="text-red-400 text-sm mt-1" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-200">Mobile No</label>
              <Field
                type="text"
                name="mobileNo"
                placeholder="Enter your Mobile No"
                className="mt-2 p-3 border border-gray-500 rounded-md w-full bg-gray-700 text-gray-300"
              />
              <ErrorMessage name="mobileNo" component="div" className="text-red-400 text-sm mt-1" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-200">Email</label>
              <Field
                type="email"
                name="email"
                placeholder="Enter your Email"
                className="mt-2 p-3 border border-gray-500 rounded-md w-full bg-gray-700 text-gray-300"
              />
              <ErrorMessage name="email" component="div" className="text-red-400 text-sm mt-1" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-200">Status</label>
              <Field as="select" name="status" className="mt-2 p-3 border border-gray-500 rounded-md w-full bg-gray-700 text-gray-300">
                <option value="1">Active</option>
                <option value="2">Inactive</option>
                <option value="3">Blocked</option>
              </Field>
            </div>
          </div>

          <button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold py-3 rounded-md mt-4 hover:from-blue-600 hover:to-blue-700 transition duration-200 ease-in-out">
            Submit
          </button>
        </Form>
      )}
    </Formik>
  </div>
</div>

  );
};

export default Supplier;
