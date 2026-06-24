import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import Navbar from "../components/Navbar";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import About from "../pages/About";
import Contact from "../pages/Contact";
import NotFound from "../pages/NotFound";
import Raffles from "../pages/Raffle";
import Games from "../pages/Games";
import Footer from "../components/Footer";
import RouletteGame from "../pages/RouletteGame";
import RandomSelectionGame from "../pages/RandomSelectionGame";
import SlotsGame from "../pages/SlotsGame";
import AdminRoutes from "../admin/routes/AdminRoutes";

// Ruta temporal de pruebas, se eliminará en el futuro.
import BackendFlowTest from "../pages/BackendFlowTest";

function AppRouter() {
  return (
    <>
      <Routes>
        {/* RUTAS ADMIN */}
        <Route path="/admin/*" element={<AdminRoutes />} />

        {/* RUTAS NORMALES */}
        <Route
          path="*"
          element={
            <>
              <Navbar />

              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* demás rutas */}

                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />

                <Route path="/about" element={<About />} />

                <Route path="/contact" element={<Contact />} />

                <Route
                  path="/raffles"
                  element={
                    <ProtectedRoute>
                      <Raffles />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/games"
                  element={
                    <ProtectedRoute>
                      <Games />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/games/roulette"
                  element={
                    <ProtectedRoute>
                      <RouletteGame />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/games/random-selection"
                  element={
                    <ProtectedRoute>
                      <RandomSelectionGame />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/games/slots"
                  element={
                    <ProtectedRoute>
                      <SlotsGame />
                    </ProtectedRoute>
                  }
                />

                <Route path="/dev/backend-flow" element={<BackendFlowTest />} />

                <Route path="*" element={<NotFound />} />
              </Routes>

              <Footer />
            </>
          }
        />
      </Routes>
    </>
  );
}

export default AppRouter;
