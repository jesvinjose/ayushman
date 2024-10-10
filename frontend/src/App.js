import { BrowserRouter, Route, Routes } from "react-router-dom";
import Treatments from "./pages/admin/Treatments";
import Login from "./pages/admin/Login";
import Sidebar from "./components/admin/Sidebar";
import Consultants from "./pages/admin/Consultants";
import Jobs from "./pages/admin/Jobs";
import DutyDoctors from "./pages/admin/DutyDoctors";
import Applications from "./pages/admin/Applications";
import ContactMessages from "./pages/admin/ContactMessages";
import Home from "./pages/client/Home";
import ClientLayout from "./components/client/ClientLayout";
import About from "./pages/client/About";
import Therapies from "./pages/client/Therapies";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/dashboard" element={<Sidebar />} />
          <Route path="/treatments" element={<Treatments />} />
          <Route path="/admin" element={<Login />} />
          <Route path="/consultants" element={<Consultants />} />
          <Route path="/jobpostings" element={<Jobs />} />
          <Route path="/duty-doctors" element={<DutyDoctors />} />
          <Route path="/applications" element={<Applications />} />
          <Route path="/messages" element={<ContactMessages />} />
          {/* Client Routes wrapped in ClientLayout (with Header and Footer) */}
          <Route element={<ClientLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/therapies" element={<Therapies />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
