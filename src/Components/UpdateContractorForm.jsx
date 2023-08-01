import React from "react";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import Host from "../utils/routes";
import './UpdateContractorForm.css'

const UpdateContractorForm = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      console.log("Data being sent to the server:", data);

      const response = await axios.post(
        `${Host}/contractor/add`,
        data
      );
      console.log("Server Response:", response.data);
    } catch (error) {
      console.log(
        "Error saving contractor:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="update-contractor-holder">
      <h1 className="update-contractor-header">הוסף שירות</h1>
      <form className="update-contracor-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="update-contractor-input-holder">
          <label className="update-contractor-input-label" htmlFor="section">מספר סעיף</label>
          <Controller
            name="section"
            control={control}
            defaultValue=""
            rules={{ required: "נדרש מספר סעיף" }}
            render={({ field }) => (
              <input className="update-contractor-input" {...field} type="text" placeholder="מספר סעיף" />
            )}
          />
          {errors.section && <span className="update-contractor-span">{errors.section.message}</span>}
        </div>
        <div className="update-contractor-input-holder">
          <label className="update-contractor-input-label" htmlFor="sectionName">שם הסעיף</label>
          <Controller
            name="sectionName"
            control={control}
            defaultValue=""
            rules={{ required: "נדרש שם סעיף" }}
            render={({ field }) => (
              <input className="update-contractor-input" {...field} type="text" placeholder="שם הסעיף" />
            )}
          />
          {errors.sectionName && <span className="update-contractor-span">{errors.sectionName.message}</span>}
        </div>
        <div className="update-contractor-input-holder">
          <label className="update-contractor-input-label" htmlFor="unit">כח אדם</label>
          <Controller
            name="unit"
            control={control}
            defaultValue=""
            rules={{ required: "נדרש מספר כח אדם" }}
            render={({ field }) => (
              <input className="update-contractor-input" {...field} type="text" placeholder="כח אדם" />
            )}
          />
          {errors.unit && <span className="update-contractor-span">{errors.unit.message}</span>}
        </div>
        <div className="update-contractor-input-holder">
          <label className="update-contractor-input-label" htmlFor="price">מחיר</label>
          <Controller
            name="price"
            control={control}
            defaultValue=""
            rules={{ required: "נדרש מחיר" }}
            render={({ field }) => (
              <input className="update-contractor-input" {...field} type="text" placeholder="מחיר" />
            )}
          />
          {errors.price && <span className="update-contractor-span">{errors.price.message}</span>}
        </div>
        <button id="update-contractor-button" type="submit">Submit</button>
      </form>
    </div>
  );
};

export default UpdateContractorForm;
