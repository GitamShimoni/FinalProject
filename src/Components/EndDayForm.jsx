import React from 'react'
import { useState, useEffect} from 'react';
const EndDayForm = ({contractor}) => {


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
      console.log(contractor._id, "this is contractor");

  return (
    <div>
      <form className="end-day-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="whatWasDone">מה נעשה היום</label>
          <input
            type="text"
            id="whatWasDone"
            name="whatWasDone"
            value={formData.whatWasDone}
            onChange={handleChange}
            required
          />
        </div>
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
        <div className="form-group">
          <label htmlFor="status">:סטטוס</label>
          <input
            type="text"
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="sectionInContract">:סעיף בחוזה</label>
          <input
            type="text"
            id="sectionInContract"
            name="sectionInContract"
            value={formData.sectionInContract}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="units">:יחידות מידה</label>
          <input
            type="text"
            id="units"
            name="units"
            value={formData.units}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="quantity">:כמות</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="submit-button">
          End Day
        </button>
      </form>
    </div>
  )
}

export default EndDayForm
