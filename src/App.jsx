import { Route, Routes } from "react-router-dom";
import LoginPage from "./component/LoginPage";
import SigupPage from "./component/SigupPage";
import ForgotpwPage from "./component/ForgotpwPage";
import AuthProvider from "./context/Authcontext";
import Home from "./component/Home";
function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/Sigup" element={<SigupPage />} />
          <Route path="/ForgotpwPage" element={<ForgotpwPage />} />
          <Route path="/Home" element={<Home />} />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
