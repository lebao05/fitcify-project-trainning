// components/PlaylistCard/PlaylistCard.jsx
import React from 'react';
import { Play } from 'lucide-react';
import './PlaylistCard.scss';

const PlaylistCard = ({ playlist, onPlay }) => {
  return (
    <div className="playlist-card">
      <div className="playlist-image-container">
        <img src={playlist.image} alt={playlist.name} className="playlist-image"/>
      </div>
      
      <div className="playlist-info">
        <h3 className="playlist-name">{playlist.name}</h3>
        <p className="playlist-creator">By {playlist.creator}</p>
      </div>
    </div>
  );
};

export default PlaylistCard;