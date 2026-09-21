import { Routes, Route, Navigate } from "react-router-dom"
import Login from "./components/pages/Login"
import Register from "./components/pages/Register"
import Dashboard from "./components/pages/Dashboard"
import TwoFA from "./components/pages/TwoFA"
import Enable2FA from "./components/pages/Enable2FA"
import PrivateRoute from "./routes/PrivateRoute"

function App() {
  const token = localStorage.getItem("token")

  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to={token ? "/dashboard" : "/login"} replace />}
      />

      {/* Public */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />

      <Route
        path="/2fa"
        element={
          <PrivateRoute>
            <TwoFA />
          </PrivateRoute>
        }
      />

      <Route
        path="/2fa/enable"
        element={
          <PrivateRoute>
            <Enable2FA />
          </PrivateRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
