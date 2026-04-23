import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import About from "./pages/About";
import Home from "./pages/Home";
import Games from "./pages/Games";
import Contact from "./pages/Contact";

function App() {
  return (
    <div>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/games" element={<Games />} />
      </Routes>
    </div>
  );
}

export default App;
