import { Routes, Route } from "react-router-dom";
import Header from "./Header.jsx";
import AboutUs from "./AboutUs.jsx";
import Eduction from "./Eduction.jsx";
import ContactMe from "./ContactMe.jsx";
import Projects from "./Projects.jsx";
import Skills from "./Skills.jsx";
import AdminLogin from "./admin/AdminLogin.jsx";
import AdminPanel from "./admin/AdminPanel.jsx";
import ProtectedRoute from "./admin/ProtectedRoute.jsx";

function Portfolio() {
  return (
    <>
      <Header />
      <AboutUs />
      <Skills />
      <Eduction />
      <Projects />
      <ContactMe />
    </>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Portfolio />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminPanel />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
