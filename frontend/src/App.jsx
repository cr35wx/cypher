import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Navbar } from "./components/Navbar";
import About from "./components/pages/About";
import SignIn from "./components/pages/SignIn";
import { Home, StudentForm, ClientForm } from "./components/pages";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/student" element={<StudentForm />} />
        <Route path="/client" element={<ClientForm />} />

      </Routes>
    </div>
  );
}

export default App;