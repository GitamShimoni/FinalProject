import { useEffect, useState } from "react";
import axios from "axios";
import "./ContractorsTable.css";
import { useContext } from "react";
import { ProjectContext } from "../Contexts/ProjectContext";
import Host from "../utils/routes";
import ContractorsTable from "./ContractorsTable";
import AddContractorForm from "./AddContractorForm";
import { ToastContainer, toast } from "react-toastify";
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
          setLoading(false)
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
    return ( 
    <Loader />
    )
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
        <input
          type="text"
          className="ContractorPage-search-bar"
          onChange={(e) => handleSearchValue(e.target.value)}
          value={searchValue}
          placeholder="חפש קבלן"
        />
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
