import { PostProvider } from "../Contexts/posts";
import { SearchProvider } from "../Contexts/search";
import Footer from "./Footer";
import Main from "./Main";
import ThemeButton from "./ThemeButton";
import Header from "./Header";
import Archive from "./Archive";

function App() {
  return (
    <section>
      <ThemeButton />
      <SearchProvider>
        <PostProvider>
          <Header />
          <Main />
          <Archive />
          <Footer />
        </PostProvider>
      </SearchProvider>
    </section>
  );
}

export default App;
