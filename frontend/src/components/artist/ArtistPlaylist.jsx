import React, { useState, useEffect } from "react";
import PlaylistCard from "../user/PlaylistCard.jsx";
import CreatePlaylistForm from "./CreatePlaylistForm.jsx";
import "./ArtistSection.scss";

const mockPlaylists = [
  { id: 1, name: "Liked Songs", creator: "Spotify", image: "/test.jpg", isPinned: true },
  { id: 2, name: "My Playlist #2", creator: "Ngọc Hiếu", image: "/test.jpg" },
  { id: 3, name: "Acoustic Favorites", creator: "Spotify", image: "/test.jpg" },
  { id: 4, name: "This Is Taylor Swift", creator: "Spotify", image: "/test.jpg" },
  { id: 5, name: "Top Nghệ Sĩ Việt 2024", creator: "Spotify", image: "/test.jpg" },
  { id: 6, name: "Reading Soundtrack", creator: "Spotify", image: "/test.jpg" },
  { id: 7, name: "My Playlist #1", creator: "Ngọc Hiếu", image: "/test.jpg" },
];
const mockSongs = [
  { id: 1, name: "Anti-Hero", artist: "Taylor Swift", duration: "3:20" },
  { id: 2, name: "Mascara", artist: "Chillies", duration: "4:01" },
  { id: 3, name: "Hẹn Một Mai", artist: "Bùi Anh Tuấn", duration: "5:00" },
];

const ArtistPlaylist = ({ playlists }) => {
  const [showForm, setShowForm] = useState(false);
  const [songs, setSongs] = useState([]);
  const data = playlists && playlists.length > 0 ? playlists : mockPlaylists;
  const songList = songs.length > 0 ? songs : mockSongs;

  useEffect(() => {
    // Thay URL này bằng API thực tế của bạn
    fetch("/api/artist/songs")
      .then(res => res.json())
      .then(data => setSongs(data))
      .catch(() => setSongs([]));
  }, []);

  const handleCreatePlaylist = (playlistData) => {
    alert("Playlist created successfully!\n" + JSON.stringify(playlistData, null, 2));
    setShowForm(false);
  };

  return (
    <div className="artist-playlist-container">
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24}}>
        <h2>Playlists</h2>
        <button className="create-btn" onClick={() => setShowForm(true)}>
          + Create new playlist
        </button>
      </div>
      {showForm && (
        <div className="create-form-modal">
          <div className="create-form-modal-backdrop" onClick={() => setShowForm(false)} />
          <div className="create-form-modal-content">
            <CreatePlaylistForm songs={songList} onCreate={handleCreatePlaylist} onCancel={() => setShowForm(false)} />
          </div>
        </div>
      )}
      <div className="playlist-grid">
        {data.map((playlist) => (
          <PlaylistCard key={playlist.id} playlist={playlist} isButton="" />
        ))}
      </div>
    </div>
  );
};

export default ArtistPlaylist;