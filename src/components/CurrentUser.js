import moment from "moment";
import { Avatar } from "rsuite";
import { signOut } from "../firebase";
import { Link } from "react-router-dom";
const CurrentUser = ({ displayName, photoURL, email, createdAt, children }) => {
  // date and time
  const { nanoseconds, seconds } = createdAt !== null && createdAt;
  var timestamp = { nanoseconds, seconds };
  const dateTime = new Date(timestamp?.seconds * 1000);

  return (
    <section className="current__user">
      <div className="current__user__profile">
        {photoURL ? (
          <div className="user__profile">
            <img src={photoURL} alt={displayName} />
            <Link to="/user-profile">Update Profile</Link>
          </div>
        ) : (
          <div className="avatar-group">
            <Avatar
              style={{
                borderRadius: "50%",
                width: "5rem",
                height: "5rem",
                fontSize: "3rem",
              }}
              size="lg"
            >
              {displayName[0].toUpperCase()}
            </Avatar>
            <Link to="/user-profile">Update Profile</Link>
          </div>
        )}
        <div className="current__user__information">
          <h2>{displayName}</h2>
          <p className="email">
            <span>Email: </span>
            {email}
          </p>
          <p className="created__at">
            <span>Joined: </span>
            {moment(dateTime).calendar()}
          </p>
        </div>
      </div>

      <div>{children}</div>
      <button onClick={signOut}>Sign Out</button>
    </section>
  );
};

CurrentUser.defaultProps = {
  displayName: "arsalan",
  email: "arsalan@gmail.com",
  photoURL: "https://www.fillmurray.com/300/300",
  createdAt: new Date(),
};

export default CurrentUser;
