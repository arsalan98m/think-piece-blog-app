import moment from "moment";

const Comment = ({ content, displayName, createdAt }) => {
  // date and time
  const { nanoseconds, seconds } = createdAt !== null && createdAt;
  var timestamp = { nanoseconds, seconds };
  const dateTime = new Date(timestamp?.seconds * 1000);
  return (
    <article className="comment">
      <span className="comment__author">{displayName}: </span>
      <span className="comment__content">{content}</span>
      <span className="comment__timestamp">{moment(dateTime).calendar()}</span>
    </article>
  );
};

Comment.defaultProps = {
  title: "An incrdible cake",
  content: "lorem opsim",
  user: {
    displayName: "arsalan",
    email: "arsalan@gmail.com",
    photoURL: "https://fillmurray.com/300/300",
  },
  createdAt: new Date(),
};

export default Comment;
