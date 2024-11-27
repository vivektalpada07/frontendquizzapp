import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import API from "../../services/api";

const Profile = () => {
  const { user } = useContext(AuthContext); // Access user data from AuthContext
  const [profileDetails, setProfileDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfileDetails = async () => {
      try {
        const { data } = await API.get("/profile"); // API endpoint to fetch profile details
        setProfileDetails(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching profile details:", error);
        setLoading(false);
      }
    };

    if (user) {
      fetchProfileDetails();
    } else {
      setLoading(false);
    }
  }, [user]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return <p>Please log in to view your profile.</p>;
  }

  return (
    <div>
      <h2>Your Profile</h2>
      {profileDetails ? (
        <div>
          <p>
            <strong>Username:</strong> {profileDetails.username}
          </p>
          <p>
            <strong>Email:</strong> {profileDetails.email}
          </p>
          <p>
            <strong>Quizzes Participated:</strong> {profileDetails.totalQuizzes}
          </p>
          <p>
            <strong>Total Score:</strong> {profileDetails.totalScore}
          </p>
        </div>
      ) : (
        <p>Unable to fetch profile details.</p>
      )}
    </div>
  );
};

export default Profile;
