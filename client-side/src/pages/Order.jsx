import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supplierList, itemList ,purchaseList} from '../utils/axios';
const Order = () => {
    const navigate = useNavigate();
  
  const [orders, setOrders] = useState([]); // Ensure this is initialized as an empty array
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Function to fetch order data
  const orderList = async () => {
    try {
      const response = await purchaseList();
      return response.data; // Ensure this is the expected response structure
    } catch (error) {
      console.error("Error fetching order data:", error);
      return null;
    }
  };

  // useEffect to fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      const data = await orderList();
      console.log("++++++++++++++++++   ")
      console.log(data)
      if (data && Array.isArray(data.list)) { // Ensure data.list is an array
        setOrders(data.list);
      } else {
        console.error("Unexpected data format:", data);
        setOrders([]); // Set to empty if format is unexpected
      }
    };

    fetchData();
  }, []);
  
  // Filter orders based on search term
  const filteredOrders = orders.filter(order =>
    order.supplier?.supplierName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.item?.itemName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get current orders for the current page
  const indexOfLastOrder = currentPage * itemsPerPage;
  const indexOfFirstOrder = indexOfLastOrder - itemsPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);

  // Change page function
  const paginate = (pageNumber) => setCurrentPage(pageNumber);  

  return (
    <div className="flex justify-center mt-4">
      <div className="container mx-auto bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-center " style={{fontWeight:'bolder'}}>Order List</h2>
        
        <div className=" ps-10 ms-10">
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-45 h-12 p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
      />
    </div>

        <div className="overflow-x-auto m-10 p-10">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead className="bg-slate-800 text-white">
              <tr>
                <th className="py-3 px-6 text-left text-sm font-semibold">Order ID</th>
                <th className="py-3 px-6 text-left text-sm font-semibold">Purchaser Name</th>
                <th className="py-3 px-6 text-left text-sm font-semibold">Item Name</th>
                <th className="py-3 px-6 text-right text-sm font-semibold">Net Amount</th>
                <th className="py-3 px-6 text-center text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {currentOrders.map((order, index) => (
                <tr key={index} className="border-b border-gray-200 hover:bg-gray-100 transition-colors duration-200">
                  <td className="py-4 px-6">{order.orderNo}</td>
                  <td className="py-4 px-6">{order.supplier?.supplierName || 'N/A'}</td>
                  <td className="py-4 px-6">{order.item?.itemName || 'N/A'}</td>
                  <td className="py-4 px-6 text-right">{order.netAmount}</td>
                  <td className="py-4 px-6 text-center">
                    <button
                      onClick={() => navigate(`/product/${order.itemId}`)}
                      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-4">
            <div>
              <span className="text-gray-700">
                Page {currentPage} of {Math.ceil(filteredOrders.length / itemsPerPage)}
              </span>
            </div>
            <div>
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-md ${currentPage === 1 ? 'bg-gray-300 text-gray-500' : 'bg-blue-500 text-white'}`}
              >
                Previous
              </button>
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage * itemsPerPage >= filteredOrders.length}
                className={`ml-2 px-4 py-2 rounded-md ${currentPage * itemsPerPage >= filteredOrders.length ? 'bg-gray-300 text-gray-500' : 'bg-blue-500 text-white'}`}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
