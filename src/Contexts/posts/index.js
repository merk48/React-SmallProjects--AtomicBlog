import { createContext, useContext, useState } from "react";
import { faker } from "@faker-js/faker";
import { useSearch } from "../search";

function createRandomPost() {
  return {
    title: `${faker.hacker.adjective()} ${faker.hacker.noun()}`,
    body: faker.hacker.phrase(),
  };
}
// 1- Create a new context
// 2- Provide value to child components
// 3- Consuming context value

const PostContext = createContext();
// const SearchContext = createContext();

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

  function handleAddPost(post) {
    setPosts((posts) => [post, ...posts]);
  }

  function handleClearPosts() {
    setPosts([]);
  }

  return (
    <PostContext.Provider
      value={{
        posts: searchedPosts,
        onClearPosts: handleClearPosts,
        onAddPosts: handleAddPost,
      }}
    >
      {children}
    </PostContext.Provider>
  );
}

// Corresponding provider hook
function usePosts() {
  const context = useContext(PostContext);

  if (context === undefined)
    throw new Error("PostContext was used outside of the PostProvider!");

  return context;
}

export { PostProvider, usePosts };
