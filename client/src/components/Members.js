import { useUserProfile, useUser } from "../hooks";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import socket from "../services/socket";
import { login } from "../services/socketServices";
import Member from "./Member";
import UserDetails from "./UserDetails";
import "./css/Members.css";

function Members() {
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [viewedUser, setViewedUser] = useState(null);
  const { userId, username, photoUrl, bio } = useUser();

  useUserProfile();
  const navigate = useNavigate();

  useEffect(() => {
    const user = {
      id: userId,
      username: username,
      photoUrl: photoUrl,
      bio: bio,
    };

    login(user);

    socket.on("onlineUsers", (users) => {
      console.log("Received onlineUsers event:", users);
      const otherUsers = users.filter((u) => u.id !== user.id);
      setOnlineUsers(otherUsers);
    });

    return () => {
      socket.off("onlineUsers");
    };
  }, [userId, username, photoUrl, bio]);

  const handleMemberClick = (user) => {
    setViewedUser(user);
  };

  const handleClose = () => {
    setViewedUser(null);
  };

  const handleChat = (userId) => {
    // ...
  };

  const goToProfile = () => {
    navigate("/profile");
  };

  return (
    <div>
      <button className="go-profile-button" onClick={goToProfile}>
        Profile
      </button>

      <h1>Online Users</h1>
      <div className="members-container">
        {onlineUsers.map((user) => (
          <Member
            key={user.id}
            {...user}
            onClick={() => handleMemberClick(user)}
          />
        ))}
      </div>
      {viewedUser && (
        <UserDetails
          user={viewedUser}
          onClose={handleClose}
          onChat={handleChat}
        />
      )}
    </div>
  );
}

export default Members;