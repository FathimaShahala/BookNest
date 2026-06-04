import { useEffect, useState }
from "react";

import {
  useAuth
} from "../../context/AuthContext";

import {
  getProfile
} from "../../services/userService";

function Profile() {

  const { user } =
    useAuth();

  const [profile,
    setProfile] =
    useState(null);

  useEffect(() => {

    const fetchProfile =
      async () => {

        const data =
          await getProfile(
            user.token
          );

        setProfile(data);
      };

    fetchProfile();

  }, []);

  if (!profile)
    return <p>Loading...</p>;

  return (
    <div>

      <h1>
        {profile.name}
      </h1>

      <p>
        {profile.email}
      </p>

      <p>
        {profile.bio}
      </p>

    </div>
  );
}

export default Profile;