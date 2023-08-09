import axios from "axios";
import Host from "../utils/routes";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ProductOrderForm.css";
import { ProjectContext } from "../Contexts/ProjectContext";
import { useContext } from "react";

function ProductOrderForm({ onClose }) {
  const { productOrders, setProductOrders } = useContext(ProjectContext);
  let currentDate = new Date();
  currentDate.setHours(12, 0, 0, 0);

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    const productName = e.target[0].value;
    const dateOfOrder = e.target[1].value || currentDate; // Use current date if not selected
    const quantity = e.target[2].value;
    const unit = e.target[3].value;
    const supplier = e.target[4].value;
    const minQuantity = e.target[5].value;

    try {
      await axios
        .post(`${Host}/productOrder/createProductOrder`, {
          //NEED TO CHANGE THE ORDERS ID WITH THE CONTEXT
          ordersId: "64c6496edd068b2c46962f28",
          productName: productName,
          dateOfOrder: dateOfOrder,
          unit: unit,
          quantity: quantity,
          supplier: supplier,
          status: "pending",
          minQuantity: minQuantity,
        })
        .then(({ data }) => {
          setProductOrders(data);
        });
        toast.success("ההזמנה נשלחה בהצלחה!", {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      onClose()
    } catch (err) {
      console.log(err);
    }
  };
  const handleClose = () => {
    onClose();
  };

  return (
    <div className="product-order-modal">
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
        theme="colored"
      />
      <div className="order-product-modal-content" >
        <span className="update-user-modal-close-button" onClick={handleClose}>
          &times;
        </span>
        <h2 className="update-user-form-headline">הזמנה חדשה</h2>
        <form onSubmit={handleSubmitForm} id="Product-Order-Form" className="update-user-form">
          <h2 className="ProductOrderForm-form-title">:שם המוצר</h2>
          <input
            required
            type="text"
            className="product-name ProductOrderForm-input"
            placeholder="שם המוצר"
          />
          <h2 className="ProductOrderForm-form-title">:תאריך ביצוע ההזמנה</h2>
          <input
            type="date"
            className="date-Of-order ProductOrderForm-input"
            placeholder="תאריך ביצוע ההזמנה"
          />
          <h2 className="ProductOrderForm-form-title">:כמות</h2>
          <input
            required
            type="number"
            className="quantity ProductOrderForm-input"
            placeholder="כמות"
          />
          <h2 className="ProductOrderForm-form-title">:יחידות</h2>
          <input
            required
            type="text"
            className="unit ProductOrderForm-input"
            placeholder="'יח"
          />
          <h2 className="ProductOrderForm-form-title">:ספק</h2>
          <input
            required
            type="text"
            className="unit ProductOrderForm-input"
            placeholder="ספק"
          />
          <h2 className="ProductOrderForm-form-title">:כמות מינימאלית</h2>
          <input
            required
            type="number"
            className="unit ProductOrderForm-input"
            placeholder="כמות מינימאלית"
          />
          <button onClick={() => handleSubmitForm()} className="product-order-submit-btn" type="submit">
            הזמן
          </button>
        </form>
        {/* {message && <p>{message}</p>} */}
      </div>
    </div>
  );
}

export default ProductOrderForm;
