import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Navbar } from "./components/Navbar";
import { About, Contact, Home, Services } from "./components/pages";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  );
}

export default App;



// import "./App.css";
// import Button from "./components/Button";
// import Form from "./components/StudentForm"

// function App() {
//   return (
//     <div>
//       <Button />
//       <Form />
//     </div>
//   );
// }

// export default App;
