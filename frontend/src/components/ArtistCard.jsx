import React from 'react';
import { Play } from 'lucide-react';
import './ArtistCard.scss';

const ArtistCard = ({ artist, showPlayingIndicator = false }) => {
  return (
    <div className="artist-card">
      <div className="artist-image-container">
        <img src={artist.image} alt={artist.name} className="artist-image"/>
      </div>
      
      <div className="artist-info">
        <h3 className="artist-name">{artist.name}</h3>
        <p className="type">{artist.type}</p>
      </div>
    </div>
  );
};

export default ArtistCard;