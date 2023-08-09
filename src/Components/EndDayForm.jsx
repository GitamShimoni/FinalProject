import React from "react";
import { useState, useEffect, useContext } from "react";
import "./EndDayForm.css";
import axios from "axios";
import Host from "../utils/routes";

const EndDayForm = ({
  contractor,
  filledContractors,
  setFilledContractors,
  allMaterials,
  setAllMaterials,
}) => {
  const [servicesArr, setServicesArr] = useState([...contractor.services]);

  const [changes, setChanges] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [productsArr, setProductsArr] = useState([]);
  const [productQuantity, setProductQuantity] = useState([]);
  const [productSelected, setProductSelected] = useState("");

  function changeStatus(index, value) {
    const newArr = [...servicesArr];
    newArr[index].status = value;
    setServicesArr(newArr);
  }
  function changeWhatWasDone(index, value) {
    const newArr = [...servicesArr];
    newArr[index].WhatWasDone = value;
    setServicesArr(newArr);
  }
  useEffect(() => {
    axios
      .post(`${Host}/product/getAll`, {
        inventoryId: localStorage.getItem("inventoryId"),
      })
      .then(({ data }) => {
        setInventory(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const calculateTextareaHeight = (index) => {
    let content = changes[index];
    const lineHeight = 20;
    const lines = content?.split("\n").length;
    return lineHeight * lines;
  };

  function handleProductQuantity(index, value) {
    const temp = [...productsArr];
    temp[index].usedQuantity = value;
    setProductsArr(temp);
  }
  console.log(productQuantity);

  const handleSubmit = (e) => {
    e.preventDefault();
    contractor.materialsUsed = productsArr;
    const newContractors = [...filledContractors, contractor];
    setFilledContractors(newContractors);
    console.log(allMaterials, "LINE 61");
    setAllMaterials(...allMaterials, contractor.materialsUsed)
  };
  console.log(contractor);
  return (
    <div>
      <form className="end-day-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="howManyWorkers">:כמה עובדים</label>
          <input
            type="number"
            id="howManyWorkers"
            name="howManyWorkers"
            onChange={(e) => (contractor.howManyWorkers = e.target.value)}
            required
          />
        </div>
        <h2>:שירותים</h2>
        <div className="EndDayForm-service-table">
          {servicesArr?.map((item, index) => (
            <div
              key={index}
              className={
                index % 2 === 0
                  ? "EndDayForm-service-div contractor-tr-zugi"
                  : "EndDayForm-service-div contractor-tr-notzugi"
              }
            >
              <div className="EndDayForm-table-row-div">
                <h3>{item?.sectionName}</h3>
              </div>
              <div className="EndDayForm-table-row-div">
                <h3>סעיף {item?.section}</h3>
              </div>
              <div className="EndDayForm-table-row-div">
                {" "}
                <select
                  className="EndDayForm-select"
                  onChange={(e) => changeStatus(index, e.target.value)}
                >
                  <option value="inProgress">{`בתהליך`}</option>
                  <option value="finished">{`הסתיים`}</option>
                  <option value="didntStart">{`טרם התחיל`}</option>
                </select>
              </div>
              <div className="EndDayForm-table-row-div">
                {" "}
                <textarea
                  className="EndDayForm-textarea"
                  onChange={(e) => changeWhatWasDone(index, e.target.value)}
                  style={{ height: calculateTextareaHeight(index) }}
                  placeholder="מה נעשה"
                />
              </div>
            </div>
          ))}

          <select onChange={(e) => setProductSelected(e.target.value)}>
            <option disabled selected hidden value="">
              בחר משאב
            </option>
            {inventory?.map((item, index) => (
              <option key={index}>{item?.name}</option>
            ))}
          </select>
          <button
            type="button"
            onClick={() =>
              setProductsArr([
                ...productsArr,
                ...inventory.filter((item) => item?.name == productSelected),
              ])
            }
          >
            הוסף
          </button>
          {console.log(productsArr)}
          {productsArr?.map((item, index) => (
            <div
              key={index}
              className={
                index % 2 === 0
                  ? "EndDayForm-service-div contractor-tr-zugi"
                  : "EndDayForm-service-div contractor-tr-notzugi"
              }
            >
              <div className="EndDayForm-table-row-div">
                <h3>{item?.name}</h3>
              </div>
              <div className="EndDayForm-table-row-div">
                <h3>{item?.unit}</h3>
              </div>

              <div className="EndDayForm-table-row-div">
                <input
                  type="number"
                  onChange={(e) => handleProductQuantity(index, e.target.value)}
                  placeholder="כמות"
                />
              </div>
            </div>
          ))}
        </div>
        <button type="submit" className="submit-button">
          submit
        </button>
      </form>
    </div>
  );
};

export default EndDayForm;
