import { useState } from "react";
import EndDayForm from "./EndDayForm";
const EndDayPerContractor = ({
  contractor,
  filledContractors,
  setFilledContractors,
  allMaterials,
  setAllMaterials,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="end-day-perContractor-page">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="open-form-button"
        type="button"
      >
        <span className="button__text">הזן נתונים</span>
        <span className="button__icon">
          <svg
            className="svg"
            fill="none"
            height="24"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isOpen == false && <line x1="12" x2="12" y1="5" y2="19"></line>}
            <line x1="5" x2="19" y1="12" y2="12"></line>
          </svg>
        </span>
      </button>
      {isOpen && (
        <EndDayForm
          contractor={contractor}
          filledContractors={filledContractors}
          setFilledContractors={setFilledContractors}
          allMaterials={allMaterials}
          setAllMaterials={setAllMaterials}
        />
      )}
    </div>
  );
};

export default EndDayPerContractor;
