import React from "react";
import { useState, useEffect } from "react";
import "./EndDayForm.css";
const EndDayForm = ({ contractor }) => {
  const [servicesArr, setServicesArr] = useState([...contractor.services]);
  const [status, setStatus] = useState([]);
  const [changes, setChanges] = useState([]);
  // const [textAreaHeight, setTextAreaHeight] = useState([]);

  const calculateTextareaHeight = (index) => {
    let content = changes[index];
    const lineHeight = 20;
    const lines = content?.split("\n").length;
    return lineHeight * lines;
  };

  function handleSetChanges(index, value) {
    let temp = [...changes];
    temp[index] = value;
    setChanges([...temp]);
  }

  function handleSetStatus(index, value) {
    let temp = [...status];
    temp[index] = value;
    setStatus([...temp]);
  }
  console.log(status);

  const [formData, setFormData] = useState({
    whatWasDone: "",
    howManyWorkers: "",
    status: "",
    sectionInContract: "",
    units: "",
    quantity: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // Do something with the form data here, like submit it to a server or display a success message.
    console.log("Form data:", formData);
    setFormData({
      whatWasDone: "",
      howManyWorkers: "",
      status: "",
      sectionInContract: "",
      units: "",
      quantity: "",
    });
  };

  return (
    <div>
      <form className="end-day-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="howManyWorkers">:כמה עובדים</label>
          <input
            type="number"
            id="howManyWorkers"
            name="howManyWorkers"
            value={formData.howManyWorkers}
            onChange={handleChange}
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
                <select className="EndDayForm-select"
                  onChange={(e) => handleSetStatus(index, e.target.value)}
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
                  onChange={(e) => handleSetChanges(index, e.target.value)}
                  style={{ height: calculateTextareaHeight(index) }}
                  placeholder="מה נעשה"
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
