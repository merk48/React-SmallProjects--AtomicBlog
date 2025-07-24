import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { useSearch } from "../search";
import { createRandomPost } from "../../utils/helper";

// 1- Create a new context 2- Provide value to child components 3- Consuming context value

const PostContext = createContext();

function PostProvider({ children }) {
  const [posts, setPosts] = useState(() =>
    Array.from({ length: 30 }, () => createRandomPost())
  );
  const { searchQuery } = useSearch();
  // Derived state. These are the posts that will actually be displayed
  const searchedPosts =
    searchQuery.length > 0
      ? posts.filter((post) =>
          `${post.title} ${post.body}`
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        )
      : posts;

  const handleAddPost = useCallback(function handleAddPost(post) {
    setPosts((posts) => [post, ...posts]);
  }, []);

  const handleClearPosts = useCallback(function handleClearPosts() {
    setPosts([]);
  }, []);

  const value = useMemo(() => {
    return {
      posts: searchedPosts,
      onClearPosts: handleClearPosts,
      onAddPost: handleAddPost,
    };
  }, [handleAddPost, handleClearPosts, searchedPosts]);

  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
}

// Corresponding provider hook
function usePosts() {
  const context = useContext(PostContext);

  if (context === undefined)
    throw new Error("PostContext was used outside of the PostProvider!");

  return context;
}

export { PostProvider, usePosts };
