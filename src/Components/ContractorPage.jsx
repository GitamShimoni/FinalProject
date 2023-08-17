import { useEffect, useState } from "react";
import axios from "axios";
import "./ContractorsTable.css";
import { useContext } from "react";
import { ProjectContext } from "../Contexts/ProjectContext";
import Host from "../utils/routes";
import ContractorsTable from "./ContractorsTable";
import AddContractorForm from "./AddContractorForm";
import { ToastContainer } from "react-toastify";
import "./ContractorPage.css";
import Loader from "./Loader";

function ContractorPage() {
  const { contractorsArr, setContractorsArr } = useContext(ProjectContext);
  const [contractorsArrCopy, setContractorsArrCopy] = useState(contractorsArr); // Initialize with the original array
  const [isAddContractorClicked, setIsAddContractorClicked] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      axios
        .post(
          `${Host}/contractor/getAllContractor`,
          {},
          {
            headers: { projectId: localStorage.getItem("selectedProjectId") },
          }
        )
        .then(({ data }) => {
          setContractorsArr(data.contractors);
          setLoading(false);
        });
    } catch {
      (err) => console.log(err);
    }
  }, []);

  useEffect(() => {
    setContractorsArrCopy(contractorsArr);
  }, [contractorsArr]);

  function handleSearchValue(searchValue) {
    setSearchValue(searchValue);
    setContractorsArrCopy(
      contractorsArr.filter((item) =>
        item.name.toLowerCase().includes(searchValue.toLowerCase())
      )
    );
  }

  function handleResetSearch() {
    setSearchValue("");
    setContractorsArrCopy(contractorsArr);
  }
  if (loading) {
    return <Loader />;
  }

  return (
    <div className="contractor-page-container">
      <ToastContainer
        position="top-center"
        autoClose={1200}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={true}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <ToastContainer
        position="top-center"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={true}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <div className="ContractorPage-search-div">
        <div className="the-input-container">
          <input
            type="text"
            className="ContractorPage-search-bar"
            value={searchValue}
            onChange={(e) => handleSearchValue(e.target.value)}
            placeholder="חפש קבלן"
          />
          <span className="the-input-icon">
            <svg
              width="19px"
              height="19px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  opacity="1"
                  d="M14 5H20"
                  stroke="#000"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>{" "}
                <path
                  opacity="1"
                  d="M14 8H17"
                  stroke="#000"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>{" "}
                <path
                  d="M21 11.5C21 16.75 16.75 21 11.5 21C6.25 21 2 16.75 2 11.5C2 6.25 6.25 2 11.5 2"
                  stroke="#000"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>{" "}
                <path
                  opacity="1"
                  d="M22 22L20 20"
                  stroke="#000"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>{" "}
              </g>
            </svg>
          </span>
        </div>
        <div className="clear-btn" onClick={handleResetSearch}>
          X
        </div>
      </div>

      {contractorsArrCopy?.map((contractor, index) => (
        <ContractorsTable key={index} contractor={contractor} />
      ))}
      <div className="ContractorPage-AddContractorForm-div">
        {!isAddContractorClicked ? (
          <div className="ContractorPage-add-remove-contractor">
            <button
              className="ContractorPage-add-btn"
              onClick={() => setIsAddContractorClicked(true)}
            >
              הוסף קבלן חדש
            </button>
          </div>
        ) : (
          <div className="ContractorPage-add-remove-contractor">
            <button
              className="ContractorPage-remove-btn"
              onClick={() => setIsAddContractorClicked(false)}
            >
              ביטול
            </button>
            <AddContractorForm
              setIsAddContractorClicked={setIsAddContractorClicked}
              setContractorsArr={setContractorsArr}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default ContractorPage;
