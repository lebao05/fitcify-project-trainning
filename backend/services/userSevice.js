const User = require('../models/user');
const Playlist = require('../models/playlist');
const Song = require('../models/song');

module.exports = {
  // --- Liked Tracks ---
  async getLikedTracks(userId) {
    const user = await User.findById(userId).populate('likedTracks');
    return user.likedTracks;
  },

  async likeTrack(userId, trackId) {
    const user = await User.findById(userId);
    if (!user.likedTracks.includes(trackId)) {
      user.likedTracks.push(trackId);
      await user.save();
    }
    const updated = await User.findById(userId).populate('likedTracks');
    return updated.likedTracks;
  },

  async unlikeTrack(userId, trackId) {
    await User.findByIdAndUpdate(userId, { $pull: { likedTracks: trackId } });
    const updated = await User.findById(userId).populate('likedTracks');
    return updated.likedTracks;
  },

  // --- Playlists ---
  async createPlaylist(userId, data) {
    const playlist = await Playlist.create({
      name: data.name,
      description: data.description || '',
      ownerId: userId,
      isPublic: data.isPublic != null ? data.isPublic : true,
      imageUrl: data.imageUrl || '',
      songs: data.songs || []
    });
    return playlist;
  },

  async getUserPlaylists(userId) {
    return Playlist.find({ ownerId: userId }).populate('songs');
  },

  async addTrackToPlaylist(playlistId, trackId) {
    const playlist = await Playlist.findById(playlistId);
    if (!playlist.songs.includes(trackId)) {
      playlist.songs.push(trackId);
      await playlist.save();
    }
    return playlist.populate('songs');
  },

  async removeTrackFromPlaylist(playlistId, trackId) {
    const updated = await Playlist.findByIdAndUpdate(
      playlistId,
      { $pull: { songs: trackId } },
      { new: true }
    ).populate('songs');
    return updated;
  },

  async deletePlaylist(playlistId) {
    await Playlist.findByIdAndDelete(playlistId);
    return { success: true };
  }
};
