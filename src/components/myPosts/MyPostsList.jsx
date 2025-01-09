import { useContext, useEffect, useState } from "react";
import { UserContext } from "../ApplicationViews";
import { getCurrentUserPosts } from "../../managers/postManager";
import { PostCard } from "../PostCard";
import { Container } from "reactstrap";

export default function MyPostsList() {
  const { loggedInUser } = useContext(UserContext);
  const [posts, setPosts] = useState();

  useEffect(() => {
    getCurrentUserPosts(loggedInUser.id)
      .then(setPosts);
  }, [loggedInUser]);



  
  return (
    <Container className="mt-5">
      <h2 className="text-center m-3 mb-5">My Posts</h2>
      {posts?.map(post => {
        return (
          <PostCard key={post.id} post={post} />
        );
      })}
    </Container>
  );
}
