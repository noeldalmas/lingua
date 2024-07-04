// src/hooks/useUserProfile.jsx
import { useContext, useState, useEffect } from "react";
import { apiRequest } from "../utils/api";
import { AuthContext } from "../context/AuthContext";

export const useUserProfile = () => {
  const [profile, setProfile] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await apiRequest("/users/profile", "GET");
        setProfile(data);
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      }
    };

    if (user) {
      fetchProfile();
    }
  }, [user]);

  return profile;
};
