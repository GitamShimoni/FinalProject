import React from "react";
import axios from "axios";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import Host from "../utils/routes";
import "../utils/routes";
import "./AddContractorForm.css";
import { Link } from "react-router-dom";
import UpdateContractorForm from "./UpdateContractorForm";

const AddContractorForm = () => {
  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "services",
  });

  const projectId = localStorage.getItem("selectedProjectId");

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`${Host}/contractor/create`, data, {
        headers: {
          projectid: projectId,
        },
      });
      console.log(response.data);
    } catch (error) {
      console.log("Error object:", error);
      console.log("Error response data:", error.response?.data);
    }
  };

  return (
    <div className="add-contractor-holder">
      <h1 className="create-contractor-header">הוסף קבלן</h1>
      <form className="add-contracor-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="contractor-input-holder">
          <div className="contractor-name-holder">
            <label className="add-contractor-input-label" htmlFor="name">
              שם הקבלן
            </label>
            <input
              className="add-contractor-input"
              {...register("name", { required: "נדרש שם קבלן" })}
              type="text"
              placeholder="שם הקבלן"
            />
            {errors.name && (
              <span className="add-contractor-span">{errors.name.message}</span>
            )}
          </div>
        </div>
        <h2>שירותים</h2>
        {fields.map((service, index) => (
          <div className="add-contractor-services-holder" key={service.id}>
            <h3>שירות מספר {index + 1}</h3>
            <div className="contractor-input-holder">
              <div className="add-contractor-input-container">
                <div className="add-contractor-label-wrapper">
                  <label
                    className="add-contractor-input-label"
                    htmlFor={`services[${index}].section`}
                  >
                    מספר סעיף
                  </label>
                  <Controller
                    name={`services[${index}].section`}
                    control={control}
                    defaultValue=""
                    rules={{ required: "נדרש מספר סעיף" }}
                    render={({ field }) => (
                      <input
                        className="add-contractor-input"
                        {...field}
                        type="text"
                        placeholder="מספר סעיף"
                      />
                    )}
                  />
                  {errors?.services?.[index]?.section && (
                    <span className="add-contractor-span">
                      {errors.services[index].section.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="contractor-input-holder">
                <div className="add-contractor-label-wrapper">
                  <label
                    className="add-contractor-input-label"
                    htmlFor={`services[${index}].sectionName`}
                  >
                    שם הסעיף
                  </label>
                  <Controller
                    name={`services[${index}].sectionName`}
                    control={control}
                    defaultValue=""
                    rules={{ required: "נדרש שם סעיף" }}
                    render={({ field }) => (
                      <input
                        className="add-contractor-input"
                        {...field}
                        type="text"
                        placeholder="שם הסעיף"
                      />
                    )}
                  />
                  {errors?.services?.[index]?.sectionName && (
                    <span className="add-contractor-span">
                      {errors.services[index].sectionName.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="contractor-input-holder">
                <div className="add-contractor-label-wrapper">
                  <label
                    className="add-contractor-input-label"
                    htmlFor={`services[${index}].price`}
                  >
                    מחיר
                  </label>
                  <Controller
                    name={`services[${index}].price`}
                    control={control}
                    defaultValue=""
                    rules={{ required: "נדרש מחיר" }}
                    render={({ field }) => (
                      <input
                        className="add-contractor-input"
                        {...field}
                        type="text"
                        placeholder="מחיר"
                      />
                    )}
                  />
                  {errors?.services?.[index]?.price && (
                    <span className="add-contractor-span">
                      {errors.services[index].price.message}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <button
              id="deleteContractor-button"
              type="button"
              onClick={() => remove(index)}
            >
              הסר שירות
            </button>
          </div>
        ))}
        <button
          id="addService-button"
          type="button"
          onClick={() => append()}
        >
          הוסף שירות חדש
        </button>
        <button id="createContractor-button" type="submit">
          שמור
        </button>
        <Link to={"/updateContractor"}>
          <button id="createContractor-button">הוסף שירות קבלן</button>
        </Link>
      </form>
    </div>
  );
};

export default AddContractorForm;
