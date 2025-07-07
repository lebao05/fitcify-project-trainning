import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.scss";
import LoginPage from "./pages/authentication/LoginPage";
import Signuppage from "./pages/authentication/SignupPage";
import MainPlayout from "./pages/user/MainPlayout";
import NotFound from "./components/user/NotFound";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<Signuppage />} />
        <Route path="/*" element={<MainPlayout />} />
        <Route path="/not-found" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
export default App;
