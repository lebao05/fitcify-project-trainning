import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.scss";
import ArtistLayout from "./components/artist/ArtistLayout.jsx";
import ArtistProfile from "./pages/artist/ArtistProfile.jsx";
import ArtistDashboard from "./pages/artist/ArtistDashboard.jsx";
import ArtistPlaylist from "./components/artist/ArtistPlaylist.jsx";
import ArtistAlbum from "./components/artist/ArtistAlbum.jsx";
import ArtistSong from "./components/artist/ArtistSong.jsx";
import LoginPage from "./pages/authentication/LoginPage.jsx";
import SignupPage from "./pages/authentication/SignupPage.jsx";
import MainPlayout from "./pages/user/MainPlayout.jsx";
import NotFound from "./components/user/NotFound.jsx";
import { Navigate } from "react-router-dom";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        <Route path="/artist" element={<ArtistLayout />}>
          {/* <Route index element={<Navigate to="dashboard" replace />} /> */}
          <Route path="profile" element={<ArtistProfile />} />
          <Route path="dashboard" element={<ArtistDashboard />} />
          <Route path="playlists" element={<ArtistPlaylist playlists={[]} />} />
          <Route path="albums" element={<ArtistAlbum albums={[]} />} />
          <Route path="music" element={<ArtistSong songs={[]} />} />
          <Route index element={<Navigate to="dashboard" replace />} />
        </Route>
        <Route path="/*" element={<MainPlayout />} />
        <Route path="/not-found" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
export default App;
