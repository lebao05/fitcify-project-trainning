import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./App.scss";
import LoginPage from "./pages/LoginPage";
import Signuppage from "./pages/SignupPage";
import HomePage from './pages/HomePage';
import UserProfile from './pages/UserProfile';
import MainLayout from './components/MainLayout';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/signup" element={<Signuppage/>} />
        <Route path="" element={<HomePage/>} />

        <Route path='/user' element={<MainLayout />}>
          <Route path="profile" element={<UserProfile/>} />
        </Route>
      </Routes>
    </Router>
  );
}
export default App;