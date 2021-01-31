import { useState } from "react";
const AddComment = ({ onCreate }) => {
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate(comment);
    setComment("");
  };

  return (
    <form onSubmit={handleSubmit} className="add__comment">
      <input
        type="text"
        className="comment__text"
        name="content"
        placeholder="Enter Comment...."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <input type="submit" value="Create Comment" />
    </form>
  );
};

export default AddComment;
