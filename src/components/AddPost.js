import { useState } from "react";
import { Link } from "react-router-dom";
import { firestore } from "../firebase";
import {
  Form,
  Content,
  FlexboxGrid,
  FormGroup,
  FormControl,
  Button,
  Alert,
} from "rsuite";
import firebase from "firebase/app";
import { auth } from "../firebase";
import { useUserProvider } from "../context/UserProvider";

const AddPost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { user } = useUserProvider();
  const { uid, displayName, email, photoURL } = auth.currentUser || {};

  const handleSubmit = () => {
    if (title && content) {
      const newPost = {
        title,
        content,
        user: {
          uid,
          displayName,
          email,
          photoURL,
        },
        favorites: 0,
        comments: 0,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      };

      firestore.collection("posts").add(newPost);
      setTitle("");
      setContent("");
      Alert.success("Post Created Successfully");
    } else {
      Alert.error("Plzzz Fill All Fields");
    }
  };
  return (
    <Form fluid onSubmit={handleSubmit} className="form">
      <FormGroup>
        <FormControl
          type="text"
          name="title"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e)}
        />
      </FormGroup>
      <FormGroup>
        <FormControl
          type="text"
          name="content"
          placeholder="Body"
          value={content}
          onChange={(e) => setContent(e)}
        />
      </FormGroup>

      <FormGroup>
        {!user ? (
          <Link to="/login">Login to Create Posts</Link>
        ) : (
          <Button type="submit" appearance="primary" block className="create">
            Create Post
          </Button>
        )}
      </FormGroup>
    </Form>
  );
};

export default AddPost;
