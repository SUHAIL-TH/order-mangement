import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { supplierList, addItem } from '../utils/axios'
import { toast } from 'react-toastify';


const stockUnits = [
    'Pieces',
    'Kilograms',
];

const categories = [
    'Electronics',
    'Clothing',
    'Fruits',
];




const ItemForm = () => {
    const [suppliers, setSupplier] = useState([])
    const supplierLisst = async () => {
        try {
            const response = await supplierList()
            return response.data;
        } catch (error) {
            return null;
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const data = await supplierLisst();

            setSupplier(data.list);
        };

        fetchData();
    }, []);
    const initialValues = {
        itemId: `IT-${Math.floor(Math.random() * 100000000)}`,
        itemName: '',
        inventoryLocation: '',
        brand: '',
        category: '',
        supplier: '',
        stockUnit: '',
        unitPrice: '',
        itemImages: [],
        status: '1',
    };

    const validationSchema = Yup.object({
        itemName: Yup.string().required('Item Name is required'),
        inventoryLocation: Yup.string().required('Inventory Location is required'),
        brand: Yup.string().required('Brand is required'),
        category: Yup.string().required('Category is required'),
        supplier: Yup.string().required('Supplier is required'),
        stockUnit: Yup.string().required('Stock Unit is required'),
        unitPrice: Yup.number().required('Unit Price is required').positive('Unit Price must be positive'),
        itemImages: Yup.mixed().required('At least one image is required'),
    });

    const handleSubmit = async (values, { resetForm }) => {
        console.log(values);
        let data = new FormData();
        data.append('itemId', values.itemId);
        data.append('itemName', values.itemName);
        data.append('inventoryLocation', values.inventoryLocation);
        data.append('brand', values.brand);
        data.append('category', values.category);
        data.append('supplier', values.supplier);
        data.append('stockUnit', values.stockUnit);
        data.append('unitPrice', values.unitPrice);
        data.append('status',values.status)

        values.itemImages.forEach((file) => {
            data.append("images", file);
        });

        try {
            let result = await addItem(data);
            console.log(result);
            if (result.data.status) {
                toast.success(`Success: ${result.data.message}`);

                // Reset the form
                resetForm({
                    values: {
                        itemId: `IT-${Math.floor(Math.random() * 100000000)}`, // Generate new ID
                        itemName: '',
                        inventoryLocation: '',
                        brand: '',
                        category: '',
                        supplier: '',
                        stockUnit: '',
                        unitPrice: '',
                        itemImages: [] ,// Reset images to empty array,
                        status:'1'
                    }
                });
            } else {
                toast.error(`Error: ${result.data.message}`);
            }
        } catch (error) {
            toast.error(`Error: ${error.message}`);
        }
    };


    return (
        <div className="min-h-screen  bg-slate-900 flex items-center justify-center">
            <div className="w-full ps-10  px-10 ms-10 mx-10">
                <h1 className="text-3xl font-semibold text-center mb-6 " style={{ color: 'red', fontWeight: 'bolder' }}>ITEM</h1>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ setFieldValue }) => (
                        <Form>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="block text-sm font-medium text-white ">Item ID</label>
                                    <Field
                                        type="text"
                                        name="itemId"
                                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                                        readOnly
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-white ">Item Name</label>
                                    <Field
                                        type="text"
                                        name="itemName"
                                        placeholder="Enter item name"
                                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                                    />
                                    <ErrorMessage name="itemName" component="div" className="text-red-500 text-sm" />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-white ">Inventory Location</label>
                                    <Field
                                        type="text"
                                        name="inventoryLocation"
                                        placeholder="Enter inventory location"
                                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                                    />
                                    <ErrorMessage name="inventoryLocation" component="div" className="text-red-500 text-sm" />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-white ">Brand</label>
                                    <Field
                                        type="text"
                                        name="brand"
                                        placeholder="Enter brand name"
                                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                                    />
                                    <ErrorMessage name="brand" component="div" className="text-red-500 text-sm" />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-white ">Category</label>
                                    <Field as="select" name="category" className="mt-1 p-2 border border-gray-300 rounded-md w-full">
                                        <option value="">Select a category</option>
                                        {categories.map((category, index) => (
                                            <option key={index} value={category}>
                                                {category}
                                            </option>
                                        ))}
                                    </Field>
                                    <ErrorMessage name="category" component="div" className="text-red-500 text-sm" />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-white ">Supplier</label>
                                    <Field as="select" name="supplier" className="mt-1 p-2 border border-gray-300 rounded-md w-full">
                                        <option value="">Select a supplier</option>
                                        {suppliers.map((supplier) => (
                                            <option key={supplier._id} value={supplier._id}>
                                                {supplier.supplierName}
                                            </option>
                                        ))}
                                    </Field>
                                    <ErrorMessage name="supplier" component="div" className="text-red-500 text-sm" />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-white ">Stock Unit</label>
                                    <Field as="select" name="stockUnit" className="mt-1 p-2 border border-gray-300 rounded-md w-full">
                                        <option value="">Select stock unit</option>
                                        {stockUnits.map((unit, index) => (
                                            <option key={index} value={unit}>
                                                {unit}
                                            </option>
                                        ))}
                                    </Field>
                                    <ErrorMessage name="stockUnit" component="div" className="text-red-500 text-sm" />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-white ">Unit Price</label>
                                    <Field
                                        type="number"
                                        name="unitPrice"
                                        placeholder="Enter unit price"
                                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                                    />
                                    <ErrorMessage name="unitPrice" component="div" className="text-red-500 text-sm" />
                                </div>

                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-white">Item Images</label>
                                    <div className="relative mt-1">
                                        <input
                                        style={{backgroundColor:'white',opacity:'inherit'}}
                                            type="file"
                                            name="itemImages"
                                            multiple
                                            onChange={(event) => {
                                                const files = Array.from(event.currentTarget.files); // Convert FileList to an array
                                                setFieldValue("itemImages", files); // Set itemImages as an array
                                            }}
                                            className="block w-full text-sm text-gray-900 file:mr-3 file:py-2 file:px-4 file:border-0 file:rounded file:text-sm file:font-semibold
                 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 border border-gray-300 rounded-md"
                                        />
                                    </div>
                                    <ErrorMessage name="itemImages" component="div" className="text-red-500 text-sm mt-1" />
                                </div>


                                <div >
                                    <label className="block text-sm font-medium text-white ">Status</label>
                                    <Field as="select" name="status" className="mt-1 p-2 border border-gray-300 rounded-md w-full">
                                        <option value="1">Enabled</option>
                                        <option value="2">Disabled</option>
                                    </Field>
                                </div>
                            </div>

                            <button type="submit" className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600">
                                Submit
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default ItemForm;
