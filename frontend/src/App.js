import { BrowserRouter, Route, Routes } from "react-router-dom";
import Treatments from "./pages/Treatments";
import Login from "./pages/Login";
import Sidebar from "./components/admin/Sidebar";
import Consultants from "./pages/Consultants";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/dashboard" element={<Sidebar />} />
          <Route path="/treatments" element={<Treatments />} />
          <Route path="/admin" element={<Login />} />
          <Route path="/consultants" element={<Consultants/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
