// SpotifyProfile.jsx
import React, { useState } from 'react';
import ProfileHeader from '../components/ProfileHeader.jsx';
import HorizontalDots from '../components/HorizontalDots.jsx';
import SectionHeader from '../components/SectionHeader.jsx';
import ArtistCard from '../components/ArtistCard.jsx';
import TrackItem from '../components/TrackItem.jsx';
import PlaylistCard from '../components/PlaylistCard.jsx';
import ProfileFooter from '../components/ProfileFooter.jsx';
import './UserProfile.scss';

const UserProfile = () => {
  const [playingArtistId, setPlayingArtistId] = useState(null);

  // Mock data
  const user = {
    name: 'Ngọc Hiếu',
    avatar: 'doremon.svg',
    publicPlaylists: 1,
    following: 4
  };

  const topArtists = [
    { id: 1, name: 'SOOBIN', image: '/test.jpg', type: 'Artist'},
    { id: 2, name: 'Sơn Tùng M-TP', image: '/test.jpg', type: 'Artist' },
    { id: 3, name: 'AMEE', image: '/test.jpg', type: 'Artist' },
    { id: 4, name: 'Vũ', image: '/test.jpg', type: 'Artist' },
    { id: 5, name: 'HIEUTHUHAI', image: '/test.jpg', type: 'Artist' },
    { id: 6, name: 'JustaTee', image: '/test.jpg', type: 'Artist' },
    { id: 7, name: 'Da LAB', image: '/test.jpg', type: 'Artist' },
    { id: 8, name: 'Dương Domic', image: '/test.jpg', type: 'Artist' }
  ];

  const topTracks = [
    {
      id: 1,
      title: 'Hẹn Một Mai - From "4 Năm 2 Chàng 1 Tình Yêu"',
      artist: 'Bùi Lan Hương',
      description: 'Hẹn Một Mai - From "4 Năm 2 Chàng 1 Tình Yêu"',
      duration: '4:19',
      image: '/test.jpg'
    },
    {
      id: 2,
      title: 'Nếu Biết Đó Là Lần Cuối',
      artist: 'Đức Trường, BMZ',
      description: 'Nếu Biết Đó Là Lần Cuối',
      duration: '4:00',
      image: '/test.jpg'
    },
    {
      id: 3,
      title: 'Pháp Màu - Đàn Ca Gỗ Original Soundtrack',
      artist: 'MAYDAYs, Minh Tốc & Lam',
      description: 'Pháp Màu - Đàn Ca Gỗ Original Soundtrack',
      duration: '4:26',
      image: '/test.jpg',
      isPlaying: true
    },
    {
      id: 4,
      title: 'Nơi Này Có Anh',
      artist: 'Sơn Tùng M-TP',
      description: 'mtp M-TP',
      duration: '4:20',
      image: '/test.jpg'
    }
  ];

  const followingArtists = [
    { id: 1, name: 'Chillies', image: '/test.jpg', type: 'Artist' },
    { id: 2, name: 'Hoàng Dũng', image: '/test.jpg', type: 'Artist', isPlaying: true },
    { id: 3, name: 'Shawn Mendes', image: '/test.jpg', type: 'Artist' },
    { id: 4, name: 'Taylor Swift', image: '/test.jpg', type: 'Artist' }
  ];

  const playlists = [
    {
      id: 1,
      name: 'My Playlist #1',
      creator: 'Ngọc Hiếu',
      image: '/test.jpg'
    }
  ];

  // Event handlers
  const handlePlay = (artistId) => {
    setPlayingArtistId(artistId);
  };

  const handleShowAll = (section) => {
    console.log('Show all:', section);
  };

  return (
    <div className="user-profile">
      <ProfileHeader user={user} />
      <HorizontalDots user={user}/>

      <div className="profile-content">
          {/* Top Artists */}
          <section className="artist-section">
            <SectionHeader 
              title="Top artists this month"
              subtitle="Only visible to you"
              showAll={true}
              onShowAll={() => handleShowAll('artists')}
            />
            <div className="artists-card-container">
              {topArtists.map((artist) => (
                <ArtistCard 
                  key={artist.id}
                  artist={artist}
                  onPlay={() => handlePlay(artist.id)}
                  showPlayingIndicator={playingArtistId === artist.id}
                />
              ))}
            </div>
          </section>
        
          {/* Top Tracks */}
          <section className="tracks-section">
            <SectionHeader 
              title="Top tracks this month"
              subtitle="Only visible to you"
              showAll={true}
              onShowAll={() => handleShowAll('tracks')}
            />
            <div className="tracks-item-container">
              {topTracks.map((track, index) => (
                <TrackItem
                  key={track.id}
                  track={track}
                  index={index}
                  onPlay={handlePlay}
                />
              ))}
            </div>
          </section>

          {/* Public Playlists */}
          <section className="playlists-section">
            <SectionHeader 
            title="Public Playlists" 
            showAll={true}
            />
            <div className="playlists-container">
              {playlists.map((playlist) => (
                <PlaylistCard
                  key={playlist.id}
                  playlist={playlist}
                  onPlay={handlePlay}
                />
              ))}
            </div>
          </section>

        <section className="following-artists-section">
          <SectionHeader
          title="Following" 
          showAll={true}
          />
          <div className="following-artists-container">
            {followingArtists.map((artist) => (
              <ArtistCard
                key={artist.id}
                artist={artist}
                onPlay={handlePlay}
                showPlayingIndicator={true}
              />
            ))}
          </div>
        </section>
      </div>
      <ProfileFooter />
    </div>
  );
};

export default UserProfile;