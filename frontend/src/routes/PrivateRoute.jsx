import { Navigate, useLocation } from "react-router-dom"
export default function PrivateRoute({ children, require2FA = false }) {
  const location = useLocation()

  const token = localStorage.getItem("token")
  const twoFaOk = localStorage.getItem("twoFaOk") === "true"

  if (!token) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    )
  }

  if (require2FA && !twoFaOk) {
    return (
      <Navigate
        to="/2fa"
        replace
        state={{ from: location }}
      />
    )
  }
  return children
}
