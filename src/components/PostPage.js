import { useState, useEffect } from "react";
import Post from "./Post";
import Comments from "./Comments";
import Authentication from "./Authentication";
import { firestore } from "../firebase";
import { collectIdsAndDocs } from "../utils";
import { Container } from "rsuite";
import { useParams, Link } from "react-router-dom";
import { useUserProvider } from "../context/UserProvider";
import firebase from "firebase/app";
const PostPage = () => {
  const [post, setPost] = useState("");
  const [comments, setComments] = useState([]);
  const { id } = useParams();
  const { user } = useUserProvider();

  const postRef = firestore.doc(`posts/${id}`);

  const commentsRef = postRef.collection("comments");

  const createCommment = (comment) => {
    const { uid, displayName, email } = user;
    commentsRef.add({
      content: comment,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      displayName,
      email,
    });

    postRef.update({ comments: post.comments + 1 });
  };

  let unsubscribeFromPost = null;
  let unsubscribeFromComment = null;

  useEffect(() => {
    unsubscribeFromPost = postRef.onSnapshot((snapshot) => {
      const post = collectIdsAndDocs(snapshot);
      setPost(post);
    });

    unsubscribeFromComment = commentsRef.onSnapshot((snapshot) => {
      const comments = snapshot.docs.map(collectIdsAndDocs);

      setComments(comments);
    });

    return () => {
      unsubscribeFromComment();
      unsubscribeFromPost();
    };
  }, []);

  return (
    <>
      <Container>
        <Link
          to="/"
          className="header__text"
          style={{ textAlign: "center", color: "#222" }}
        >
          Think piece Blog
        </Link>

        <Authentication />

        <section>
          {post && <Post {...post} />}
          <Comments comments={comments} onCreate={createCommment} />
        </section>

        <Link
          to="/"
          style={{ textAlign: "center", marginTop: "1rem", fontSize: "2rem" }}
        >
          Back to Home
        </Link>
      </Container>
    </>
  );
};

export default PostPage;
