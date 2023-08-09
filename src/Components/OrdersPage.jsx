import CreateAProductOrder from "./CreateAProductOrder";
import ProductOrdersTable from "./ProductOrdersTable";
import IronOrdersTable from "./IronOrdersTable";
import ProductOrderForm from "./ProductOrderForm";
import "./OrdersPage.css";
import IronOrderForm from "./IronOrderForm";
import React, { useEffect, useState } from "react";
import Loader from "./Loader";

const OrdersPage = () => {
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isIronModalOpen, setIsIronModalOpen] = useState(false);


  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  const createProductOrder = () => {
    setIsModalOpen(true);
  };
  const createIronOrder = () => {
    setIsIronModalOpen(true)
  }
  return (
    <div id="orders-page-container">
      {loading ? (
        <Loader />
      ) : (
        <div className="prodact-page-holder">
          <ProductOrdersTable />
          <div className="order-button">
            <button onClick={() => createProductOrder()}></button>
            {isModalOpen && (
              <div className="crete-product-order-model">
                <ProductOrderForm onClose={() => setIsModalOpen(false)} />
              </div>
            )}
          </div>
          <IronOrdersTable />
          <div className="order-button">
            <button onClick={() => createIronOrder()}></button>
            {isIronModalOpen && (
              <div className="crete-product-order-modal">
                <IronOrderForm onClose={() => setIsIronModalOpen(false)} />
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};

export default OrdersPage;
