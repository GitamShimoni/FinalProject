import CreateAProductOrder from "./CreateAProductOrder";
import ProductOrdersTable from "./ProductOrdersTable";
import IronOrdersTable from "./IronOrdersTable";
import ProductOrderForm from "./ProductOrderForm";
import "./OrdersPage.css";
import IronOrderForm from "./IronOrderForm";
import React, { useEffect, useState, useRef } from "react";
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
    setIsIronModalOpen(true);
  };
  const tableRef = useRef(null)
  return (
    <div id="orders-page-container">
      {loading ? (
        <Loader />
      ) : (
        <div className="prodact-page-holder">
          <h1 className="orders-page-header">טבלת הזמנות מתכלים</h1>
          <ProductOrdersTable />
          <div className="order-button">
            <br />
            <button
              className="product-order-btn"
              onClick={() => createProductOrder()}
            >
              <span className="btn-span-mother">
                <span>ן</span>
                <span>מ</span>
                <span>ז</span>
                <span>ה</span>
              </span>
              <span className="btn-span-mother2">
                <span>ן</span>
                <span>מ</span>
                <span>ז</span>
                <span>ה</span>
              </span>
            </button>
            {isModalOpen && (
              <div className="crete-product-order-model">
                <ProductOrderForm onClose={() => setIsModalOpen(false)} />
              </div>
            )}
          </div>
          <h1 className="orders-page-header">טבלת הזמנות ברזל</h1>
          <IronOrdersTable />
          <div className="order-button">
            <button
              className="product-order-btn"
              onClick={() => createIronOrder()}
            >
              <span className="btn-span-mother">
                <span>ן</span>
                <span>מ</span>
                <span>ז</span>
                <span>ה</span>
              </span>
              <span className="btn-span-mother2">
                <span>ן</span>
                <span>מ</span>
                <span>ז</span>
                <span>ה</span>
              </span>
            </button>
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
