import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import dayjs from 'dayjs';
import { supplierList, itemList, purchaseOrder } from '../utils/axios';
import { toast } from 'react-toastify';

const PurchaseOrder = () => {
  const [suppliers, setSupplier] = useState([]);
  const [item, setItemlist] = useState([]);

  // Fetch suppliers and items from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const supplierData = await supplierList();
        console.log(supplierData)
        const itemData = await itemList();
        setSupplier(supplierData.data.list);
        setItemlist(itemData.data.itemlist);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // Initial form values
  const initialValues = {
    orderNo: `PO-${Math.floor(Math.random() * 100000000)}`,
    orderDate: dayjs().format('YYYY-MM-DD'),
    supplierName: '',
    itemId: '',
    total: 0,
    discount: 0,
    netAmount: 0,
  };

  const validationSchema = Yup.object({
    supplierName: Yup.string().required('Supplier Name is required'),
    itemId: Yup.string().required('Item is required')
  });


  const handleSubmit = async (values, { resetForm }) => {
    console.log("Submitted Data:", values);


    let data = await purchaseOrder(values)
    console.log(data)
    console.log(data)
    if (data.data.status) {
      toast.success(`Success: ${data.data.message}`);
      resetForm({
        values: {
          ...initialValues,
          orderNo: `PO-${Math.floor(Math.random() * 100000000)}`,
        },
      });
    } else {
      toast.success(`Error: ${data.data.message}`);
    }

  };

  return (
    <div className="bg-slate-900 min-h-screen flex items-center justify-center p-10">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue }) => (
          <Form className="max-w-3xl w-full p-8 bg-slate-800 rounded-lg shadow-md space-y-6">
            <h2 className="text-2xl font-semibold text-blue-800 mb-4">Order Details</h2>

            {/* Order No */}
            <div>
              <label className="block text-sm font-medium text-gray-600">Order No</label>
              <Field
                type="text"
                name="orderNo"
                className="mt-1 p-3 border border-gray-300 rounded-md w-full bg-gray-50"
                readOnly
              />
            </div>

            {/* Two-Column Row for Order Date and Supplier Name */}
            <div className="flex space-x-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-600">Order Date</label>
                <Field
                  type="date"
                  name="orderDate"
                  className="mt-1 p-3 border border-gray-300 rounded-md w-full"
                />
              </div>

              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-600">Supplier Name</label>
                <Field
                  as="select"
                  name="supplierName"
                  className="mt-1 p-3 border border-gray-300 rounded-md w-full bg-gray-50"
                >
                  <option value="">Select a supplier</option>
                  {suppliers.map((supplier, index) => (
                    <option key={index} value={supplier._id}>
                      {supplier.supplierName}
                    </option>
                  ))}
                </Field>
                <ErrorMessage name="supplierName" component="div" className="text-red-500 text-xs mt-1" />
              </div>
            </div>

            {/* Item Total */}
            <div className="flex space-x-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-600">Item</label>
                <Field
                  as="select"
                  name="itemId"
                  className="mt-1 p-3 border border-gray-300 rounded-md w-full bg-gray-50"
                  onChange={(e) => {
                    const selectedItem = item.find(item => item._id === e.target.value);
                    const itemTotal = selectedItem ? selectedItem.unitPrice : 0;
                    setFieldValue("itemId", e.target.value);
                    setFieldValue("total", itemTotal);
                    setFieldValue("netAmount", itemTotal - values.discount); // Update netAmount based on itemTotal
                  }}
                >
                  <option value="">Select an item</option>
                  {item.map((item, index) => (
                    <option key={index} value={item._id}>
                      {item.itemName}
                    </option>
                  ))}
                </Field>
                <ErrorMessage name="itemId" component="div" className="text-red-500 text-xs mt-1" />
              </div>

              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-600">Total</label>
                <Field
                  type="number"
                  name="total"
                  className="mt-1 p-3 border border-gray-300 rounded-md w-full bg-gray-50"
                  readOnly
                />
              </div>
            </div>

            {/* Discount */}
            <div>
              <label className="block text-sm font-medium text-gray-600">Discount</label>
              <Field
                type="number"
                name="discount"
                className="mt-1 p-3 border border-gray-300 rounded-md w-full bg-gray-50"
                onChange={(e) => {
                  let discount = parseFloat(e.target.value) || 0;
                  if (discount < 0) discount = 0; // Prevent negative values
                  setFieldValue("discount", discount);
                  setFieldValue("netAmount", values.total - discount); // Update netAmount based on discount
                }}
              />
            </div>  

            {/* Net Amount */}
            <div>
              <label className="block text-sm font-medium text-gray-600">Net Amount</label>
              <Field
                type="number"
                name="netAmount"
                className="mt-1 p-3 border border-gray-300 rounded-md w-full bg-gray-50"
                readOnly
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-blue-600 text-white py-3 px-4 rounded-md w-full hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 transition duration-200"
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default PurchaseOrder;

