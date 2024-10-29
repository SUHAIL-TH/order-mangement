import React, { Suspense, useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Supplier from '../pages/Supplier';
import ItemForm from '../pages/Item';
// import Loader from './Loader'; // Import your Loader component
import Fallback from '../component/Fallback/Fallback';
import PurchaseOrder from '../pages/PurchaseOrder';
import Order from '../pages/Order';
function UserRoute() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // 1 second delay

    return () => clearTimeout(timer); // Cleanup the timer on unmount
  }, []);

  return (
    <Suspense fallback={isLoading ? <Fallback /> : null}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/supplier" element={<Supplier />} />
        <Route path="/item" element={<ItemForm />} />
        <Route path="/purchase-order" element={<PurchaseOrder />} />
        <Route path="/orderlist" element={<Order />} />
      </Routes>
    </Suspense>
  );
}

export default UserRoute;
