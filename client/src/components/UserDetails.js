import React, { useState, useEffect } from "react";
import "./css/UserDetails.css";
import socket from "../services/socket";

function UserDetails({ user, onClose, onChat, currentUser }) {
  const [signedUrls, setSignedUrls] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImageEnlarged, setIsImageEnlarged] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);
  const [isBlockedBy, setIsBlockedBy] = useState(false);
  //---------------------------------------------------------
  useEffect(() => {
    if (socket.connected) {
      // Check if socket is connected
      const handleBlockEvent = (data) => {
        // console.log("Received block event:", data);
        if (currentUser.id === data.blockedUserId) {
          setIsBlockedBy(true);
        }
      };

      const handleUnBlockEvent = (data) => {
        // console.log("Received block event:", data);
        if (currentUser.id === data.blockedUserId) {
          setIsBlockedBy(false);
        }
      };

      socket.on("user_blocked", handleBlockEvent);
      socket.on("user_unblocked", handleUnBlockEvent);

      return () => {
        socket.off("user_blocked", handleBlockEvent);
        socket.off("user_unblocked", handleUnBlockEvent);
      };
    } else {
      console.warn(
        "Socket connection not established yet. Blocking event handling might be delayed."
      );
    }
  }, [currentUser.id, user.id]);
  //---------------------------------------------------------
  useEffect(() => {
    const handleSignedUrls = (data) => {
      setSignedUrls(data.urls);
    };

    socket.emit("getSignedUrls", { userId: user.id });

    socket.on("signedUrls", handleSignedUrls);

    socket.on("error", (error) => {
      console.error("Socket.io error:", error);
    });

    return () => {
      socket.off("signedUrls", handleSignedUrls);
      socket.off("error");
    };
  }, [user.id]);
  //---------------------------------------------------------
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % signedUrls.length);
  };
  //---------------------------------------------------------
  const prevImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + signedUrls.length) % signedUrls.length
    );
  };
  //---------------------------------------------------------
  const toggleImageEnlargement = () => {
    setIsImageEnlarged(!isImageEnlarged);
  };
  //---------------------------------------------------------
  const handleBlockUser = async () => {
    try {
      setIsBlocked(true);
      socket.emit("block_user", {
        userId: currentUser.id,
        blockedUserId: user.id,
      });
    } catch (error) {
      console.error("Client: Error blocking user:", error);
    }
  };
  //---------------------------------------------------------
  const handleUnblockUser = async () => {
    try {
      setIsBlocked(false);
      socket.emit("unblock_user", {
        userId: currentUser.id,
        blockedUserId: user.id,
      });
    } catch (error) {
      console.error("Client: Error unblocking user:", error);
    }
  };
  //---------------------------------------------------------
  return (
    <div className="user-details-modal">
      <h2>{user.username}</h2>
      <p>{user.bio}</p>

      <div className="user-photos">
        {signedUrls.length > 0 && (
          <>
            {isImageEnlarged ? (
              <div
                className="enlarged-image-container"
                onClick={toggleImageEnlargement}
              >
                <img
                  src={signedUrls[currentImageIndex]}
                  alt={`${currentImageIndex + 1}`}
                  className="reduce-cursor"
                />
              </div>
            ) : (
              <img
                src={signedUrls[currentImageIndex]}
                alt={`${currentImageIndex + 1}`}
                onClick={toggleImageEnlargement}
                className="enlarge-cursor"
              />
            )}
            <button onClick={prevImage}>&lt;</button>
            <button onClick={nextImage}>&gt;</button>
            <span>{`${currentImageIndex + 1}/${signedUrls.length}`}</span>
          </>
        )}
      </div>
      {!isBlocked && !isBlockedBy && (
        <button onClick={() => onChat(user.id)}>Send a message</button>
      )}
      <br />
      <br />
      {isBlocked ? (
        <button onClick={handleUnblockUser}>Unblock User</button>
      ) : (
        <button onClick={handleBlockUser}>Block User</button>
      )}
      <br />
      <br />
      <button onClick={onClose}>Close Profile</button>
    </div>
  );
}

export default UserDetails;
