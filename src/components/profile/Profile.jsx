import { useEffect, useState } from "react";
import { getUsers } from "../../utils/api";
import "./Profile.css";


// eslint-disable-next-line react/prop-types
export const Profile = ({ loadingLottie }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getUsers()
      .then((response) => {
        setUsers(response.users);
        setLoading(false);
      })
      .catch(() => {
        setError("Error finding user info");
        setLoading(false);
      });
  }, []);

  if (loading) {
    <p>Loading... {loadingLottie}</p>;
  }
  if (error) {
    return <p>{error}</p>;
  }

  if (users.length === 0 || !users[0]) {
    return (
      <>
        <p>profile loading... {loadingLottie}</p>
      </>
    );
  }

  return (
    <>
      <div className="profile-card">
        <h2>Welcome back {users[0].name}</h2>
        <h3>Username: {users[0].username}</h3>
        <label>
          <img src={users[0].avatar_url} alt="Your profile picture" />
        </label>
      </div>
      <div className="other-users">
        <h3>Connect with other users:</h3>
        <ul>
          {users.map((user) => {
            if (user.name !== users[0].name)
              return (
                <li key={user.username} className="other-users-card">
                  <h4>
                    {user.name} - {user.username}
                  </h4>
                  <img
                    className="user-profile-pic"
                    src={user.avatar_url}
                    alt="${user.name}s profile picture"
                  ></img>
                </li>
              );
          })}
        </ul>
      </div>
    </>
  );
};
