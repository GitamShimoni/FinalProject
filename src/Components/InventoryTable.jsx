import React, { useState, useEffect } from "react";
import axios from "axios";
import Host from "../utils/routes";

const InventoryTable = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const inventoryId = "64bfb6686d6efc963d2855ec";
    const fetchProducts = async () => {
      try {
        const response = await axios.post(`${Host}/product/getAll`,{
          inventoryId,
        });
        setProducts(response.data);
      } catch (error) {
        console.log("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  console.log(products);

  return (
    <div className="project-table">
      <div className="project-tr">
        <div className="project-toprow-tr" id="project-topleft-td">
          כמות מינימאלית
        </div>
        <div className="project-toprow-tr">כמות</div>
        <div className="project-toprow-tr">יחידת מידה</div>
        <div className="project-toprow-tr" id="project-topright-td">
          מוצר
        </div>
      </div>
      {products.map((product, index) => (
        <div key={index} className="product-row">
          <div className="product-info">{product.minQuantity}</div>
          <div className="product-info">{product.quantity}</div>
          <div className="product-info">{product.unit}</div>
          <div className="product-info">{product.name}</div>
        </div>
      ))}
    </div>
  );
};

export default InventoryTable;
