import CreateAProductOrder from "./CreateAProductOrder";
import ProductOrdersTable from "./ProductOrdersTable";
import IronOrdersTable from "./IronOrdersTable";
import ProductOrderForm from "./ProductOrderForm";
import "./OrdersPage.css";
import IronOrderForm from "./IronOrderForm";

const OrdersPage = () => {
  return (
    <div id="orders-page-container">
      <h1 className="orders-page-header">הזמנות כלליות</h1>
      <ProductOrdersTable />
      <ProductOrderForm />
      <h1 className="orders-page-header">הזמנות ברזל</h1>
      <IronOrdersTable />
      <IronOrderForm />
    </div>
  );
};

export default OrdersPage;
