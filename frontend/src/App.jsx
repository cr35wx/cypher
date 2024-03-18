import { Route, Routes, Navigate, Outlet } from "react-router-dom";
import "./App.css";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import About from "./components/pages/About";
import SignIn from "./components/pages/SignIn";
import SignUp from "./components/pages/SignUp";
import Account from "./components/pages/Account";
import { Home, StudentForm, ClientForm } from "./components/pages";
import { AuthProvider, useAuth } from "./components/AuthContext";
import PasswordReset from "./components/pages/RESETTEMP";

// awesome
function AdminHack() {
  window.location.replace("http://localhost:5000/admin");
}

const PrivateRoutes = () => {
  const auth = useAuth();
  return auth.isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

const PrivateSignUp = () => {
  const auth = useAuth();
  return auth.isLoggedIn ? <Navigate to="/account" /> : <Outlet />;
};

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/resettemp" element={<PasswordReset />} />
          <Route element={<PrivateSignUp />}>
            <Route path="/login" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/student" element={<StudentForm />} />
            <Route path="/client" element={<ClientForm />} />
          </Route>
          <Route element={<PrivateRoutes />}>
            <Route path="/account" element={<Account />} />
            <Route path="/admin" element={<AdminHack />} />
          </Route>
        </Routes>
        <Footer />
      </AuthProvider>
    </div>
  );
}

export default App;
