import React from "react";
import './ArtistProfileModal.scss';

const ArtistProfileModal = ({ artist, onClose }) => {
  if (!artist) return null;
  return (
    <div className="artist-modal__overlay">
      <div className="artist-modal__container">
        <button className="artist-modal__close" onClick={onClose}>
          <span>&#10005;</span>
        </button>
        <div className="artist-modal__header">
          <div className="artist-modal__avatar">{artist.avatar || artist.name[0]}</div>
          <div>
            <div className="artist-modal__name">{artist.name}</div>
          </div>
        </div>
        <div className="artist-modal__info-list">
          <div className="artist-modal__info"><span>📧</span> {artist.email}</div>
          {artist.phone && <div className="artist-modal__info"><span>📞</span> {artist.phone}</div>}
          {artist.location && <div className="artist-modal__info"><span>📍</span> {artist.location}</div>}
          <div className="artist-modal__info"><span>🎵</span> {artist.genre}</div>
        </div>
        <div className="artist-modal__section">
          <div className="artist-modal__section-title">Biography</div>
          <div className="artist-modal__section-content">{artist.bio || 'No biography provided.'}</div>
        </div>
        <div className="artist-modal__section">
          <div className="artist-modal__section-title">Social Media</div>
          <div className="artist-modal__section-content">
            <div><b>Instagram:</b> {artist.instagram || 'N/A'}</div>
            <div><b>Spotify:</b> {artist.spotify || 'N/A'}</div>
            <div><b>Youtube:</b> {artist.youtube || 'N/A'}</div>
          </div>
        </div>
        <div className="artist-modal__section">
          <div className="artist-modal__section-title">Portfolio</div>
          <div className="artist-modal__section-content">
            {artist.portfolio ? (
              <a href={artist.portfolio} target="_blank" rel="noopener noreferrer">{artist.portfolio}</a>
            ) : 'N/A'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistProfileModal;
