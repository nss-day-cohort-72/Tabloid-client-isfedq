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
import { AddComment } from "./comments/AddComment";

export default function ApplicationViews({ loggedInUser, setLoggedInUser }) {
  return (
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
            <Route
            path=":postId/add-comment"
            element={
              <AuthorizedRoute loggedInUser={loggedInUser}>
                <AddComment />
              </AuthorizedRoute>
            }
          />
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
  );
}
