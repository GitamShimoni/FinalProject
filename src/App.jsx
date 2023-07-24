import { Route, Routes } from "react-router-dom";
import Layout from "./Components/Layout";
import "./App.css";
// import { UserProvider } from "./Contexts/UserContext";
function App() {
  return (
    // <UserProvider>
    <div className="appmain-container">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/dashboard" element={<Layout />} />
          <Route path="/inventory" element={<Layout />} />
          <Route path="/orders" element={<Layout />} />
          <Route path="/constructors" element={<Layout />} />
          <Route path="/endoftheday" element={<Layout />} />
        </Route>
        <Route path="/login" element={<Layout />} />
      </Routes>
    </div>
    // </UserProvider>
  );
}

export default App;
