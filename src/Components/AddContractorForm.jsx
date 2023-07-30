import React from "react";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import "./AddContractorForm.css";
import { Link } from "react-router-dom";
import UpdateContractorForm from "./UpdateContractorForm";

const AddContractorForm = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/contractor/create",
        data
      );
      console.log(response.data);
    } catch (error) {
      console.log("error saving contractor", error.response.data);
    }
  };

  return (
    <div className="add-contractor-holder">
      <h1 className="create-contractor-header">הוסף קבלן</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="contractor-input-holder">
          <label htmlFor="name">שם הקבלן</label>
          <Controller
            name="name"
            control={control}
            defaultValue=""
            rules={{ required: "נדרש שם קבלן" }}
            render={({ field }) => (
              <input {...field} type="text" placeholder="שם הקבלן" />
            )}
          />
          {errors.name && <span>{errors.name.message}</span>}
        </div>
        <div className="contractor-input-holder">
          <label htmlFor="section">סעיף</label>
          <Controller
            name="section"
            control={control}
            defaultValue=""
            rules={{ required: "נדרש מספר סעיף" }}
            render={({ field }) => (
              <input {...field} type="text" placeholder="סעיף" />
            )}
          />
          {errors.section && <span>{errors.section.message}</span>}
        </div>
        <div className="contractor-input-holder">
          <label htmlFor="sectionName">שם הסעיף</label>
          <Controller
            name="sectionName"
            control={control}
            defaultValue=""
            rules={{ required: "נדרש שם סעיף" }}
            render={({ field }) => (
              <input {...field} type="text" placeholder="שם הסעיף" />
            )}
          />
          {errors.sectionName && <span>{errors.sectionName.message}</span>}
        </div>
        <div className="contractor-input-holder">
          <label htmlFor="unit">כוח אדם</label>
          <Controller
            name="unit"
            control={control}
            defaultValue=""
            rules={{ required: "נדרש מספר כוח אדם" }}
            render={({ field }) => (
              <input {...field} type="text" placeholder="כוח אדם" />
            )}
          />
          {errors.unit && <span>{errors.unit.message}</span>}
        </div>
        <div className="contractor-input-holder">
          <label htmlFor="price">מחיר</label>
          <Controller
            render={({ field }) => (
              <input {...field} type="text" placeholder="מחיר" />
            )}
            name="price"
            control={control}
            defaultValue=""
            rules={{ required: "נדרש מחיר" }}
          />
          {errors.price && <span>{errors.price.message}</span>}
        </div>
        <button id="createContractor-button" type="submit">
          הוסף קבלן
        </button>
        <Link to={"/updateContractor"}>
          <button id="createContractor-button">הוסף שירות קבלן</button>
        </Link>
      </form>
    </div>
  );
};

export default AddContractorForm;
