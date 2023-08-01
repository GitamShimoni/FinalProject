import React from 'react';
import './AddServiceBtn.css';

const AddServiceBtn = () => {
  return (
    <button className="AddServiceBtn__button" type="button">
      <span className="AddServiceBtn__text">הוסף שירות</span>
      <span className="AddServiceBtn__icon">
        <svg
          className="AddServiceBtn__svg"
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
          <line x1="12" x2="12" y1="5" y2="19"></line>
          <line x1="5" x2="19" y1="12" y2="12"></line>
        </svg>
      </span>
    </button>
  );
};

export default AddServiceBtn;
