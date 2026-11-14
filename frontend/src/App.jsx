import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./page/Login";
import Register from "./page/Register";
import Messenger from "./page/Messenger";
import ProtectedRoute from "./components/authComponent/ProtectedRoute";
import AuthProtectedRoute from "./components/authComponent/AuthProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthProtectedRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Messenger />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<p className="text-center">Not found</p>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
