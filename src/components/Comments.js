import Comment from "./Comment";
import AddComment from "./AddComment";

const Comments = ({ comments, onCreate }) => {
  console.log();
  return (
    <section className="comments">
      <AddComment onCreate={onCreate} />
      {comments?.map((comment) => (
        <Comment {...comment} key={comment.id} />
      ))}
    </section>
  );
};

export default Comments;
