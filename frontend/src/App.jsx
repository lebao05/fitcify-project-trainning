import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./App.scss";
import LoginPage from "./pages/LoginPage.jsx";
import Signuppage from "./pages/SignupPage.jsx";
import UserProfile from './pages/user/UserProfile.jsx';
import UserLayout from './components/user/UserLayout.jsx';
import ArtistLayout from './components/artist/ArtistLayout.jsx';
import AdminLayout from './components/admin/AdminLayout.jsx';
import ArtistManagement from './pages/admin/ArtistManagement.jsx';
import ArtistProfile from './pages/artist/ArtistProfile.jsx';
import ArtistDashboard from './pages/artist/ArtistDashboard.jsx';
import ArtistPlaylist from './components/artist/ArtistPlaylist.jsx';
import ArtistAlbum from './components/artist/ArtistAlbum.jsx';
import ArtistSong from './components/artist/ArtistSong.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/signup" element={<Signuppage/>} />
        
        <Route path="/artist" element={<ArtistLayout />}>
          <Route path="profile" element={<ArtistProfile/>} />
          <Route path="dashboard" element={<ArtistDashboard/>} />
          <Route path="playlists" element={<ArtistPlaylist playlists={[]} />} />
          <Route path="albums" element={<ArtistAlbum albums={[]} />} />
          <Route path="music" element={<ArtistSong songs={[]} />} />
        </Route>
        
        <Route path="" element={<UserLayout />}>
          <Route path="user-profile" element={<UserProfile/>} />
        </Route>
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<div>Admin Dashboard</div>} />
          <Route path="users" element={<div>All Users</div>} />
          <Route path="artists" element={<ArtistManagement />} />
          <Route path="content" element={<div>Content Management</div>} />
          <Route path="payments" element={<div>Payment Management</div>} />
          <Route path="notifications" element={<div>Notifications</div>} />
          <Route path="settings" element={<div>Settings</div>} />
        </Route>
      </Routes>
    </Router>
  );
}
export default App;