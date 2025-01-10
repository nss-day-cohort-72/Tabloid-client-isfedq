import { useContext, useEffect, useState } from "react";
import { UserContext } from "../ApplicationViews";
import { PostCard } from "../PostCard";
import { Container } from "reactstrap";
import { getAllPosts } from "../../managers/postManager";

export default function AllPostsList() {
  const { loggedInUser } = useContext(UserContext);
  const [posts, setPosts] = useState();

  useEffect(() => {
    getAllPosts().then((postsArray) => {
        console.log(postsArray)
        setPosts(postsArray)
    })
  }, [loggedInUser]);

  return (
    <Container className="mt-5">
      <h2 className="text-center m-3 mb-5">All Posts</h2>
      {posts?.map(post => {
        return (
          <PostCard key={post.id} post={post} loggedInUser={loggedInUser} />
        );
      })}
    </Container>
  );
}
