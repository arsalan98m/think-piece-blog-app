import Post from "./Post";
import AddPost from "./AddPost";
import { usePostProvider } from "../context/PostProvider";

const Posts = () => {
  const { posts } = usePostProvider();

  return (
    <section className="posts">
      <AddPost />
      {posts.length === 0 ? (
        <h1 style={{ textAlign: "center", marginTop: "1rem" }}>
          No Blogs Found
        </h1>
      ) : (
        posts.map((post) => <Post key={post.id} {...post} />)
      )}
    </section>
  );
};

export default Posts;
