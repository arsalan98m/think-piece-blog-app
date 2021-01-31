import { createContext, useContext, useState, useEffect } from "react";
import { firestore } from "../firebase";
import { collectIdsAndDocs } from "../utils";

const PostContext = createContext();

export const PostsProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  let unsubscribeFromFirestore = null;

  useEffect(() => {
    unsubscribeFromFirestore = firestore
      .collection("posts")
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        const newPosts = snapshot.docs.map(collectIdsAndDocs);
        setPosts(newPosts);
      });

    return () => unsubscribeFromFirestore();
  }, []);

  return (
    <PostContext.Provider value={{ posts }}>{children}</PostContext.Provider>
  );
};

export const usePostProvider = () => useContext(PostContext);
