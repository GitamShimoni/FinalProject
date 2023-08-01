function ProductOrderForm() {
    const currentDate = new Date().toISOString().slice(0, 10); // Get the current date in 'yyyy-mm-dd' format
  
    const handleSubmitForm = async (e) => {
      e.preventDefault();
  
      const productName = e.target[0].value;
      const dateOfOrder = e.target[1].value || currentDate; // Use current date if not selected
      const quantity = e.target[2].value;
      const unit = e.target[3].value;
  
      try {
        const data = await axios.post(`${Host}/productOrder/createProductOrder`, {
          ordersId: "64c20c02bcc1ab80776eb98b",
          productName: productName,
          unit: unit,
          dateOfOrder: dateOfOrder,
          quantity: quantity,
          status: "pending",
        });
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    };
  
    return (
      <div>
        <div id="ProductOrderForm-form-container">
          <form onSubmit={handleSubmitForm} id="Product-Order-Form">
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
            <button className="product-order-submit-btn" type="submit">
              הזמן
            </button>
          </form>
        </div>
      </div>
    );
  }
  
  export default ProductOrderForm;
  