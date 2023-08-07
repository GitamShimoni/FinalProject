import React, { useEffect, useState } from "react";
import axios from "axios";
import Host from "../utils/routes";
import "../utils/routes";
import "./AddContractorForm.css";
import { Link } from "react-router-dom";
import UpdateContractorForm from "./UpdateContractorForm";

const AddContractorForm = ({
  setIsAddContractorClicked,
  setContractorsArr,
}) => {
  const [services, setServices] = useState([
    { section: "", sectionName: "", unit: "", price: "" },
  ]);

  const addService = () => {
    setServices([
      ...services,
      { section: "", sectionName: "", unit: "", price: "" },
    ]);
  };

  const removeService = (index) => {
    const updatedServices = [...services];
    updatedServices.splice(index, 1);
    setServices(updatedServices);
  };

  const handleChange = (index, field, value) => {
    const updatedServices = [...services];
    updatedServices[index][field] = value;
    setServices(updatedServices);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const projectId = localStorage.getItem("selectedProjectId");
    try {
      const response = await axios.post(
        `${Host}/contractor/create`,
        { name: event.target.name.value, services },
        {
          headers: {
            projectId: projectId,
          },
        }
      );

      // Add the contractorId to each service in the services array
      const contractorId = response.data._id;
      const updatedServices = services.map((service) => ({
        ...service,
        contractorId,
      }));

      // Update the state with the updated services array
      setServices(updatedServices);

      setContractorsArr((prev) => [...prev, response.data]);
      setIsAddContractorClicked(false);
      console.log(response.data);
    } catch (error) {
      console.log("Error object:", error);
      console.log("Error response data:", error.response?.data);
    }
  };

  return (
    <div className="add-contractor-holder">
      <h1 className="create-contractor-header">הוסף קבלן</h1>
      <form className="add-contractor-form" onSubmit={handleSubmit}>
        <div className="contractor-input-holder">
          <div className="contractor-name-holder">
            <label className="add-contractor-input-label" htmlFor="name">
              שם הקבלן
            </label>
            <input
              className="add-contractor-input"
              type="text"
              placeholder="שם הקבלן"
              required
              name="name"
            />
          </div>
        </div>
        <h2>שירותים</h2>
        {services.map((service, index) => (
          <div className="add-contractor-services-holder" key={index}>
            <h3>שירות מספר {index + 1}</h3>
            <div className="contractor-input-holder">
              <div className="add-contractor-input-container">
                <div className="add-contractor-label-wrapper">
                  <label
                    className="add-contractor-input-label"
                    htmlFor={`section-${index}`}
                  >
                    מספר סעיף
                  </label>
                  <input
                    className="add-contractor-input"
                    type="number"
                    placeholder="מספר סעיף"
                    value={service.section}
                    onChange={(e) =>
                      handleChange(index, "section", e.target.value)
                    }
                    required
                    id={`section-${index}`}
                  />
                </div>
              </div>
              <div className="contractor-input-holder">
                <div className="add-contractor-label-wrapper">
                  <label
                    className="add-contractor-input-label"
                    htmlFor={`sectionName-${index}`}
                  >
                    שם הסעיף
                  </label>
                  <input
                    className="add-contractor-input"
                    type="text"
                    placeholder="שם הסעיף"
                    value={service.sectionName}
                    onChange={(e) =>
                      handleChange(index, "sectionName", e.target.value)
                    }
                    required
                    id={`sectionName-${index}`}
                  />
                </div>
              </div>
              {/* Add the new input field for "יחידה" (unit) */}
              <div className="contractor-input-holder">
                <div className="add-contractor-label-wrapper">
                  <label
                    className="add-contractor-input-label"
                    htmlFor={`unit-${index}`}
                  >
                    יחידה
                  </label>
                  <input
                    className="add-contractor-input"
                    type="text"
                    placeholder="יחידה"
                    value={service.unit}
                    onChange={(e) =>
                      handleChange(index, "unit", e.target.value)
                    }
                    required
                    id={`unit-${index}`}
                  />
                </div>
              </div>

              <div className="contractor-input-holder">
                <div className="add-contractor-label-wrapper">
                  <label
                    className="add-contractor-input-label"
                    htmlFor={`price-${index}`}
                  >
                    מחיר
                  </label>
                  <input
                    className="add-contractor-input"
                    type="number"
                    placeholder="מחיר"
                    value={service.price}
                    onChange={(e) =>
                      handleChange(index, "price", e.target.value)
                    }
                    required
                    id={`price-${index}`}
                  />
                </div>
              </div>
            </div>
            {index > 0 && (
              <button
                id="deleteContractor-button"
                type="button"
                onClick={() => removeService(index)}
              >
                הסר שירות
              </button>
            )}
          </div>
        ))}
        <button id="addService-button" type="button" onClick={addService}>
          הוסף שירות חדש
        </button>
        <button id="createContractor-button" type="submit">
          שמור
        </button>
      </form>
    </div>
  );
};

export default AddContractorForm;
