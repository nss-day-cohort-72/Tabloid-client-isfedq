import { Route, Routes } from "react-router-dom";
import { AuthorizedRoute } from "./auth/AuthorizedRoute";
import Login from "./auth/Login";
import Register from "./auth/Register";
import UserProfileList from "./userprofiles/UserProfilesList";
import UserProfileDetails from "./userprofiles/UserProfileDetails";
import MyPostsList from "./MyPosts/MyPostsList";
import { Explore } from "./explore/Explore";
import { SubscribedPosts } from "./subscribedPosts/SubscribedPosts";
import { Categories } from "./categories/Categories";
import { Tags } from "./tags/Tags";
import { createContext } from "react";
import AllPostsList from "./posts/AllPostsList";
import { PostDetails } from "./posts/PostDetails";
import { EditPost } from "./posts/EditPost";
export const UserContext = createContext();
export default function ApplicationViews({ loggedInUser, setLoggedInUser }) {
  return (
    <UserContext.Provider value={{ loggedInUser, setLoggedInUser }}>
    <Routes>

      <Route path="/">
        <Route
          index
          element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <p>Welcome to Tabloid!</p>
            </AuthorizedRoute>
          }
        />
        <Route path="/userprofiles">
          <Route
            index
            element={
              <AuthorizedRoute loggedInUser={loggedInUser} roles={["Admin"]}>
                <UserProfileList />
              </AuthorizedRoute>
            }
          />
          <Route
            path=":id"
            element={
              <AuthorizedRoute loggedInUser={loggedInUser} roles={["Admin"]}>
                <UserProfileDetails />
              </AuthorizedRoute>
            }
          />
        </Route>

        <Route path="/myposts">
            <Route index element={<MyPostsList />} />
        </Route>

        <Route path="/explore">
            <Route index element={<Explore />} />
        </Route>

        <Route path="/subscribed-posts">
            <Route index element={<SubscribedPosts />} />
        </Route>

        <Route path="/categories">
            <Route index element={<Categories />} />
        </Route>

        <Route path="/tags">
            <Route index element={<Tags />} />
        </Route>

        <Route path="/allposts">
            <Route index element={<AllPostsList />} />
        </Route>

        <Route path="/posts/:id" element={<PostDetails loggedInUser={loggedInUser} />} />
        <Route path="/posts/edit/:id" element={<EditPost />} />

        <Route
          path="login"
          element={<Login setLoggedInUser={setLoggedInUser} />}
        />
        <Route
          path="register"
          element={<Register setLoggedInUser={setLoggedInUser} />}
        />
      </Route>
      <Route path="*" element={<p>Whoops, nothing here...</p>} />
    </Routes>
    </UserContext.Provider>
  );
}
