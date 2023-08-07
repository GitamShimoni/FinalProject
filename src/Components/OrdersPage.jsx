import CreateAProductOrder from "./CreateAProductOrder";
import ProductOrdersTable from "./ProductOrdersTable";
import IronOrdersTable from "./IronOrdersTable";
import ProductOrderForm from "./ProductOrderForm";
import "./OrdersPage.css";
import IronOrderForm from "./IronOrderForm";

const OrdersPage = () => {
  return (
    <div id="orders-page-container">
      <ProductOrdersTable />
      <ProductOrderForm />
      <IronOrdersTable />
      <IronOrderForm />
    </div>
  );
};

export default OrdersPage;
