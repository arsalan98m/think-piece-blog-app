import moment from "moment";
import { Alert } from "rsuite";
import { firestore } from "../firebase";
import { useUserProvider } from "../context/UserProvider";
import { Link, useHistory } from "react-router-dom";

const Post = ({ title, content, user, createdAt, stars, comments, id }) => {
  const postRef = firestore.doc(`posts/${id}`);
  const remove = () =>
    postRef.delete().then(() => Alert.info("Post Deleted", 3000));

  const star = () => {
    postRef.update({ stars: stars + 1 });
    Alert.success("You liked the Post", 3000);
  };

  const { user: currentUser } = useUserProvider();
  const location = useHistory().location.pathname;

  console.log("comment=>", comments);

  const belongsToCurrentUser = (currentUser, postAuthor) => {
    if (!currentUser) return false;

    return currentUser.uid === postAuthor.uid;
  };

  // date and time
  const { nanoseconds, seconds } = createdAt !== null && createdAt;
  var timestamp = { nanoseconds, seconds };
  const dateTime = new Date(timestamp?.seconds * 1000);

  return (
    <article className="post">
      <div className="post__content">
        <h3>{title}</h3>
        <div>{content}</div>
      </div>

      <div className="post__meta">
        <div>
          <p>
            <span role="img" aria-label="star">
              ⭐️
            </span>
            {stars}
          </p>
          <p>
            <span role="img" aria-label="comments">
              🙊
            </span>
            {comments}
          </p>
          <p>Posted by {user.displayName}</p>
          <p>{moment(dateTime).format("MMMM Do YYYY, h:mma")}</p>
        </div>

        {currentUser && (
          <button className="star" onClick={star}>
            Star
          </button>
        )}

        {belongsToCurrentUser(currentUser, user) &&
          location !== `/posts/${id}` && (
            <button className="delete" onClick={remove}>
              Delete
            </button>
          )}

        {location !== `/posts/${id}` && currentUser && (
          <Link to={`/posts/${id}`}>Blog Details</Link>
        )}
      </div>
    </article>
  );
};

Post.defaultProps = {
  title: "An Incredibly Hot Take",
  content:
    "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ducimus est aut dolorem, dolor voluptatem assumenda possimus officia blanditiis iusto porro eaque non ab autem nihil! Alias repudiandae itaque quo provident.",
  user: {
    id: "123",
    displayName: "arsalan",
    email: "arsalan@gmail.com",
    photoURL: "https://www.fillmurray.com/300/300",
  },
  createdAt: new Date(),
  stars: 0,
  comments: 0,
};

export default Post;
