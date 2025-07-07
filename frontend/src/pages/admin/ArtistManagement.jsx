import React, { useState } from "react";
import './ArtistManagement.scss';
import ArtistProfileModal from '../../components/admin/ArtistProfileModal.jsx';

const artistData = [
  {
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    genre: "Pop, R&B",
    experience: "5 years",
    submitted: "1/15/2024"
  },
  {
    name: "Marcus Rodriguez",
    email: "marcus.r@email.com",
    genre: "Country, Folk",
    experience: "8 years",
    submitted: "1/14/2024"
  },
  {
    name: "Elena Vasquez",
    email: "elena.v@email.com",
    genre: "Latin, Pop",
    experience: "3 years",
    submitted: "1/13/2024"
  },
  {
    name: "Tommy Lee",
    email: "tommy.lee@email.com",
    genre: "Rock",
    experience: "10 years",
    submitted: "1/12/2024"
  },
  {
    name: "Anna Kim",
    email: "anna.kim@email.com",
    genre: "K-Pop, Dance",
    experience: "4 years",
    submitted: "1/11/2024"
  },
  {
    name: "David Smith",
    email: "david.smith@email.com",
    genre: "Jazz, Blues",
    experience: "7 years",
    submitted: "1/10/2024"
  },
  {
    name: "Linda Tran",
    email: "linda.tran@email.com",
    genre: "Classical",
    experience: "12 years",
    submitted: "1/09/2024"
  },
  {
    name: "Carlos Mendez",
    email: "carlos.m@email.com",
    genre: "Reggaeton, Latin",
    experience: "6 years",
    submitted: "1/08/2024"
  },
  {
    name: "Emily Chen",
    email: "emily.chen@email.com",
    genre: "Pop",
    experience: "2 years",
    submitted: "1/07/2024"
  },
  {
    name: "John Doe",
    email: "john.doe@email.com",
    genre: "Indie, Alternative",
    experience: "9 years",
    submitted: "1/06/2024"
  }
];

const tabs = [
  { label: "Pending Requests", key: "pending" },
  { label: "Verified Artists", key: "verified" },
  { label: "Revoked Artists", key: "revoked" }
];

const ArtistManagement = () => {
  const [activeTab, setActiveTab] = useState("pending");
  const [selectedArtist, setSelectedArtist] = useState(null);

  return (
    <div className="artist-management">
      <h1 className="artist-management__title">Artist Management</h1>
      <div className="artist-management__tabs">
        {tabs.map(tab => (
          <button
            key={tab.key}
            className={`artist-management__tab${activeTab === tab.key ? " active" : ""}`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="artist-management__content">
        {activeTab === "pending" && (
          <div className="artist-management__panel">
            <h2 className="artist-management__panel-title">Pending Artist Applications</h2>
            <div className="artist-management__panel-desc">Review and manage artist registration requests</div>
            <div className="artist-management__table-wrapper">
              <table className="artist-management__table">
                <thead>
                  <tr>
                    <th>Artist</th>
                    <th>Genre</th>
                    <th>Experience</th>
                    <th>Submitted</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {artistData.map((artist, idx) => (
                    <tr key={artist.email}>
                      <td>
                        <div className="artist-management__artist-info">
                          <span className="artist-management__avatar">{String(idx+1)}</span>
                          <div>
                            <div className="artist-management__artist-name">{artist.name}</div>
                            <div className="artist-management__artist-email">{artist.email}</div>
                          </div>
                        </div>
                      </td>
                      <td>{artist.genre}</td>
                      <td>{artist.experience}</td>
                      <td><span className="artist-management__submitted"><svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg> {artist.submitted}</span></td>
                      <td>
                        <div className="artist-management__actions">
                          <button
                            className="artist-management__action artist-management__action--view"
                            onClick={() => setSelectedArtist(artist)}
                          >
                            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M2.05 12a9.94 9.94 0 0 1 19.9 0 9.94 9.94 0 0 1-19.9 0Z"/></svg> View
                          </button>
                          <button className="artist-management__action artist-management__action--approve"><svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg> Approve</button>
                          <button className="artist-management__action artist-management__action--reject"><svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg> Reject</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        {activeTab === "verified" && (
          <div className="artist-management__panel">
            <h2 className="artist-management__panel-title">Verified Artists</h2>
            <div className="artist-management__panel-desc">List of verified artists</div>
            {/* Add verified artists table here */}
          </div>
        )}
        {activeTab === "revoked" && (
          <div className="artist-management__panel">
            <h2 className="artist-management__panel-title">Revoked Artists</h2>
            <div className="artist-management__panel-desc">List of revoked artists</div>
            {/* Add revoked artists table here */}
          </div>
        )}
      </div>
      <ArtistProfileModal artist={selectedArtist} onClose={() => setSelectedArtist(null)} />
    </div>
  );
};

export default ArtistManagement;
