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
import Doctors from "./pages/client/Doctors";
import Career from "./pages/client/Career";
import Contact from "./pages/client/Contact";
import Booking from "./pages/client/Booking";
import SingleTherapy from "./pages/client/SingleTherapy";
import Branches from "./pages/admin/Branches";

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
          <Route path="/branches" element={<Branches/>}/>   
          {/* Client Routes wrapped in ClientLayout (with Header and Footer) */}
          <Route element={<ClientLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/therapies" element={<Therapies />} />
            <Route path="/doctors" element={<Doctors />} />
            <Route path="/career" element={<Career />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/treatment/:id" element={<SingleTherapy />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
