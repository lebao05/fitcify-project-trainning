import './ProfileHeader.scss';
import HeaderBar from './HeaderBar';

const ProfileHeader = ({ name, image, publicPlaylist, following}) => {
  console.log(name, image, publicPlaylist, following);
  return (
    <div> 
      <HeaderBar />
    
      <div className="profile-header">
        <div className="avatar-section">
          <img src={image} alt="avatar" className="avatar" />
          <div className="profile-header__overlay">
            <i className="fas fa-pencil-alt" aria-hidden="true"></i>
            <span>Choose Photo</span>
          </div>
        </div>

        <div className="profile-info"> 
          <p>Profile</p>
          <p className="username">{name}</p>

          <p className="info">
            <span>{publicPlaylist} Public Playlist</span>
            <span className="dot">•</span>
            <span><strong>{following} Following</strong> </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
