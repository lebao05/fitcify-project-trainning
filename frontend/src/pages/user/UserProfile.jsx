// SpotifyProfile.jsx
import React, { useState } from "react";
import ProfileHeader from "../../components/user/ProfileHeader.jsx";
import HorizontalDots from "../../components/user/HorizontalDots.jsx";
import SectionHeader from "../../components/user/SectionHeader.jsx";
import ArtistCard from "../../components/user/ArtistCard.jsx";
import TrackItem from "../../components/user/TrackItem.jsx";
import PlaylistCard from "../../components/user/PlaylistCard.jsx";
import ProfileFooter from "../../components/user/ProfileFooter.jsx";


const UserProfile = () => {
  const [playingArtistId, setPlayingArtistId] = useState(null);

  // Mock data
  const user = {
    name: "Ngọc Hiếu",
    avatar: "../doremon.svg",
    publicPlaylists: 1,
    following: 4,
  };

  const topArtists = [
    { id: 1, name: "SOOBIN", image: "/test.jpg", type: "Artist" },
    { id: 2, name: "Sơn Tùng M-TP", image: "/test.jpg", type: "Artist" },
    { id: 3, name: "AMEE", image: "/test.jpg", type: "Artist" },
    { id: 4, name: "Vũ", image: "/test.jpg", type: "Artist" },
    { id: 5, name: "HIEUTHUHAI", image: "/test.jpg", type: "Artist" },
    { id: 6, name: "JustaTee", image: "/test.jpg", type: "Artist" },
    { id: 7, name: "Da LAB", image: "/test.jpg", type: "Artist" },
    { id: 8, name: "Dương Domic", image: "/test.jpg", type: "Artist" },
  ];

  const topTracks = [
    {
      id: 1,
      title: 'Hẹn Một Mai - From "4 Năm 2 Chàng 1 Tình Yêu"',
      artist: "Bùi Lan Hương",
      album: 'Hẹn Một Mai - From "4 Năm 2 Chàng 1 Tình Yêu"',
      duration: "4:19",
      image: "/test.jpg",
    },
    {
      id: 2,
      title: "Nếu Biết Đó Là Lần Cuối",
      artist: "Đức Trường, BMZ",
      album: "Nếu Biết Đó Là Lần Cuối",
      duration: "4:00",
      image: "/test.jpg",
    },
    {
      id: 3,
      title: "Pháp Màu - Đàn Ca Gỗ Original Soundtrack",
      artist: "MAYDAYs, Minh Tốc & Lam",
      album: "Pháp Màu - Đàn Ca Gỗ Original Soundtrack",
      duration: "4:26",
      image: "/test.jpg",
    },
    {
      id: 4,
      title: "Nơi Này Có Anh",
      artist: "Sơn Tùng M-TP",
      album: "mtp M-TP",
      duration: "4:20",
      image: "/test.jpg",
    },
  ];

  const followingArtists = [
    { id: 1, name: "Chillies", image: "/test.jpg", type: "Artist" },
    {
      id: 2,
      name: "Hoàng Dũng",
      image: "/test.jpg",
      type: "Artist",
      isPlaying: true,
    },
    { id: 3, name: "Shawn Mendes", image: "/test.jpg", type: "Artist" },
    { id: 4, name: "Taylor Swift", image: "/test.jpg", type: "Artist" },
  ];

  const playlists = [
    {
      id: 1,
      name: "My Playlist #1",
      creator: "Ngọc Hiếu",
      image: "/test.jpg",
    },
  ];

  // Event handlers
  const handlePlay = (artistId) => {
    setPlayingArtistId(artistId);
  };

  const handleShowAll = (section) => {
    console.log("Show all:", section);
  };

  return (
    <div className="user-profile-content min-h-screen bg-gradient-to-br from-[#232526] to-[#181818] overflow-y-auto overflow-x-hidden">
      <ProfileHeader user={user} />

  <div className="profile-content w-full max-w-6xl mx-auto">
        <HorizontalDots user={user} className=""/>

        {/* Top Artists */}
        <section className="artist-section my-8">
          <SectionHeader
            title="Top artists this month"
            subtitle="Only visible to you"
            showAll={true}
            onShowAll={() => handleShowAll("artists")}
          />
          <div
            className="artists-card-container grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 pt-2 w-full justify-items-center"
          >
            {topArtists.slice(0, 6).map((artist) => (
              <div
                key={artist.id}
                className="min-w-[180px] max-w-[200px]"
              >
                <ArtistCard
                  artist={artist}
                  onPlay={() => handlePlay(artist.id)}
                  showPlayingIndicator={playingArtistId === artist.id}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Top Tracks */}
        <section className="tracks-section my-8 text-white">
          <SectionHeader
            title="Top tracks this month"
            subtitle="Only visible to you"
            showAll={true}
            onShowAll={() => handleShowAll("tracks")}
          />
          <div className="tracks-item-container mt-4 flex flex-col">
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
        <section className="playlists-section my-8 text-white">
          <SectionHeader title="Public Playlists" subtitle="Public" showAll={true} />
          <div className="playlists-container grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 justify-items-center pt-2 w-full">
            {playlists.slice(0, 6).map((playlist) => (
              <div key={playlist.id} className="min-w-[180px] max-w-[200px]">
                <PlaylistCard
                  playlist={playlist}
                  onPlay={handlePlay}
                  isButton="true"
                />
              </div>
            ))}
          </div>
        </section>

        <section className="following-artists-section my-8 text-white">
          <SectionHeader title="Following" subtitle="Public" showAll={true} />
          <div className="following-artists-container grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 justify-items-center pt-2 w-full">
            {followingArtists.slice(0, 6).map((artist) => (
              <div key={artist.id} className="min-w-[180px] max-w-[200px]">
                <ArtistCard
                  artist={artist}
                  onPlay={handlePlay}
                  showPlayingIndicator={true}
                />
              </div>
            ))}
          </div>
        </section>
        <ProfileFooter />
      </div>
    </div>
  );
};

export default UserProfile;
