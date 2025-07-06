import React, { useState, useEffect } from "react";
import AlbumCard from "../user/AlbumCard.jsx";
import CreateAlbumForm from "./CreateAlbumForm.jsx";
import "./ArtistSection.scss";

const mockAlbums = [
  { id: 1, name: "1989 (Taylor's Version)", artist: "Taylor Swift", image: "/test.jpg" },
  { id: 2, name: "Chillies Album", artist: "Chillies", image: "/test.jpg" },
];
const mockSongs = [
  { id: 1, name: "Anti-Hero", artist: "Taylor Swift", duration: "3:20" },
  { id: 2, name: "Mascara", artist: "Chillies", duration: "4:01" },
  { id: 3, name: "Hẹn Một Mai", artist: "Bùi Anh Tuấn", duration: "5:00" },
];

const ArtistAlbum = ({ albums }) => {
  const [showForm, setShowForm] = useState(false);
  const [songs, setSongs] = useState([]);
  const data = albums && albums.length > 0 ? albums : mockAlbums;
  const songList = songs.length > 0 ? songs : mockSongs;

  useEffect(() => {
    // Thay URL này bằng API thực tế của bạn
    fetch("/api/artist/songs")
      .then(res => res.json())
      .then(data => setSongs(data))
      .catch(() => setSongs([]));
  }, []);

  const handleCreateAlbum = (albumData) => {
    alert("Album created successfully!\n" + JSON.stringify(albumData, null, 2));
    setShowForm(false);
  };

  return (
    <div className="artist-album-container">
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24}}>
        <h2>Albums</h2>
        <button className="create-btn" onClick={() => setShowForm(true)}>
          + Create new album
        </button>
      </div>
      {showForm && (
        <div className="create-form-modal">
          <div className="create-form-modal-backdrop" onClick={() => setShowForm(false)} />
          <div className="create-form-modal-content">
            <CreateAlbumForm songs={songList} onCreate={handleCreateAlbum} onCancel={() => setShowForm(false)} />
          </div>
        </div>
      )}
      <div className="album-grid">
        {data.map((album) => (
          <AlbumCard key={album.id} album={album} isButton="" />
        ))}
      </div>
    </div>
  );
};

export default ArtistAlbum;